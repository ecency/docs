---
title: Common errors and fixes
description: What Ecency and Hive error messages mean and how to fix them, for posting, voting, login, keys, wallet transfers, signup and the mobile app.
---

Find the message you see on screen below. Each entry says what it means and what to do. If your error isn't here, ask in the [Ecency Town Square chat](https://ecency.com/chats/hive-125125/channel) and include the exact message.

## Posting and voting

### "Insufficient Resource Credits."

Your account doesn't have enough Resource Credits (RC) for this action right now. The raw Hive message may say **Please wait to transact, or power up HIVE** or **needs N RC**. RC refills by about 20% per day. To post sooner, top up RC with Points, power up HIVE or ask for a delegation. See [RC troubleshooting](/common/resource-credits/troubleshooting/).

### "This post may be too large to publish"

The mobile app checked your Resource Credits before publishing and they look too low for a post this size. Shorten the post, wait for RC to refill, or top up RC. See [RC troubleshooting](/common/resource-credits/troubleshooting/).

### "You may only post once every five minutes."

Hive allows one top-level post every 5 minutes per account. Wait a few minutes and publish again. Your text stays in the editor, and you can save a draft. Comments and replies only need a few seconds between them.

### "Your current vote on this content is identical to this vote."

You already voted on this post with the same weight. To change your vote, pick a different percentage. Voting 0% removes your vote.

### "Voting for paid out content is not available."

Posts and comments pay out 7 days after they are published. After that, votes are closed and nobody can vote on them. You can still reply.

### "Content after their payout cannot be deleted."

