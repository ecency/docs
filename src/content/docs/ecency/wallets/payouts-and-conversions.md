---
title: Payouts and conversions troubleshooting
description: Understand seven-day payouts, claiming rewards, and conversions between HIVE and HBD on Ecency.
---

If rewards or conversions look stuck, use this guide to understand the timelines and fix the most common issues.

## Reward payouts

- **Pending rewards:** posts and comments pay out after **7 days**. The amount shown before then is an estimate that changes as votes come in.
- **Split:** rewards are shared between the author and the curators who voted, 50/50. Beneficiaries take their share out of the author part.
- **Claiming:** after the payout, your rewards wait in your wallet until you claim them. Press **Collect all** in your wallet, or the claim button on a token's page.
- **Where they go:** the author share is normally half Hive Power and half HBD, unless you chose **100% Hive Power** for the post. Curation rewards are paid in Hive Power.

:::note
The HBD half of author rewards depends on the chain's HBD print rate. While that rate is 0 (as it is now), the HBD half is paid as liquid HIVE instead. You can check the current value as `hbd_print_rate` on any Hive block explorer.
:::

### Troubleshooting payouts

- **I don't see anything to claim:** wait until the post is at least 7 days old, and check that you're signed in with the right account.
- **Claim failed:** claiming rewards needs your **posting** authority. Sign in again with your posting key, Keychain, HiveSigner or the mobile app, and try again.
- **Rewards are lower than expected:** late downvotes or a lower token price reduce the payout. Check the post's votes.
- **Not enough RC:** claiming is a blockchain transaction and needs Resource Credits. See [RC troubleshooting](/common/resource-credits/troubleshooting/).

## Conversions between HIVE and HBD

- **HBD to HIVE:** the blockchain conversion takes **3.5 days** and uses the median price feed at the moment it completes. Once requested, it can't be cancelled.
- **HIVE and HBD on the market:** a [market](/ecency/market/) swap fills from the order book and is usually much faster, as long as there are enough orders.
- **Fees:** the conversion has no protocol fee, but price changes during the 3.5 days can affect the final amount.

### Troubleshooting conversions

- **Still pending after a day:** HBD to HIVE conversions always take 3.5 days.
- **Wrong amount received:** the price used is the median price feed when the conversion completes, not the price when you asked. It can differ from the market price at the time of your request.
- **Need it faster:** use a market swap instead of a conversion.
- **No balance change after the request:** refresh, and make sure you converted from your liquid HBD balance, not from savings.

## Related actions

- Move HBD to **savings** to earn interest (set by witnesses, currently about 10% APR). Withdrawals take **3 days**. See [HBD savings interest](/guides/hbd-savings-interest/).
- Use **Power up** and **Power down** to move between liquid HIVE and Hive Power. See [Power up and power down](/guides/power-up-down/).
- Check payout and conversion history on each token's page in your [wallet](/ecency/wallets/about/).
