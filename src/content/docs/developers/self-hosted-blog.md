---
title: Self-hosted blog
description: Run the open-source Ecency blog app on your own server with Docker and a single config file.
---

The Ecency self-hosted blog is an open-source web app that turns a Hive account or a Hive community into a standalone blog on your own domain. Posts, votes and comments live on the Hive blockchain, so the app itself is a static site: one Docker container serving files, configured with one `config.json`.

The source is in the [`apps/self-hosted`](https://github.com/ecency/vision-web/tree/develop/apps/self-hosted) folder of the `ecency/vision-web` repository, under the MIT license. If you'd rather not run a server, Ecency also offers managed hosting, see [Blog hosting](/ecency/blog-hosting/).

## What you need

- Docker 20.10 or newer and Docker Compose 2.0 or newer.
- A Hive account (for a personal blog) or a Hive community id (for a community blog).
- Optionally, a domain name and a reverse proxy for HTTPS.

## Quick start

Get the files from the repository and create your config from the template:

```bash
git clone https://github.com/ecency/vision-web.git
cd vision-web/apps/self-hosted
cp config.template.json config.json
```

Create `config.json` before the first start. If the file is missing, Docker creates an empty directory in its place and the blog falls back to its built-in demo config.

Edit `config.json` (see [Configuration](#configuration) below), then pick an image tag and start the container:

```bash
# Replace sha-abc1234 with a real tag from Docker Hub
echo "TAG=sha-abc1234" > .env
docker compose up -d
docker compose logs -f
```

Your blog is now at `http://localhost:3000`.

A few details of the bundled `docker-compose.yml`:

- `TAG` is required and has no default, so a deployment always states which build it runs. Keep it in `.env` so every `docker compose` command sees it.
- The container listens on port 80 and is published on `PORT`, which defaults to `3000`.
- The port is bound to `127.0.0.1` by default, because you're expected to put a reverse proxy in front. Set `BIND=0.0.0.0` in `.env` only if you want to serve plain HTTP directly.
- `config.json` is mounted read-only into the container, so you change settings without rebuilding.

## Choosing an image tag

Images are published on Docker Hub as [`ecency/self-hosted`](https://hub.docker.com/r/ecency/self-hosted/tags):

| Tag | Moves? | Use it for |
|---|---|---|
| `vX.Y.Z` | Never | A tagged release. This is what you should pin. |
| `sha-<7 chars>` | Never | One specific build between releases. |
| `develop` | On every merge | Tracking development, not for a site you care about. |
| `latest` | On releases only | Convenience. |

Docker Hub is the source of truth for which tags exist.

## Other ways to run it

With plain `docker run`:

```bash
docker run -d \
  -p 3000:80 \
  -v $(pwd)/config.json:/usr/share/nginx/html/config.json:ro \
  --name myblog \
  ecency/self-hosted:sha-abc1234
```

To build your own image from source (only needed if you change the code), build from `apps/self-hosted` with the monorepo root as context:

```bash
docker build -t myblog -f Dockerfile ../..
```

For platforms where mounting a file is awkward, you can bake the config into the image with the `CONFIG_JSON_B64` build argument:

```bash
CONFIG_B64=$(base64 -w0 config.json)   # on macOS: base64 -i config.json
docker build --build-arg CONFIG_JSON_B64="$CONFIG_B64" -t myblog:configured -f Dockerfile ../..
```

A baked config needs a rebuild for every settings change, while a mounted one only needs a restart.

## Configuration

Everything lives in `config.json`. A minimal personal blog looks like this:

```json
{
  "version": 1,
  "configuration": {
    "general": {
      "theme": "system",
      "styleTemplate": "medium",
      "language": "en",
      "imageProxy": "https://i.ecency.com"
    },
    "instanceConfiguration": {
      "type": "blog",
      "username": "your-hive-username",
      "meta": {
        "title": "My Hive Blog",
        "description": "My personal blog on Hive",
        "favicon": "https://example.com/favicon.ico"
      }
    }
  }
}
```

The document must be valid JSON with a truthy `version` and a `configuration` object, otherwise the app shows its demo blog. `version` is the config schema version and is currently `1`. Start from `config.template.json`, which lists every field.

### Personal blog or community blog

`instanceConfiguration.type` picks the mode:

- `"blog"` shows posts from one Hive account, set in `username`.
- `"community"` shows posts from a Hive community, set in `communityId` (for example `"hive-123456"`).

### General settings

Fields under `configuration.general`:

| Field | What it does |
|---|---|
| `theme` | `system`, `light` or `dark`. `system` follows the visitor's OS setting. |
| `styleTemplate` | The visual template, see [Theming](#theming). Defaults to `medium`. |
| `language` | Interface language code, for example `en`. |
| `timezone`, `dateFormat`, `timeFormat`, `dateTimeFormat` | How dates and times are shown. |
| `imageProxy` | Image proxy used for post images. The template uses `https://i.ecency.com`. |
| `profileBaseUrl` | Where author profile links point, for example `https://ecency.com/@`. |
| `createPostUrl` | Where the "create post" button goes. Leave it as `/publish` to use the built-in editor. In community mode the built-in editor is always used. |
| `rssFeedUrl` | Optional. Your own RSS feed URL, see [SEO files](#seo-files-robots-sitemap-rss). |
| `hivesigner.clientId` | Optional. The HiveSigner app id used for login, see [Login](#login). |
| `styles.background` | Page background classes. |
| `styles.accent` | Optional accent color as `#rgb` or `#rrggbb`. Empty keeps the template's own accent. |
| `styles.fontPreset` | Optional font preset: `classic`, `editorial`, `modern`, `technical` or `system`. Empty keeps the template's fonts. |

### Site metadata and layout

Under `instanceConfiguration`:

- `meta`: `title`, `description`, `logo`, `favicon` and `keywords` for the site.
- `layout.search.enabled`: show the search box.
- `layout.sidebar`: toggle the `followers`, `following` and `hiveInformation` sidebar blocks.

### Features

Under `instanceConfiguration.features`:

```json
{
  "features": {
    "postsFilters": ["blog", "posts", "comments", "replies"],
    "likes": { "enabled": true },
    "comments": { "enabled": true },
    "post": { "text2Speech": { "enabled": true } },
    "auth": {
      "enabled": true,
      "methods": ["keychain", "hivesigner", "hiveauth"]
    },
    "tipping": {
      "general": { "enabled": false, "buttonLabel": "Tip" },
      "post": { "enabled": false, "buttonLabel": "Tip" },
      "amounts": [1, 5, 10]
    },
    "hive": {
      "readerLayer": "standard",
      "authorRewards": "author"
    }
  }
}
```

- `postsFilters`: which archive tabs are offered.
- `likes`, `comments`: let logged-in readers vote and comment.
- `post.text2Speech`: a "listen" control on posts.
- `auth`: turn login on and choose methods. `methods` accepts `keychain`, `hivesigner` and `hiveauth`; other names are ignored.
- `tipping`: a tip button on the site (`general`) and on posts (`post`), with preset `amounts`. Readers can tip in HIVE, HBD or Ecency Points, and see QR codes for the author's external wallet addresses where those exist.
- `hive.readerLayer`: how much of Hive the reader sees. `off` hides it, `standard` adds the payout on post pages, a "published on Hive" note and a link to the post on Hive, `full` also shows payouts in the feed. Absent means `off`.
- `hive.authorRewards`: `author` lets the author pick a rewards option in the editor, `off` hides the control. Optional `hive.payoutLabel` renames the payout figure and `hive.learnMoreUrl` links the Hive note.

### Login

With `auth.enabled`, readers log in with Hive Keychain, HiveAuth or HiveSigner. Listing `hivesigner` alone isn't enough: the HiveSigner button stays hidden until you set `general.hivesigner.clientId`, because HiveSigner only returns to addresses its app has registered. Register your own app on [HiveSigner](/extra-services/hivesigner/), add your site's `/auth` address as a redirect URI, and put the app id here.

## Theming

`styleTemplate` picks one of nine templates:

| Template | Look |
|---|---|
| `medium` | Clean long-form reading with a classic serif voice (default) |
| `minimal` | Quiet, spacious and out of the way of your words |
| `magazine` | Warm editorial look; the newest post becomes a hero |
| `developer` | Dark and code-friendly |
| `modern-gradient` | Bright surfaces with a vivid accent |
| `journal` | One quiet column for long-form writing |
| `reader` | Your archive as a rail beside the open post, like a feed reader |
| `gallery` | A grid of cover images |
| `terminal` | A monospace console listing |

`medium`, `minimal`, `developer` and `modern-gradient` only change colors, type and spacing. The others also change page structure. `journal`, `reader`, `gallery` and `terminal` have no sidebar, so sidebar settings are ignored while they're active (your values are kept for when you switch back). On top of any template you can set `theme`, `styles.accent` and `styles.fontPreset`.

## The configuration editor

Every instance has an in-browser editor behind the floating menu button, with Appearance, Identity, Features and Advanced tabs. It edits the same document as `config.json` and previews templates live. On your own deployment there is no server to save to, so the save button downloads the document. Put it next to `docker-compose.yml` as `config.json` and restart.

## HTTPS and custom domain

Point your domain's DNS at your server and put a reverse proxy in front of the container. With [Caddy](https://caddyserver.com/), which gets and renews certificates on its own, the whole config is:

```txt
blog.example.com {
    reverse_proxy 127.0.0.1:3000
}
```

With nginx and certbot:

```nginx
server {
    listen 443 ssl http2;
    server_name blog.example.com;

    ssl_certificate     /etc/letsencrypt/live/blog.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blog.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Either way, the port must match your `PORT`. `docker compose port blog 80` prints it.

## SEO files (robots, sitemap, RSS)

You can generate `robots.txt`, `sitemap.xml` and `rss.xml` with the generator in the `ecency/hosting-api` image. Run it on a schedule (hourly is plenty) with the same tag as your blog:

```bash
docker run --rm -v "$PWD:/work" ecency/hosting-api:sha-abc1234 \
  npm run generate-seo -- \
  --config /work/config.json \
  --url https://blog.example.com \
  --out /work/seo
```

`--url` must be a plain https origin with no path. Then uncomment the three SEO mounts in `docker-compose.yml` (run the generator first, so the files exist) and set `general.rssFeedUrl` to `https://blog.example.com/rss.xml`. Without this, the RSS link points at your account's feed on ecency.com.

## Updating

Change `TAG` in `.env` to a newer tag, then:

```bash
docker compose pull
docker compose up -d
```

To roll back, put the previous tag back and run the same two commands. Your mounted `config.json` isn't touched by an upgrade. After editing the config alone, `docker compose restart` is enough.

## Troubleshooting

- **`required variable TAG is missing a value`**: set `TAG` in `.env`.
- **Config changes don't show**: hard refresh the browser, then check what the container serves with `docker compose exec blog cat /usr/share/nginx/html/config.json`. If that fails because it's a directory, stop the stack, delete the directory, copy the template to `config.json` again and start.
- **You see a demo blog**: your `config.json` is missing, isn't valid JSON, or lacks `version` and `configuration`. Check it with `python3 -m json.tool config.json`.

For bugs, open an issue on [GitHub](https://github.com/ecency/vision-web/issues).
