---
title: Public endpoints
description: Read-only Markdown, JSON, oEmbed and RSS endpoints on ecency.com that apps, bots and AI agents can use without an API key.
---

Ecency serves every public Hive post in clean, machine-friendly formats next to the normal web page. You don't need an API key. These endpoints are read-only and never perform actions such as voting, commenting or transfers.

The data comes from the public Hive blockchain. If you need more than these endpoints offer, query Hive directly or use the [Ecency SDK](/developers/sdk/).

## Be a good citizen

- **Cache responses.** Posts rarely change after the first hours. Each response carries a `Cache-Control` header you can follow.
- **Set a descriptive `User-Agent`** that names your app and gives a contact URL, for example `MyHiveApp/1.2 (+https://example.com/contact)`.
- **Don't poll in tight loops.** Use RSS for new posts, or stream blocks from a Hive node.

## Post as Markdown, JSON or discussion

Append an extension to a post's canonical URL, `https://ecency.com/@author/permlink`:

| URL | Returns |
|---|---|
| `/@author/permlink.md` | The post as Markdown with YAML front matter (`text/markdown`) |
| `/@author/permlink.json` | The post as JSON in a small envelope (`application/json`) |
| `/@author/permlink.discussion.json` | The full comment thread as JSON (`application/json`) |

Only the bare `/@author/permlink` form is an endpoint. A community-style URL such as `/hive-125125/@author/permlink.md` redirects to the bare form first, so follow redirects. Automated clients should request the bare form (for example `/@author/permlink.md`) directly and skip the redirect.

All three responses allow cross-origin requests (`Access-Control-Allow-Origin: *`), so you can call them from a browser.

### Markdown

```sh
curl -A "MyHiveApp/1.0 (+https://example.com)" \
  https://ecency.com/@ecency/ecency-web-4-4-3.md
```

```markdown
---
title: "Ecency Web 4.4.3 - Faster, More Social, More Fun"
author: "@ecency"
permlink: "ecency-web-4-4-3"
type: "post"
category: "hive-125125"
tags: ["hive-125125","curation","speed","ecency","hive"]
app: "ecency/4.4.3-vision"
created: "2026-10-19T05:41:30"
updated: "2026-10-19T05:47:42"
canonical_url: "https://ecency.com/@ecency/ecency-web-4-4-3"
---

# Ecency Web 4.4.3 - Faster, More Social, More Fun

A new Ecency release is here!
...
```

This sample is shortened: the real `tags` list is longer and the body continues. The body after the front matter is the raw on-chain Markdown. `type` is `"post"` for a post and `"comment"` for a comment.

### JSON

```sh
curl https://ecency.com/@ecency/ecency-web-4-4-3.json
```

```json
{
  "type": "post",
  "canonical_url": "https://ecency.com/@ecency/ecency-web-4-4-3",
  "source": "hive_condenser",
  "content": {
    "author": "ecency",
    "permlink": "ecency-web-4-4-3",
    "category": "hive-125125",
    "title": "Ecency Web 4.4.3 - Faster, More Social, More Fun",
    "body": "...",
    "created": "2026-10-19T05:41:30",
    "net_votes": 355,
    "children": 11,
    "pending_payout_value": "9.956 HBD",
    "json_metadata": { "app": "ecency/4.4.3-vision", "tags": ["..."], "image": ["..."] },
    "...": "..."
  }
}
```

- The sample above is shortened (`"..."` marks the cut fields and array items).
- `type` is `"post"` for a post and `"comment"` for a comment.
- `content` is the post record as Hive returns it.
- `source` names the Hive API that produced it. `hive_condenser` records carry `root_author` and `root_permlink`; `hive_bridge` records carry community and author role fields.
- `content.json_metadata` is always a JSON object, never a string. It is `{}` when the on-chain metadata is missing, invalid or too large.
- `canonical_url` is the Ecency URL. If the author declared their own canonical, it is in `content.json_metadata.canonical_url`.

### Discussion

```sh
curl https://ecency.com/@ecency/ecency-web-4-4-3.discussion.json
```

