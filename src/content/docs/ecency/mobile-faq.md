---
title: Mobile app FAQ
description: Quick answers to common questions about the Ecency mobile app on Android and iOS.
---

Answers to the most common questions about installing, signing in to and using Ecency on mobile. For a tour of the app, see [Using the Ecency mobile app](/guides/use-mobile-app/).

## How do I install the app?

- **Android:** [Google Play](https://android.ecency.com)
- **iOS:** [App Store](https://ios.ecency.com)
- You can also download Android releases from [GitHub](https://github.com/ecency/vision-mobile/releases).

## What sign-in options are available?

- **Username and password or private key.** Use your posting key for everyday use. The key is stored encrypted on your device.
- **HiveAuth / Keychain.** Approve the login in a HiveAuth-compatible app such as Hive Keychain mobile. On mobile, Keychain works through HiveAuth.
- **Hivesigner.** Sign in without saving a key on your device.
- **QR code from the web.** If you are already logged in on ecency.com, open the menu and choose **Log in to Mobile**, reveal the QR code, then scan it with the QR scanner in the app.

Never use your **owner key** to log in. See [Login methods](/guides/login-methods/) for details.

## How do push notifications work?

- Allow notifications when the app asks, or turn them on in **Settings → Push Notification**.
- Choose which kinds you get, such as votes, comments, mentions, follows, reblogs, transfers, delegations and payouts.
- If they stop working, open the app while you are online and make sure battery optimization isn't blocking Ecency.

## What if I don't have enough Resource Credits?

- Buy an **Account Boost** (in-app purchase) or use **Boost+** (Points) from **Perks** for a temporary Hive Power delegation.
- **Power up** a small amount of HIVE if you have some.
- Wait: RC regenerates by about 20% per day.

See [Resource Credits](/hive/resource-credits/) for more.

## What is the difference between Boost+, Account Boost and Promote?

- **Boost+:** spends Points on a temporary Hive Power delegation for more RC and voting influence.
- **Account Boost:** an in-app purchase that gives a 30-day Hive Power delegation without using Points.
- **Promote:** spends Points to show a post in the Promoted feed. It doesn't guarantee votes.

See [Boost and promote](/ecency/boost-and-promote/) for a detailed comparison.

## Where can I find drafts and bookmarks?

Open the side menu and tap **Drafts** or **Bookmarks**. Drafts are saved to your Ecency account, so you can continue them on the web too. See [Notifications, drafts and bookmarks](/ecency/notifications-drafts-bookmarks/).

## How do I switch accounts?

1. Open the side menu.
2. Tap the options icon next to your name at the top.
3. Pick another account from the list, or tap **Add an existing account** to sign in to a new one.

Your accounts stay saved, so you don't need to log out to switch.

## The app is slow, keeps crashing or won't post. What can I try?

Try these in order:

1. **Update the app.** Open the App Store or Google Play page for Ecency and install the latest version. If the store shows no update, it may still be rolling out to your region. Try again in a day or two.
2. **Check your phone's date and time.** Turn on automatic date and time. A wrong clock makes Hive transactions fail with **We noticed that your device has incorrect date or time**.
3. **Switch the API server.** Open **Settings > Server**, pick another server and restart the app. This fixes **Connection issue, change server and restart**. **Server not available** means the server you picked is down, so pick another.
4. **Log out and back in** if you see **Corrupt app state, please relogin to reset state.**
5. **Check your Resource Credits** if posting, voting or commenting fails. See [RC troubleshooting](/common/resource-credits/troubleshooting/).
6. **Use the website meanwhile.** Everything works on [ecency.com](https://ecency.com) in your phone's browser.

For other messages, see [Common errors and fixes](/common/errors/).

## Where did SPK Network go? Can I still upload video?

App 3.5.8 removed SPK Network wallet support (the SPK and LARYNX tokens). Video upload still works: videos go to 3Speak as before. See [Videos](/ecency/publish/#videos).

## I forgot my PIN code

The PIN protects the app on your phone, not your Hive account. After 2 wrong tries the app warns **User data will be wiped on next failed attempt**. The 3rd wrong PIN logs out every account in the app and removes the PIN. Tapping **Oh, I forgot it...** does the same after you confirm.

Your Hive account and funds are safe either way. Log in again with your keys, master password, HiveSigner or HiveAuth, then set a new PIN. Make sure you have your keys before you try to guess.

## What is "Enable Faster Posting"?

If you log in with HiveAuth or HiveSigner, the app may offer **Enable Faster Posting**. It gives the `ecency.app` account posting permission on your account, so you can post, comment and vote without approving each action in your wallet app. With a HiveSigner login it is needed to post at all: until you grant it, posting fails. It can't transfer funds or change keys. To remove it later, open your Permissions page on ecency.com and click **Revoke** next to `ecency.app` under **Posting active sessions**. See [Manage keys](/guides/manage-keys/).

## How can I report a bug or get support?

- In the app, open the side menu and tap **Docs** for the documentation.
- Use **Settings → Send Feedback** to email the team.
- Ask in the [Ecency Town Square chat](https://ecency.com/chats/hive-125125/channel) or open an issue on [GitHub](https://github.com/ecency/vision-mobile/issues).
