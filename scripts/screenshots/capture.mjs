// Takes the app screenshots used in the docs and saves them to src/assets/screens.
//
//   ECENCY_CAPTURE_UA="..." node scripts/screenshots/capture.mjs [id ...]
//
// The list of screenshots lives in shots.mjs. See README.md in this folder.
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { shots } from "./shots.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, "../../src/assets/screens");
const base = process.env.ECENCY_CAPTURE_BASE || "https://ecency.com";
const userAgent = process.env.ECENCY_CAPTURE_UA || undefined;
// Optional test account for screens that need a login. Use a posting key.
const loginUser = process.env.ECENCY_CAPTURE_USER;
const loginKey = process.env.ECENCY_CAPTURE_KEY;

// Applied to every page: no animations, no blinking caret, no cookie or
// notification popups, no scrollbars.
const baseCss = `
  *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
  html { scrollbar-width: none; }
  ::-webkit-scrollbar { display: none; }
  .Toastify, [class*="toast"], [class*="cookie"], [class*="Cookie"] { display: none !important; }
`;

// Post and wave media, even if it loads after the blur pass.
const blurCss = `.item-image img, .entry-image img, main img.object-cover, video, iframe { filter: blur(10px) !important; }`;

const wanted = new Set(process.argv.slice(2));
const list = shots.filter((s) => wanted.size === 0 || wanted.has(s.id));
if (list.length === 0) {
  console.error("No matching screenshots. Known ids:", shots.map((s) => s.id).join(", "));
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
let failed = 0;
let loggedIn; // one logged-in browser context, shared by all login shots

for (const shot of list) {
  if (shot.login && !(loginUser && loginKey)) {
    console.log("skip", shot.id, "(needs ECENCY_CAPTURE_USER and ECENCY_CAPTURE_KEY)");
    continue;
  }
  if (shot.login && !loggedIn) {
    try {
      loggedIn = await logIn();
    } catch (err) {
      failed++;
      console.error("FAIL login", err.message.split("\n")[0]);
      break;
    }
  }
  const phone = shot.device === "phone";
  const context = shot.login ? loggedIn : await browser.newContext({
    userAgent,
    viewport: shot.viewport ?? (phone ? { width: 390, height: 844 } : { width: 1280, height: 800 }),
    deviceScaleFactor: 2,
    isMobile: phone,
    hasTouch: phone,
    colorScheme: "light",
    locale: "en-US",
  });
  const page = await context.newPage();
  if (shot.login) await page.setViewportSize(shot.viewport ?? { width: 1280, height: 800 });
  try {
    // A path can be a function of the logged-in user, for pages like /@user/settings.
    const route = typeof shot.path === "function" ? shot.path(loginUser) : shot.path;
    const res = await page.goto(base + route, { waitUntil: shot.waitUntil ?? "networkidle", timeout: 60_000 });
    if (!res || res.status() >= 400) throw new Error(`HTTP ${res?.status()} (blocked? set ECENCY_CAPTURE_UA)`);
    if (shot.waitFor) await page.waitForSelector(shot.waitFor, { timeout: 30_000 });
    if (shot.login) await dismiss(page, "Later");
    for (const step of shot.steps ?? []) await step(page);
    // Load lazy images first, so blurring below catches them.
    await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")));
    await page.waitForLoadState("load");
    await page.addStyleTag({ content: baseCss + (shot.blurImages ? blurCss : "") + (shot.css ?? "") });
    if (shot.highlight) await highlight(page, shot.highlight);
    await page.mouse.move(0, 0); // no hover tooltips
    await page.waitForTimeout(shot.settle ?? 800);
    // Blur and hide last, so content that rendered late is caught too.
    await page.evaluate(
      ({ blur, hide, blurImages, blurPosts }) => {
        for (const sel of hide) document.querySelectorAll(sel).forEach((el) => (el.style.visibility = "hidden"));
        for (const sel of blur) document.querySelectorAll(sel).forEach((el) => (el.style.filter = "blur(7px)"));
        // Other people's photos and videos: blur anything bigger than an avatar.
        // Other people's post titles and text: links to a post, post bodies, summaries.
        if (blurPosts) {
          const postLink = /\/@[^/]+\/[^/?#]+$/;
          document.querySelectorAll("main a[href]").forEach((a) => {
            if (postLink.test(a.getAttribute("href")) && a.textContent.trim().length > 15) a.style.filter = "blur(6px)";
          });
          document.querySelectorAll(".item-summary, .entry-body, .markdown-view").forEach((el) => (el.style.filter = "blur(6px)"));
        }
        if (blurImages) {
          document.querySelectorAll("img, video, iframe").forEach((el) => {
            if (el.closest("nav, header")) return;
            if (/avatar/i.test(el.className + el.parentElement?.className)) return;
            if (el.getBoundingClientRect().width > 48) el.style.filter = "blur(10px)";
          });
        }
      },
      { blur: shot.blur ?? [], hide: shot.hide ?? [], blurImages: !!shot.blurImages, blurPosts: !!shot.blurPosts },
    );

    const target = shot.element ? page.locator(shot.element).first() : page;
    // With fullPage, clip coordinates are page coordinates, so a clip can sit below the fold.
    const png = await target.screenshot({ clip: shot.clip, fullPage: !!shot.clip, animations: "disabled" });
    const width = Math.min(1600, (await sharp(png).metadata()).width);
    const file = path.join(outDir, `${shot.id}.webp`);
    await sharp(png).resize({ width }).webp({ quality: 82 }).toFile(file);
    console.log("ok  ", shot.id);
  } catch (err) {
    failed++;
    console.error("FAIL", shot.id, err.message.split("\n")[0]);
  } finally {
    if (shot.login) await page.close();
    else await context.close();
  }
}

await browser.close();
process.exit(failed ? 1 : 0);

// Logs in through HiveSigner. The test account must already have ecency.app in
// its posting authority: the script stops if HiveSigner asks to grant anything.
// The session lives only in this browser and is never written to disk.
async function logIn() {
  const context = await browser.newContext({
    userAgent,
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    colorScheme: "light",
    locale: "en-US",
  });
  const page = await context.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle", timeout: 60_000 });
  await page.getByRole("button", { name: "Login" }).first().click();
  await page.getByPlaceholder("Username").fill(loginUser);
  await page.getByRole("button", { name: /Hivesigner/ }).click();
  await page.waitForURL((u) => u.host === "hivesigner.com", { timeout: 30_000 });
  await page.getByText("Continue", { exact: true }).click();
  await page.locator("input[name=username]").fill(loginUser);
  await page.locator("input[name=password]").fill(loginKey);
  await page.locator("input[type=checkbox]").uncheck();
  await page.getByText("Add account", { exact: true }).last().click();
  await page.getByText("Nothing new is granted").waitFor({ timeout: 30_000 });
  await page.getByText("Sign in", { exact: true }).last().click();
  await page.waitForURL((u) => u.host === new URL(base).host, { timeout: 30_000 });
  await page.waitForLoadState("networkidle");
  await page.close();
  console.log("logged in as", loginUser);
  return context;
}

// Clicks a popup button (like "Later" or "Skip") if it shows up.
async function dismiss(page, name) {
  const button = page.getByText(name, { exact: true }).first();
  if (await button.isVisible().catch(() => false)) await button.click().catch(() => {});
}

// Draws an Ecency-blue ring around the element to look at, with an optional
// numbered badge. It is part of the page, so it lands in the screenshot.
async function highlight(page, items) {
  for (const [i, item] of [items].flat().entries()) {
    const { selector, label } = typeof item === "string" ? { selector: item } : item;
    const box = await page.locator(selector).first().boundingBox();
    if (!box) throw new Error(`highlight target not found: ${selector}`);
    await page.evaluate(
      ({ box, label, n }) => {
        const pad = 6;
        const ring = document.createElement("div");
        Object.assign(ring.style, {
          position: "absolute",
          left: `${box.x + window.scrollX - pad}px`,
          top: `${box.y + window.scrollY - pad}px`,
          width: `${box.width + pad * 2}px`,
          height: `${box.height + pad * 2}px`,
          border: "3px solid #357ce6",
          borderRadius: "12px",
          boxShadow: "0 0 0 4px rgba(53,124,230,.25)",
          zIndex: 2147483647,
          pointerEvents: "none",
        });
        if (label) {
          const badge = document.createElement("div");
          badge.textContent = label;
          Object.assign(badge.style, {
            position: "absolute",
            top: "-14px",
            left: "-14px",
            minWidth: "26px",
            height: "26px",
            padding: "0 6px",
            borderRadius: "13px",
            background: "#357ce6",
            color: "#fff",
            font: "700 14px/26px system-ui, sans-serif",
            textAlign: "center",
          });
          ring.appendChild(badge);
        }
        document.body.appendChild(ring);
      },
      { box, label, n: i + 1 },
    );
  }
}