```json
{
  "type": "discussion",
  "canonical_url": "https://ecency.com/@ecency/ecency-web-4-4-3",
  "source": "hive_bridge",
  "content": {
    "ecency/ecency-web-4-4-3": { "author": "ecency", "replies": ["..."], "...": "..." },
    "alice/re-ecency-20261019t104930682z": { "author": "alice", "parent_author": "ecency", "...": "..." }
  }
}
```

`content` is a map keyed by `author/permlink`, holding the root post and every reply. Each entry has a `replies` array of child keys, so you can rebuild the tree.

### Errors

- `404` means the post doesn't exist, or it is withheld for policy reasons (spam, NSFW or very low quality). The same posts are hidden from search engines.
- `.discussion.json` can also return `404` when the thread lookup fails temporarily. Retry later. The post's `.md` and `.json` are not affected.

On-chain metadata is written by the author, so treat every field in it as untrusted input.

## llms.txt

`https://ecency.com/llms.txt` is a plain text guide for AI agents, following the [llms.txt](https://llmstxt.org) convention. It describes the endpoints above so agents can fetch Markdown or JSON instead of scraping the web app.

## oEmbed

```http
GET https://ecency.com/api/oembed?url=<post URL>&format=json
```

Returns [oEmbed](https://oembed.com) data for an Ecency post, so editors and chat apps can show a link card. The response allows cross-origin requests.

- `url` (required) is an Ecency post URL, either `https://ecency.com/@author/permlink` or `https://ecency.com/category/@author/permlink`. Remember to URL-encode it.
- `format` is optional. Only `json` is supported.

```sh
curl "https://ecency.com/api/oembed?url=https%3A%2F%2Fecency.com%2F%40ecency%2Fecency-web-4-4-3&format=json"
```

```json
{
  "version": "1.0",
  "type": "link",
  "title": "Ecency Web 4.4.3 - Faster, More Social, More Fun",
  "author_name": "ecency",
  "author_url": "https://ecency.com/@ecency",
  "provider_name": "Ecency",
  "provider_url": "https://ecency.com",
  "cache_age": 300,
  "description": "A new Ecency release is here! Version 4.4.3 brings ...",
  "thumbnail_url": "https://i.ecency.com/p/...",
  "thumbnail_width": 1200,
  "thumbnail_height": 630
}
```

- `type` is always `link`.
- `description` is a non-standard extra field with a short summary of the post.
- `thumbnail_*` fields are only present when the post has an image.

| Status | Meaning |
|---|---|
| `400` | `url` is missing, or `format` is not `json` |
| `404` | The URL is not an Ecency post URL, or the post can't be found |
| `500` | The post was found but the card could not be built |

## RSS feeds

Every feed is available as RSS 2.0. Add `/rss` or `/rss.xml` to the path:

| Feed | URL |
|---|---|
| A user's posts | `https://ecency.com/@alice/rss` |
| Posts with a tag, by sort | `https://ecency.com/trending/photography/rss` |
| A community, by sort | `https://ecency.com/created/hive-125125/rss` |

Valid sorts are `trending`, `hot`, `created`, `payout`, `payout_comments` and `muted`. An unknown sort falls back to `created`. Each feed returns the latest 20 items with title, summary, link, author, category, publish date and a cover image enclosure.

```xml
<item>
  <title><![CDATA[Ecency Web 4.4.3 - Faster, More Social, More Fun]]></title>
  <description><![CDATA[A new Ecency release is here! ...]]></description>
  <link>https://ecency.com/@ecency/ecency-web-4-4-3</link>
  <guid isPermaLink="true">https://ecency.com/@ecency/ecency-web-4-4-3</guid>
  <category><![CDATA[hive-125125]]></category>
  <dc:creator><![CDATA[ecency]]></dc:creator>
  <pubDate>Mon, 19 Oct 2026 05:41:30 GMT</pubDate>
  <enclosure url="https://i.ecency.com/p/...?format=match&amp;mode=fit" length="0" type="false"/>
</item>
```

## Sitemap

`https://ecency.com/sitemap.xml` lists indexable pages for search engines and crawlers.

## Related

- [Images API](/developers/images/): avatars, covers and the image proxy.
- [Render helper](/developers/render-helper/): turn a post body into safe HTML.
- [HiveSearcher](/extra-services/hivesearcher/): full-text search over Hive.