The post is older than 7 days and has paid out, so Hive no longer allows deleting it. You can still edit it. See [Edit and delete posts](/ecency/publish/#edit-and-delete-posts).

### "Cannot delete a content with replies."

Hive doesn't allow deleting a post or comment that has replies. Edit it instead.

### "Cannot delete a content with positive pending rewards."

The post's votes add up to more than zero (net positive votes), so Hive doesn't allow deleting it. Edit it instead.

### My post or comment is greyed out or hidden

Ecency hides content behind a warning when community moderators muted it, when the author has a low reputation (for example **Author of this content has low reputation.** or **Low reputation account with an unverified outbound link**), or when you muted the author. Readers can still reveal it. See [Mute users](/ecency/mute-users/) and [Reputation](/common/reputation/).

### The payout amount is crossed out

A crossed-out payout means the author declined rewards for that post, or it is a cross post (cross posts always decline rewards). Votes still count for ranking. See [Reward options](/ecency/publish/#reward-options).

## Rewards and wallet

### "Pending rewards already claimed."

There is nothing left to claim. The rewards were already claimed, maybe from another app or device. Refresh your wallet to see the updated balance.

### "Insufficient funds" or "Insufficient Funds"

Your balance is lower than the amount you entered. Check the right balance: liquid HIVE for transfers and power ups, HBD for HBD transfers, and for delegations only Hive Power that isn't already delegated or powering down.

### "The user that you are trying to transfer funds to does not exist!"

There's no Hive account with that name. Check the spelling. Hive usernames are lowercase.

### "Use caution sending to this account. Please double check your spelling for possible phishing."

The name you typed is on a list of known scam or look-alike accounts. Look at the spelling letter by letter. Hive transfers can't be reversed.

### "Transfer to an exchange must have a memo."

In the mobile app the warning reads **Sending to (exchange) requires a memo. Without the exchange-provided memo your funds may be lost.**

Exchanges use the memo to know which customer a deposit belongs to. Copy the memo from your exchange's deposit page and paste it exactly. See [Exchanges: deposit and withdraw](/guides/exchanges/).

### "Use only 3 digits of precision"

HIVE and HBD amounts have at most 3 decimals, for example `10.125`. Remove the extra digits.

### "Never put private keys into a memo field, it is publicly visible to everyone."

What you typed in the memo looks like a private key. Memos are public on the blockchain. Delete it from the memo. If you already sent a key in a memo, treat it as leaked and [change your keys](/guides/manage-keys/) right away.

### "Could not decrypt memo. Check your memo key."

Memos that start with `#` are encrypted. Reading one needs your private memo key. Enter the memo key, or log in with your master password. See [Accounts and keys](/hive/hive-accounts/).

## Keys and authority

### "This operation requires Active private key or authority."

You are logged in with your posting key or a posting-only login, but transfers, power ups and downs, delegations, witness and proposal votes and similar wallet actions need your **active** authority. When Ecency asks how to sign, choose Keychain, HiveSigner or enter your active key. You only enter the key once per browser tab. In the mobile app, log in with your active key or master password. See [Login methods](/guides/login-methods/).

### "This operation requires Owner private key or authority."

Changing keys and account recovery settings need your **owner** key, master password or seed phrase. See [Manage keys](/guides/manage-keys/).

### "missing required posting authority"

This raw Hive message means the key you signed with can't post or vote. Your posting key may have changed, or Ecency's posting permission was removed. Log out and log in again with your posting key or master password. If you use HiveSigner, approve the posting permission again.

### "Operation cannot be signed or transactions couldn't be broadcasted. Please, check operation and try again"

The transaction failed to sign or reach the Hive network. Check that you used the right key, then try again. If it keeps failing, reload the page, or try another network. The message under it often has the specific reason.

### "Invalid key format. Please check for invalid characters." or "Failed to process the key. Please verify it is correct."

The key you pasted is incomplete or has extra characters, like a space at the start or end. Copy the whole private key again.

## Login

### "Wrong private key. Master or active or posting private key required."

The key doesn't match this account. Use your master password, or your private active or posting key. A memo key or someone else's key won't work. Check that the username is right too.

### "You entered a public key. Password/WIF required"

Public keys start with `STM` and are safe to share, but they can't log you in. Use the private key, which usually starts with `5`, or your master password, which starts with `P5`.

### "Owner keys cannot sign in here. Use a current active or posting key."

Ecency doesn't log in with the owner key, to keep it safe. Use your posting key, active key or master password.

### "Owner key matches, but active and posting keys have changed. Use a current key."

Your account's active and posting keys were changed after this owner key was set. Use your current posting or active key. If you didn't change them yourself, someone else may have. Follow [Account recovery](/guides/recovery/) now.

### "Invalid seed phrase file. Make sure it has same content as in Ecency signup or just contains 12 words and in txt file format"

The file must be the plain text file Ecency gave you at signup, or a `.txt` file with only your 12 words. You can also type the 12 words instead. See [Seed phrase migration](/guides/seed-phrase-migration/).

### "Couldn't get posting permission"

Ecency couldn't add its posting permission to your account. Try again, and approve the request in your wallet or HiveSigner when asked.

### "Cache inconsistency detected. Please retry login with your credentials." or "User data could not be fetched"

Ecency couldn't load your account data. Log in again. If it keeps happening, wait a few minutes, because a Hive API node may be slow.

### Keychain login errors

- "Missing signature from Keychain. Please try again."
- "No pending login found. Please try logging in again."
- "Invalid login data. Please try again."
- "Login request expired. Please try again."
- "Login failed. Please try again." or "Signing Failed"

The Hive Keychain approval didn't come back to Ecency in time. Start the login again and approve it in Keychain without waiting too long. With Keychain Mobile, start and finish on the same phone.

### MetaMask login errors

- "MetaMask not found. Please install MetaMask browser extension."
- "Could not reach the Hive snap. Unlock MetaMask and try again."
- "Please update the Hive snap in MetaMask, then try again."
- "Could not get Hive keys from MetaMask snap"
- "MetaMask Hive keys do not match this account. Make sure you are using the same MetaMask wallet used during signup."

MetaMask login only works in a desktop browser with the MetaMask extension. Unlock MetaMask, update the Hive snap, and make sure you picked the same MetaMask wallet you used to sign up. See [Login methods](/guides/login-methods/).

## Signup

### "Username has already been taken"

Pick another name. Hive usernames are permanent and unique across all Hive apps.

### "Email address already registered"

This email was already used for an Ecency signup. Use another email, or log in to the account you created before.

### "Please use a permanent email address, or get a Premium account instead"

Temporary or disposable email addresses can't be used for free accounts. Use your regular email, or choose a Premium account.

### "This referral isn't valid"

The referral link has a username that doesn't exist. Check the link with your friend, or sign up without it.

### "Your request couldn't be processed — the signup queue is likely full. Please try again in a few minutes."

Free signups are limited when demand is high. Try again later.

### "VPN connection detected. Please turn off your VPN and try again, or get a Premium account instead." or "Tor connection detected. Please disable Tor while signing up."

To stop abuse, free accounts can't be created through a VPN or Tor. Turn it off and try again, or choose a Premium account.

### "To prevent abuse, we limit the number of accounts per person/network. Please try again from a different network."

Too many free accounts were created from your network. Try from another network, ask a friend to invite you, or choose a Premium account.

### "We couldn't verify your connection right now. Please try again in a few minutes."

The connection check didn't finish. Wait a few minutes and try again.

### "Security check failed to load. Please disable any ad/script blockers and refresh the page." or "Verification failed. Please complete the challenge and try again."

The anti-bot check is blocked or didn't complete. Turn off ad and script blockers for ecency.com, reload the page and complete the check again.

### "Payment received, but the account request didn't go through. Please contact support."

Your payment went through but the account wasn't created. Don't pay again. Ask in the [Town Square chat](https://ecency.com/chats/hive-125125/channel) with your username and payment receipt.

See also [Create an account](/guides/create-account/).

## Mobile app

### "We noticed that your device has incorrect date or time. Please fix Date & Time or Set Automatically and try again."

Hive transactions carry a timestamp, and they fail when your phone's clock is wrong. Turn on automatic date and time in your phone settings. If that doesn't help, change the API server in **Settings > Server**.

### "Connection issue, change server and restart" or "Server not available"

The app couldn't reach its Hive API server, or the server you picked is down. Open **Settings > Server**, pick another server and restart the app.

### "Corrupt app state, please relogin to reset state."

The app's saved login data couldn't be read, often after an update or restore. Log out and log in again.

### "Your session has expired. Please verify your login to confirm access to your account."

Your login session (often HiveAuth) has expired. Log in again and approve the request in your wallet app if asked.

### "Video file is too large. Maximum size is 1GB."

Videos uploaded in the app can be at most 1 GB. Trim or compress the video first.

## Points and AI

### "Your request is still being processed and may already be charged. Please wait a minute before trying again."

Your AI request is still running. Wait a minute before you try again, so you aren't charged twice. See [AI assist](/ecency/ai-assist/).

## General

### "Process could not be completed due to server error"

Something failed on Ecency's side. Wait a moment and try again. If it keeps happening, tell us in the [Town Square chat](https://ecency.com/chats/hive-125125/channel).
