---
title: "Exchanges: deposit and withdraw"
description: Send HIVE from Ecency to an exchange with the right memo, withdraw HIVE from an exchange to your Hive account, and what to do when a deposit goes missing.
---

You can buy and sell HIVE on many crypto exchanges, such as Binance, Upbit or Gate. Moving HIVE between an exchange and your Hive account is a normal Hive transfer: it arrives in seconds and has no fee.

## Send HIVE to an exchange

1. On the exchange, open **Deposit** and pick **HIVE** on the **Hive** network.
2. The exchange shows a deposit **account name** and a **memo** (sometimes called tag or note). You need both.
3. On Ecency, open your wallet, open **HIVE** and choose **Transfer**.
4. Enter the exchange's account name in **To**, the amount, and paste the memo **exactly** as shown.
5. Confirm and sign with your active key, Keychain or HiveSigner.

The exchange credits your deposit after it sees the transfer, usually within minutes.

Good to know:

- **The memo is required.** The exchange uses it to find your account. Ecency warns you with **Transfer to an exchange must have a memo.** when you send HIVE or HBD to a known exchange account without one (in the mobile app: **Sending to (exchange) requires a memo.**).
- **Only liquid balances can be sent.** Hive Power must be [powered down](/guides/power-up-down/) first (13 weekly payments), and HBD in savings takes 3 days to withdraw.
- **Check which tokens the exchange accepts.** Most exchanges list HIVE. Few accept HBD, so check the deposit page before sending HBD.
- **Send a small test first** if you've never used that exchange.
- **Never put a private key in the memo.** Memos are public.
- Hive transfers can't be reversed. Check the account name letter by letter. Ecency warns you about known scam look-alike names.

## Withdraw HIVE from an exchange

1. On the exchange, open **Withdraw** and pick **HIVE** on the **Hive** network.
2. Enter your **Hive username** as the address (without `@`).
3. Leave the memo empty, unless you are withdrawing to another exchange, which then needs its own deposit memo.
4. Confirm. The HIVE arrives as liquid HIVE in your Ecency wallet.

From there you can [power up](/guides/power-up-down/), [put HBD in savings](/guides/hbd-savings-interest/) or swap on the [Market](/ecency/market/).

## My deposit didn't arrive

- **Forgot the memo or used the wrong one?** The HIVE reached the exchange's account, but the exchange can't tell it's yours. Contact the exchange's support and give them the transaction ID and the amount. Ecency can't reverse or recover it.
- **Find the transaction ID:** open your wallet history on Ecency, or look up your account on a Hive block explorer such as [HiveExplorer](/extra-services/hivexplorer/).
- **Sent to the wrong account?** Only the owner of that account can send it back. See [What if my tokens are stolen or sent to the wrong account?](/faq/#what-if-my-tokens-are-stolen-or-sent-to-the-wrong-account)
- **The exchange shows the deposit as pending?** Exchanges may wait for extra confirmations or have the HIVE wallet under maintenance. Check their status page.

## Related

- [Wallet](/ecency/wallets/about/)
- [Hive tokens](/common/hive-tokens/)
- [Common errors and fixes](/common/errors/)
