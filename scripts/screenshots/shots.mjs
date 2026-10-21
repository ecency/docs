// Screenshots used in the docs. Each one is saved as src/assets/screens/<id>.webp.
//
//   id         file name, and how a page imports it
//   path       page on ecency.com, or (user) => path for the logged-in account
//   device     "phone" for a 390px phone screen, otherwise a 1280x800 desktop
//   element    screenshot just this element (Playwright selector)
//   clip       or just this area: { x, y, width, height } in CSS pixels
//   steps      functions run before the shot, e.g. to open a dialog
//   highlight  selector(s) to ring in Ecency blue, optionally { selector, label }
//   blurImages blur other people's photos and videos
//   blurPosts  blur other people's post titles and text
//   blur/hide  CSS selectors to blur or hide
//   login      needs the test account (see README)
//   docs       the docs page that shows it (for people updating screenshots)
const top = (height) => ({ x: 0, y: 0, width: 1280, height });

export const shots = [
  {
    id: "login-dialog",
    docs: "guides/login-methods",
    path: "/",
    steps: [async (p) => p.getByRole("button", { name: "Login" }).first().click()],
    element: ".ecency-modal-content",
  },
  {
    id: "signup-options",
    docs: "guides/create-account",
    path: "/signup",
    clip: top(800),
  },
  {
    id: "feed-tabs",
    docs: "ecency/feed",
    path: "/trending",
    clip: top(640),
    blurImages: true,
    blurPosts: true,
    highlight: "xpath=//a[normalize-space()='Hot']/ancestor::*[.//a[normalize-space()='Promoted']][1]",
  },
  {
    id: "waves",
    docs: "ecency/waves/about",
    path: "/waves",
    waitUntil: "load",
    settle: 4000,
    clip: top(800),
    blurImages: true,
    blurPosts: true,
  },
  {
    id: "discover",
    docs: "ecency/discover",
    path: "/discover",
    clip: top(720),
  },
  {
    id: "decks",
    docs: "ecency/decks/about",
    path: "/decks",
    clip: top(560),
  },
  {
    id: "communities-list",
    docs: "guides/create-community",
    path: "/communities",
    clip: top(640),
    highlight: "text=Create community",
  },
  {
    id: "community-page",
    docs: "hive/communities",
    path: "/created/hive-125125",
    clip: top(640),
    blurImages: true,
    blurPosts: true,
  },
  {
    id: "search",
    docs: "ecency/search",
    path: "/search?q=hive",
    clip: top(640),
    blurImages: true,
    blurPosts: true,
    highlight: "text=Advanced",
  },
  {
    id: "publish-editor",
    docs: "ecency/publish",
    path: "/publish",
    steps: [async (p) => p.getByRole("button", { name: "Skip guide" }).click().catch(() => {})],
    clip: top(420),
  },
  {
    id: "market",
    docs: "ecency/market",
    path: "/market",
    clip: top(720),
  },
  {
    id: "perks",
    docs: "ecency/boost-and-promote",
    path: "/perks",
    clip: top(800),
  },
  {
    id: "proposals",
    docs: "guides/vote-proposals",
    path: "/proposals",
    clip: { x: 0, y: 440, width: 1280, height: 560 },
  },
  {
    id: "witnesses",
    docs: "guides/vote-witness",
    path: "/witnesses",
    clip: top(720),
  },
  {
    id: "points-wallet",
    docs: "ecency/ecency-points",
    path: "/@ecency/wallet/points",
    clip: top(560),
  },
  {
    id: "wallet",
    docs: "ecency/wallets/about",
    path: "/@ecency/wallet",
    clip: top(720),
  },
  {
    id: "raidstead",
    docs: "ecency/raidstead",
    path: "/raidstead",
    clip: top(720),
  },
  {
    id: "curation-desk",
    docs: "ecency/curation-desk",
    path: "/curation",
    clip: top(640),
    blurImages: true,
    blurPosts: true,
  },
  {
    id: "blog-hosting",
    docs: "ecency/blog-hosting",
    path: "/hosting",
    clip: top(560),
  },
  {
    id: "gift-points",
    docs: "ecency/buy-points",
    path: "/gift",
    clip: top(720),
  },
  {
    id: "ai-images",
    docs: "ecency/ai-images",
    path: "/perks/ai-generator",
    clip: top(720),
  },
  {
    id: "profile",
    docs: "ecency/profile",
    path: "/@ecency",
    clip: top(640),
  },

  // Logged-in screens, taken with the test account.
  {
    id: "chats",
    docs: "ecency/chats",
    path: "/chats",
    login: true,
    clip: top(640),
    // Messages, their authors and conversation names stay private.
    blur: ["[data-post-id]", ".leading-relaxed", 'a[href*="/chats/"] .truncate'],
  },
  {
    id: "settings",
    docs: "ecency/settings",
    path: (user) => `/@${user}/settings`,
    login: true,
    clip: top(800),
  },
  {
    id: "permissions",
    docs: "guides/manage-keys",
    path: (user) => `/@${user}/permissions`,
    login: true,
    clip: top(800),
    highlight: "text=Add/Manage keys",
  },
  {
    id: "setup-external-wallets",
    docs: "ecency/wallets/cross-chain-wallets",
    path: "/wallet/setup-external",
    login: true,
    clip: top(440),
  },
  {
    id: "decks-add-column",
    docs: "ecency/decks/about",
    path: "/decks",
    login: true,
    steps: [async (p) => p.getByText("Skip", { exact: true }).first().click().catch(() => {})],
    clip: { x: 0, y: 0, width: 900, height: 800 },
  },
];
