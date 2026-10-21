---
title: Image hosting and proxy
description: Upload images, proxy and resize remote images and load Hive avatars and covers through images.ecency.com.
---

Ecency runs a public image service for Hive. It is available on two hostnames that serve the same API: `https://images.ecency.com` and `https://i.ecency.com`. Ecency's own apps upload to and load from `i.ecency.com`, but you can use either.

You can use it to:

- upload images on behalf of a Hive account,
- serve uploaded images,
- proxy and resize any public image URL,
- load an account's avatar or cover image by username.

The service is open source: [ecency/imagehoster](https://github.com/ecency/imagehoster).

## Upload an image

Uploads are `multipart/form-data` POST requests with a single file field. The request must carry a `Content-Length` header. You prove the upload comes from a Hive account in one of two ways: a signature over the image, or a HiveSigner style access token.

Accepted formats are JPEG, PNG, GIF, WebP, BMP, APNG, AVIF, HEIC and HEIF. SVG uploads are rejected.

A successful upload returns the permanent URL of the image:

```json
{
  "url": "https://images.ecency.com/DQmZi174Xz96UrRVBMNRHb6A2FfU3z1HRPwPPQCgSMgdiUT/example.jpg"
}
```

The path segment that starts with `D` is a content hash, so uploading the same bytes twice returns the same URL. The file name is taken from your upload, lowercased, with characters outside `a-z`, `0-9` and `.` replaced by `_`.

### Option 1: sign the image with a key

```
POST /<username>/<signature>
```

Build the signature like this:

1. Compute `sha256("ImageSigningChallenge" + fileBytes)`. The prefix is the UTF-8 string `ImageSigningChallenge`, followed directly by the raw bytes of the file you upload.
2. Sign that 32-byte hash with the account's **posting** or **active** private key. The owner key is not accepted.
3. Send the signature as a 130-character hex string (the recovery byte followed by the 64-byte compact signature, the standard Hive signature format).

The server recovers the public key from the signature and checks that it is one of the account's posting or active keys with enough weight to meet that authority's threshold.

Example with [`@ecency/sdk`](/developers/sdk/):

```ts
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PrivateKey } from "@ecency/sdk/hive";

const username = "alice";
const postingKey = PrivateKey.fromString(process.env.POSTING_WIF!);

const file = await readFile("./photo.jpg");
const hash = createHash("sha256")
  .update("ImageSigningChallenge")
  .update(file)
  .digest();

const signature = postingKey.sign(hash).toString(); // 130 hex chars

const form = new FormData();
form.append("file", new Blob([file], { type: "image/jpeg" }), "photo.jpg");

const res = await fetch(`https://images.ecency.com/${username}/${signature}`, {
  method: "POST",
  body: form,
});
const { url } = await res.json();
```

### Option 2: use an access token

```
POST /hs/<accesstoken>
```

The token is a HiveSigner style login token: a JSON object encoded as URL-safe base64.

```json
{
  "signed_message": { "type": "login", "app": "your-app" },
  "authors": ["alice"],
  "timestamp": 1760000000,
  "signatures": ["<hex signature>"]
}
```

- `signed_message.type` must be one of `login`, `posting`, `offline`, `code` or `refresh`. `signed_message.app` must be set.
- The signature is over `sha256(JSON.stringify({ signed_message, authors, timestamp }))`, with the keys in exactly that order.
- The signature must come from one of these signers:
  - One of the account's own **posting** or **active** keys. The owner key doesn't count. The key's weight must reach that authority's threshold on its own.
  - Ecency's app account, when the user has granted it posting or active authority. The app's key must be at the same authority level the user granted.
- The token must name the account that is uploading (`authors[0]`).
- A token that is missing any of the required fields gets a plain `404` with no JSON error body. A token that isn't valid URL-safe base64 JSON fails with a `500`.

Tokens that Ecency issues to its signed-in users also work here, which is how the Ecency apps upload. If you build your own token, sign the JSON string with the user's posting key (Hive Keychain's `requestSignBuffer` with the `Posting` key hashes and signs a message this way). This also lets users who signed in with a browser wallet upload without sharing a key.

:::caution[A self-built token doesn't expire]
The service doesn't check `timestamp`, so a token you sign yourself keeps working until the user changes the key that signed it. Treat the token like a key: never log it, never share it and keep it out of URLs you store. Changing the posting key is the only way to revoke it.
:::

URL-safe base64 here means `+` becomes `-`, `/` becomes `_` and `=` becomes `.`.

### Upload errors

Errors come back as JSON with an HTTP status:

| Status | Meaning |
|---|---|
| 400 | Missing file, invalid image, or invalid signature |
| 403 | The account does not meet the service's reputation requirement |
| 404 | The account does not exist |
| 411 | `Content-Length` header missing |
| 405 | Wrong HTTP method (uploads must be `POST`) |
| 413 | File too large |
| 429 | The account reached its upload quota; try again later |
| 451 | The account is blocked from uploading |
| 503 | The account lookup timed out. Temporary, retry the upload. |
| 504 | Storing the image timed out. Temporary, retry the upload. |

## Serve an uploaded image

```
GET /<hash>/<filename>
```

The file name is optional. Uploaded images never change, so you can cache them for a long time.

## Proxy and resize a remote image

```
GET /p/<base58 url>?width=<w>&height=<h>&mode=<mode>&format=<format>
```

`<base58 url>` is the full source URL, UTF-8 encoded and then base58 encoded (the Bitcoin alphabet, no prefix). The source must be a public `http` or `https` URL.

| Parameter | Values | Default |
|---|---|---|
| `width` | Pixels. Omit or `0` to keep the aspect ratio from the height. | Original |
| `height` | Pixels. Omit or `0` to keep the aspect ratio from the width. | Original |
| `mode` | `cover` (crop to fill the box) or `fit` (fit inside the box) | `cover` |
| `format` | `match`, `jpeg` (or `jpg`), `png`, `webp`, `avif` | `match` |
| `blur` | `1` or `true` returns a blurred placeholder | off |

Very large sizes are capped by the service.

With `format=match` (or no `format`), the service picks the best format your client accepts based on the `Accept` header: AVIF first, then WebP, then the original format. Responses carry `Vary: Accept`, so caches keep one copy per format.

The easiest way to build these URLs is `proxifyImageSrc` from [`@ecency/render-helper`](/developers/render-helper/), which handles the encoding:

```ts
import { proxifyImageSrc } from "@ecency/render-helper";

