---
title: Earn interest with HBD savings
description: Move HBD into savings on Ecency, see and claim the interest, and withdraw with the 3-day waiting period.
---

HBD (Hive Backed Dollars) is Hive's dollar-pegged token. HBD you keep in **savings** earns interest. The rate is set by Hive witnesses and is currently about 10% APR. You can see the live rate in the HBD savings interest card on Ecency.

Only HBD in savings earns interest. Liquid HBD and HIVE in savings don't.

## How the interest works

- **Witnesses set the rate.** It is a chain-wide value (`hbd_interest_rate`), so it can change. Ecency shows the current rate as "Interest is calculated continuously at ...% APR".
- **It builds up all the time.** The chain tracks how much HBD you held in savings and for how long.
- **It is paid in batches of at least 30 days.** The chain pays the built-up interest the next time your HBD savings balance changes, as long as more than 30 days have passed since your last interest payment. The interest is added straight to your savings balance, so it compounds.
- **The smallest unit is 0.001 HBD.** Interest only starts once you hold at least 0.001 HBD in savings.

## Deposit HBD to savings

1. Log in on [ecency.com](https://ecency.com) and open your **Wallet** from your profile.
2. Open **HBD**.
3. Choose **Savings Deposit** ("Protect funds by requiring a 3 day withdraw waiting period").
4. Enter the amount, an optional memo, and confirm. This needs your active key or a signer such as Hive Keychain.

The HBD moves from your liquid balance into savings right away and starts earning interest.

In the mobile app, open **Wallet**, tap **HBD** and use the savings action (**Transfer To Saving**).

## See and claim your interest

On the HBD page you'll see the **HBD savings interest** card once you have savings or unpaid interest. It shows:

- The interest built up so far, in HBD.
- **Next claim**: "Available in ..." or "Ready to claim now".
- Your **Savings balance**.

When 30 days have passed since your last payment, click **Claim interest** (**Claim HBD Interest**). Ecency then sends a tiny withdrawal of 0.001 HBD from savings and cancels it in the same transaction. That balance change is what makes the chain pay out. Your savings stay where they are, and the interest is added to your savings balance.

You don't have to claim. Any deposit or withdrawal after the 30 days also triggers the payout.

If you emptied your savings but still have unpaid interest, the card asks you to deposit at least 0.001 HBD first. The claim needs something in savings to move.

## Withdraw from savings

1. On the HBD page, choose **Savings Withdraw** ("Withdraw funds after the required 3 day waiting period").
2. Enter the amount and confirm with your active key.
3. The HBD arrives in your liquid balance after **3 days**.

The 3-day wait is a Hive security rule. If someone gets hold of your active key, you have time to notice and act before savings can leave. Hive allows up to 100 pending savings withdrawals per account.

### Cancelling a withdrawal

Hive lets you cancel a pending savings withdrawal during the 3 days, and the funds stay in savings. Ecency's wallet doesn't have a cancel button for this yet. You can do it with any Hive wallet that supports the `cancel_transfer_from_savings` operation, signed with your active key.

## Tips

- **Interest is paid in HBD, not dollars.** HBD aims to track 1 USD, but it is a crypto token and the peg can move.
- **Plan for the wait.** Keep some liquid HBD if you might need it quickly.
- **Rates change.** Check the APR on the card before you count on a figure.

## Related

- [Hive tokens](/common/hive-tokens/)
- [Ecency wallet](/ecency/wallets/about/)
- [Payouts and conversions](/ecency/wallets/payouts-and-conversions/)
- [Hive governance](/hive/governance/)
- [Vote for witnesses](/guides/vote-witness/)
