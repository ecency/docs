# Docs screenshots

The app screenshots in `src/assets/screens/` are made by `capture.mjs` from the list in `shots.mjs`. Rerun it when the Ecency UI changes, so the docs match what people see.

## Run

```sh
npx playwright install chromium   # once
ECENCY_CAPTURE_UA="<user agent>" node scripts/screenshots/capture.mjs            # all
ECENCY_CAPTURE_UA="<user agent>" node scripts/screenshots/capture.mjs wallet     # one or more ids
```

`ECENCY_CAPTURE_UA` is a user agent that the site's bot protection lets through. Without it, ecency.com may answer 403 to a headless browser. Ask the team for it and never commit it.

`ECENCY_CAPTURE_BASE` points the script at another host (default `https://ecency.com`).

## Add a screenshot

1. Add an entry to `shots.mjs` (the fields are described at the top of that file).
2. Run the script with its id and look at the result in `src/assets/screens/<id>.webp`.
3. Show it on a page (the page must be `.mdx`):

```mdx
import Screenshot from "../../../components/visuals/Screenshot.astro";
import shotWallet from "../../../assets/screens/wallet.webp";

<Screenshot src={shotWallet} alt="What the image shows" caption="The one thing to notice." />
```

## Rules

- Logged-out pages only, so no personal data ends up in the docs.
- Use `blurImages` on any page that shows other people's posts or media.
- Don't capture screens with bugs in them, such as raw translation keys. Crop around them or wait for the fix.
- Write `alt` for people who can't see the image and keep `caption` to one point.