proxifyImageSrc("https://example.com/photo.jpg", 640, 0, "match");
// https://i.ecency.com/p/<base58>?format=match&mode=fit&width=640
```

To build one yourself in Node.js, any base58 (Bitcoin alphabet) encoder works:

```ts
import bs58 from "bs58";

const src = "https://example.com/photo.jpg";
const encoded = bs58.encode(new TextEncoder().encode(src));
const url = `https://images.ecency.com/p/${encoded}?width=640&mode=fit`;
```

A trailing `.webp` or `.png` on the encoded segment is ignored, so `/p/<base58>.webp` serves the same image as `/p/<base58>`.

## Legacy size URLs

```
GET /<width>x<height>/<image url>
```

This is the older Steemit style URL, for example `/640x0/https://example.com/photo.jpg`. Use `0` for either side to keep the aspect ratio. The service answers with a permanent redirect (301) to the matching `/p/` URL with `mode=fit` and `format=match`. New integrations should build `/p/` URLs directly.

## Avatars

```
GET /u/<username>/avatar
GET /u/<username>/avatar/<size>
```

Returns the account's profile picture (`profile_image` in the account's posting metadata) as a square image, cropped to fill. Accounts without a profile picture get a default avatar.

`<size>` is a width in pixels, for example `64`, `128`, `256` or `512`. Without a size you get 256 pixels. You will also see named sizes such as `small`, `medium` and `large` in the wild; they are accepted and currently return the default 256 pixel image.

```html
<img src="https://images.ecency.com/u/ecency/avatar/128" width="64" height="64" alt="@ecency" />
```

## Covers

```
GET /u/<username>/cover
```

Returns the account's cover image (`cover_image` in the posting metadata), resized to fit 1344 by 240 pixels.

## WebP and AVIF

Avatars, covers and proxied images all negotiate the format from the `Accept` header, so browsers that support AVIF or WebP get those formats automatically. You don't need special URLs.

The older `/webp/...` routes (`/webp/u/<username>/avatar/<size>`, `/webp/u/<username>/cover`, `/webp/<width>x<height>/<url>`) still work but only redirect to the URLs above. `POST /webp/hs/<accesstoken>` is an alias of the token upload.

## Good practice

- Cache responses on your side and reuse URLs; the service sends standard `ETag`, `Last-Modified` and `Cache-Control` headers.
- Request the size you display instead of resizing large originals in the client.
- Set a descriptive `User-Agent` on server-side requests so we can reach you if something goes wrong.
