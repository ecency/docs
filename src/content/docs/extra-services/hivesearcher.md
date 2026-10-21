---
title: HiveSearcher
description: HiveSearcher is a full-text search engine for Hive posts and comments, with a keyed API you can use in your own apps.
---

[HiveSearcher](https://hivesearcher.com) is a search engine for Hive built by the Ecency team. It indexes posts and
comments and powers search and "read next" suggestions on Ecency. You can search on the website, or use the API to add
search to your own app.

## API access

The API lives at `https://api.hivesearcher.com`. Every request needs an API key in the `Authorization` header:

```sh
curl https://api.hivesearcher.com/search \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_API_KEY" \
  -d '{"q": "ecency", "sort": "newest"}'
```

To get a key, open the [API docs page](https://hivesearcher.com/api-docs) and use **Get your API key**. Each Hive
account can have one active key. Keys have a daily request limit, and you can check your usage with `/state`. A key
that stays unused for 90 days expires; you can then request a new one the same way.

If you build on the Ecency SDK, use your own HiveSearcher key for search instead of Ecency's app search proxy.

## Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/search` | POST | Full-text search, paginated with `scroll_id` |
| `/search-paged` | POST | Full-text search with page numbers (`page` 1 to 10) |
| `/similar` | POST | Related posts for a given post ("read next") |
| `/search-path` | POST | Find `author/permlink` paths that start with `q` |
| `/search-follower/<account>` | POST | Find followers of an account by name prefix (`q`) |
| `/search-following/<account>` | POST | Find accounts that an account follows, by name prefix (`q`) |
| `/stats` | GET | Number of documents in the index |
| `/state` | GET | Your key's request count for today and its daily limit |

### Search parameters

`/search` and `/search-paged` accept a JSON body:

| Field | Description |
|---|---|
| `q` | The query. Required. |
| `sort` | `relevance` (default), `popularity` or `newest` |
| `hide_low` | `1` skips low-value results. Default `0`. |
| `include_nsfw` | `1` includes NSFW results. Default `0`. |
| `votes` | Minimum number of votes |
| `since` | Only results newer than this date, for example `2024-01-31T00:00:00` |
| `scroll_id` | `/search` only. Pass the previous response's `scroll_id` to get the next page. |
| `page` | `/search-paged` only. Page number from 1 to 10. |

Sort modes:

- `relevance`: text relevance, weighted by post value, so useful posts rank above bare keyword matches.
- `popularity`: relevance combined with payout and recency, for fresh and valuable posts.
- `newest`: most recent first.

Grayed and heavily flagged content and NSFW content are filtered out by default.

### Query syntax

A query can combine exact phrases, excluded terms and filters:

```text
"mobile app" -giveaway author:good-karma tag:wallet type:post
books category:hive-125125 type:post
```

`author:`, `tag:` (comma separated), `category:` (for example a community) and `type:post` narrow the results.

### Example response

```json
{
  "took": 0.031,
  "hits": 16687,
  "scroll_id": "DnF1ZXJ5VGhlbkZldGNo...",
  "results": [
    {
      "author": "ecency",
      "permlink": "ecency-the-best-and-fastest-app-on-hive-f19a641976f06est",
      "category": "ecency",
      "title": "Ecency, the best and fastest app on Hive",
      "title_marked": "<mark>Ecency</mark>, the best and fastest app on Hive",
      "body": "Full body text",
      "payout": 34.876,
      "total_votes": 419,
      "created_at": "2018-10-22T06:47:15+00:00",
      "tags": ["ecency", "hive"],
      "depth": 0
    }
  ]
}
```

See the [HiveSearcher API docs](https://hivesearcher.com/api-docs) for the full reference, including `/similar`.
