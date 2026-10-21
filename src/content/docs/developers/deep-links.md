---
title: Mobile app deep links
description: Open posts, profiles, feeds and signing requests in the Ecency mobile app with ecency.com links and custom URL schemes.
---

The Ecency mobile app for Android and iOS can be opened from links. You can use regular `https://ecency.com` links, which open the app when it is installed and the website otherwise, or the app's own URL schemes when you know the app is installed.

This page lists the links the app understands and which screen each one opens.

## ecency.com links

The app is registered for these `https://ecency.com` paths (Android App Links and iOS Universal Links). When the app is installed, tapping one of these links opens it directly:

| Link | Opens |
|---|---|
| `/@alice` | Alice's profile |
| `/@alice/posts`, `/@alice/comments`, `/@alice/replies` | Alice's profile on that tab |
| `/@alice/wallet`, `/@alice/points` | Alice's profile on the wallet tab |
| `/@alice/followers`, `/@alice/following` | Alice's followers or following list |
| `/@alice/my-post` | The post `my-post` by Alice |
| `/hive-123456/@alice/my-post` | The same post, linked through its community or tag |
| `/trending`, `/hot` | The feed with that sort |
| `/trending/photography`, `/hot/photography`, `/created/photography` | The tag feed with that sort |
| `/trending/hive-123456` (any community id: `hive-` followed by a 5 to 7 digit number starting with 1, 2 or 3) | The community screen |
| `/waves` | The Waves tab |
| `/waves?text=Hello` | The Waves tab with the composer open and the text filled in |
| `/waves/alice/wave-permlink` | That wave as a thread |

A comment link such as `/hive-123456/@alice/my-post#@bob/re-my-post` opens Bob's comment.

On Android the app is also registered for `/signup`, `/auth` and `/purchase` (see [Account and purchase links](#account-and-purchase-links)).

Any other link you tap inside the app opens in the in-app browser.

## The ecency:// scheme

`ecency://` works like an ecency.com link without the host. Use it when you know the app is installed and you want to skip the browser entirely:

```
ecency://@alice
ecency://@alice/my-post
ecency://trending/photography
ecency://waves?text=Hello
```

The scheme also opens a few screens that have no app link on the web:

| Link | Opens |
|---|---|
| `ecency://wallet` | The Wallet tab |
| `ecency://communities` | The communities list |
| `ecency://search` | Search |
| `ecency://bookmarks` | Bookmarks |

On iOS the older `esteem://` scheme is still accepted and behaves the same.

## Account and purchase links

| Link | Opens |
|---|---|
| `/signup?referral=alice` | Account creation, with Alice as the referrer. `username` and `email` can be prefilled too. |
| `/purchase?type=points&username=alice` | Buy Points for Alice. Add `product_id` to preselect a package. |
| `/purchase?type=boost&username=alice` | Account boost for Alice |
| `/purchase?type=account&username=alice` | Buy an account (`email` and `referral` are optional) |

## Transfers: ecency://transfer

Ask the app to prepare a transfer:

```
ecency://transfer?to=bob&amount=1.5&asset=HIVE&memo=Thanks
```

| Parameter | Description |
|---|---|
| `to` | Recipient account (required) |
| `amount` | Amount, rounded to 3 decimals |
| `asset` | `HIVE`, `HBD` or `POINTS` |
| `memo` | Optional memo |
| `from` | Optional. If set, it must match the account signed in to the app. |
| `callback` | Optional URL the app opens when it is done |
| `request_id` | Optional id echoed back to your callback |

Without `amount` or `asset` (either one missing), the app opens the transfer screen with the recipient filled in. With both, the app shows the transaction for the user to confirm and sign.

## Signing requests: hive://

The app handles [hive-uri](https://www.npmjs.com/package/hive-uri) signing links (the `hive://sign/...` format), so a QR code or link can ask the user to sign a Hive operation:

```
hive://sign/op/<base64url encoded operation>
```

The app shows the operation and the user approves or cancels. If approved, the app broadcasts it with the signed-in account. `ecency://sign/...` is accepted as an alias. One operation per link is supported. Supported operations include transfers, savings, conversions, power up and down, delegations, votes, comments, custom JSON, witness and proxy votes, proposal votes, limit orders, reward claims and account updates.

If the link carries a `callback`, the app opens it when it finishes, adding these query parameters:

| Result | Parameters |
|---|---|
| Success | `status=success`, plus `id` with the transaction id when available |
| Cancelled | `status=error&error=user_cancelled` |
| Failed | `status=error&error=<reason>` |

`request_id` is echoed back when you pass one. The user must be signed in; otherwise the app asks them to log in first.

## Sign in with Ecency: ecency://auth-request

Another app can ask Ecency to confirm which Hive account the user is signed in with. Ecency never sends a key or a reusable token, only a signed proof.

```
ecency://auth-request?callback=<url>&request_id=<id>&username=<account>
```

- `callback` (required): where the app sends the answer. It must be `https` or your app's own scheme. Plain `http`, `ecency:` and `hive:` callbacks are refused.
- `username` (optional): ask for a specific account. Without it, the current account is used.
- `request_id` (optional): echoed back so you can match the answer.

The user sees your callback as the requester and must approve. The answer is sent to your callback:

```
<callback>?status=success&username=alice&code=<proof>&request_id=<id>
<callback>?status=error&error=<code>&request_id=<id>
```

The proof is a HiveSigner style login message, signed with the account's key and naming your callback's scheme and host as its audience. Verify the signature against the account's public keys on chain. Check the timestamp yourself too.

Possible errors are `user_cancelled`, `not_logged_in`, `pin_required`, `use_hivesigner` (the account signed in through HiveSigner or HiveAuth, so the app holds no key to sign a proof) and `internal_error`. Refusals never name an account.

## Schemes the app opens

The app opens `has://` and `waves://` links itself, to hand HiveAuth sign-in and signing requests to a HiveAuth wallet app. These are not schemes the Ecency app answers to, so don't link to them to open Ecency.

## Tips

- Prefer `https://ecency.com` links when you share content. They work for everyone, with or without the app.
- On the first launch after install or an update the app shows its welcome screens and does not act on the link that opened it. Tap the link again afterwards.
- Account names in links are case-insensitive; the app lowercases them.
