---
title: Hive accounts
description: Understand how Hive accounts work, including keys, authorities, the master password and account recovery.
---

A Hive account is your identity on the Hive blockchain. You use it to post, vote, comment, transfer funds and use apps built on Hive, including Ecency. The same account works in every Hive app.

## Account structure

Hive accounts have **human-readable usernames**, like `alice` or `bob123`. Each account has:

- A **unique name** that can't be changed
- A set of **private and public keys**
- A **reputation score** (see [reputation](/common/reputation/))
- **Resource Credits (RC)** for making transactions (see [Resource Credits](/hive/resource-credits/))

Hive accounts can't be deleted. The account and all of its activity are stored on the blockchain permanently.

## Keys and authorities

Every Hive account has four keys. Each key gives a different level of access, called an authority. Use the weakest key that can do the job.

| Key | What it can do | How to treat it |
| --- | --- | --- |
| **Owner** | Change any key, including the owner key, and recover the account | Keep it offline. Use it only when needed. |
| **Active** | Transfers, power up and down, conversions, savings, market orders, delegations, witness and proposal votes | Use it only for wallet and governance actions. |
| **Posting** | Post, comment, edit, vote, reblog, follow, mute and update your profile | Use it for everyday activity. |
| **Memo** | Encrypt and decrypt private memos in transfers | Needed only to read or send encrypted memos. |

### Posting key

The posting key covers social actions: posting, commenting, editing, voting, reblogging, following and muting. Profile updates, like your name, about text, avatar and cover image, also use posting authority. Most of the time, this is the only key you need. Because you use it often, it's deliberately limited: someone with only your posting key can't move your funds.

### Active key

The active key is for sensitive actions that involve funds or governance: transfers, powering up and down, HBD conversions, savings, market orders, delegations, and votes for witnesses and proposals. Only enter it when an action needs it.

### Owner key

The owner key is the most powerful key. It can change every other key, including itself, and is used to recover a compromised account. Store it offline and use it only when necessary. Browser extensions can't sign owner-level changes, so for those you enter your owner key or master password directly.

### Memo key

The memo key encrypts and decrypts private memos. When you start a transfer memo with `#`, it's encrypted so only you and the receiver can read it.

### Master password

Ecency signup generates your keys for you. The master password (or seed phrase) is used to derive all of your keys, including the owner key. Anyone with your master password can take your account and everything in it, so:

- Save it somewhere safe and offline, like a password manager, an encrypted drive and a printed copy.
- Never share it or paste it into a site you don't trust.
- Log in with your posting key or a signing app for daily use, and keep the master password for emergencies.

To change or back up your keys, see [manage keys](/guides/manage-keys/).

## Signing in

You can sign in to Ecency with a browser extension like Hive Keychain or Hive Keeper, with HiveSigner, with MetaMask, with HiveAuth on mobile, or with your key or seed file. See [login methods](/guides/login-methods/) for every option.

## Creating an account

You can create a Hive account with [Ecency signup](https://ecency.com/signup) or follow the [account creation guide](/guides/create-account/). Other Hive apps and services can also create accounts.

## Lost keys and account recovery

If you lose your master password and owner key, nobody can recover your account. Keep offline backups in more than one place.

If someone steals your account and changes your keys, your **recovery account** can help you get it back. This only works within **30 days** of the change, and you need an owner key that was valid during those 30 days. Act quickly. See the [account recovery playbook](/guides/recovery/).

## Summary

- Hive accounts are permanent, human-readable identities.
- Use the posting key for daily activity and the active key only for wallet and governance actions.
- Keep the owner key and master password offline.
- Recovery is only possible within 30 days, with a recent owner key.
