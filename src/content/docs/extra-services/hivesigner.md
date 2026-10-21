---
title: HiveSigner
description: HiveSigner is an OAuth2 login and signing service for Hive, maintained by Ecency, with a JavaScript SDK for apps.
---

[HiveSigner](https://hivesigner.com) is a secure login and signing service for Hive, co-developed and maintained by
Ecency. It works like OAuth2: users log in on hivesigner.com and approve what an app may do. The app never sees
their private keys.

## For users

When you log in with HiveSigner, your keys stay with HiveSigner. The app gets an access token that lets it post, vote
and follow for you. For transfers and other active-key actions, HiveSigner asks you to sign each one on
hivesigner.com.

See [login methods](/guides/login-methods/) for how HiveSigner compares with the other ways to log in to Ecency.

## For developers

Register your app in the HiveSigner dashboard, add your redirect URI, then use the `hivesigner` npm package
(currently v4, Node.js 18 or newer):

```sh
npm install hivesigner
```

Create a client and send the user to HiveSigner to log in:

```js
import { Client } from "hivesigner";

const client = new Client({
  app: "your-app-account",           // the app account you registered
  callbackURL: "https://example.com/callback", // must match a registered redirect URI exactly
  scope: ["vote", "comment"],
});

// Send the user to hivesigner.com. After login, HiveSigner redirects back to
// callbackURL with access_token, expires_in and username in the query string.
window.location.href = client.getLoginURL("some-state");
```

With the access token, call the API on the user's behalf:

```js
client.setAccessToken(accessToken);

const me = await client.me();
await client.vote("alice", "bob", "hello-world", 10000);
await client.broadcast(operations); // any posting operations
client.revokeToken(); // log the user out of your app
```

For active operations such as transfers, send the user to HiveSigner to sign:

```js
import hivesigner from "hivesigner";

const op = ["transfer", { from: "__signer", to: "bob", amount: "1.000 HIVE", memo: "" }];
hivesigner.sendOperation(op, { callback: "https://example.com/done" }, () => {});
```

The full API reference and integration guide are at [hivesigner.com/docs](https://hivesigner.com/docs). The SDK
source is [ecency/hivesigner-sdk](https://github.com/ecency/hivesigner-sdk).

The [Ecency SDK](/developers/sdk/) uses HiveSigner tokens for posting operations and HiveSigner hot signing for active
operations through its platform adapter.
