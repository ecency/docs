---
title: Set up recurrent transfers
description: Schedule repeating HIVE or HBD payments in the Ecency mobile app, then edit or cancel them.
---

A recurrent transfer sends the same amount of HIVE or HBD to another account on a schedule, for example every week. The Hive blockchain runs the schedule for you, so payments keep going even when you're offline. It's handy for subscriptions, allowances, regular donations or paying a team member.

In Ecency you create and manage recurrent transfers in the **mobile app**. The website shows them in your wallet history.

## Chain rules

These rules come from the Hive blockchain itself:

- **Tokens:** HIVE or HBD only.
- **Shortest interval:** 24 hours.
- **Executions:** at least 2 when you create a schedule.
- **First payment:** sent right away when you create the schedule.
- **Time limit:** the last payment must fall within 730 days (2 years) from now.
- **Up to 255** recurrent transfers per account.
- **No transfers to yourself.**
- **Not enough funds:** if a payment fails because your balance is too low, it is skipped. After 10 failures in a row, the chain deletes the schedule.
- **Key:** recurrent transfers need your active key, like a normal transfer.

## Create a recurrent transfer

1. In the Ecency app, open **Wallet** and tap **HIVE** or **HBD**.
2. Tap **Transfer**.
3. At the top of the transfer screen, under the title, tap the schedule selector. It shows **One Time** by default.
4. Pick **Daily** (24 hours), **Weekly** (168 hours) or **Monthly** (731 hours).
5. Enter the recipient, the **Amount** and the number of **Executions** ("Number of Repeats"). It starts at 2, the minimum.
6. Add an optional **Memo**.
7. Tap **Next**, check the details and confirm.

The app warns you if the recipient is an exchange. Exchanges may not support recurring transfers. Funds sent to them on a schedule can be lost. Use a one-time transfer for exchange deposits.

## See your recurrent transfers

On the HIVE or HBD screen in the app, **Total Recurrent Transfers** shows the total amount you have scheduled. Tap it to open **Recurrent Transfers**. Each row shows:

- The recipient.
- The amount.
- When the next payment is due ("Transfer in ...").
- How many payments are left ("Remaining ... transfers").

Your wallet history, in the app and on the website, shows an entry when you create a schedule. It also shows one for each payment made ("Recurring transfer occurred" on the website).

## Edit a recurrent transfer

Start a scheduled transfer to the same recipient again. When you enter a recipient you already have a schedule with, the app fills in the current amount, memo, interval and remaining executions. Change what you need and confirm. The new settings replace the old ones.

:::caution
Hive allows more than one schedule to the same recipient (created in other wallets). Ecency edits the first schedule it finds for that recipient. If you have several, check the list after editing, or manage them in the wallet that created them.
:::

How the chain handles the timing:

- **Same interval:** the next payment stays on the original schedule.
- **New interval:** the next payment is one new interval after the moment you saved the change. Nothing is sent on the day you edit.

## Cancel a recurrent transfer

You have two ways to cancel:

- In **Recurrent Transfers**, tap the close icon next to a schedule, then **Confirm** on "Unsubscribe recurrent transfer to ...?".
- Or open a scheduled transfer to that recipient and tap **Delete Recurrent Transfer**.

Behind the scenes, cancelling sends the same recurrent transfer with an amount of 0, which tells the chain to delete the schedule. Payments already sent are not returned.

## Related

- [Ecency wallet](/ecency/wallets/about/)
- [Hive tokens](/common/hive-tokens/)
- [Use the mobile app](/guides/use-mobile-app/)
- [Hive accounts and keys](/hive/hive-accounts/)
