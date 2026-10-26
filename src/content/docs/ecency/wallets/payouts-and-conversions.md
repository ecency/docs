---
title: Payouts and conversions troubleshooting
description: Understand seven-day payouts, claiming rewards and conversions between HIVE and HBD on Ecency.
---

If rewards or conversions look stuck, use this guide to understand the timelines and fix the most common issues.

## Reward payouts

### When do I get paid for my post?

Posts and comments pay out **7 days** after you publish them. Until then the amount shown is an estimate (pending payout) that changes as votes come in. After the payout, the rewards wait in your wallet until you claim them.

- **Split:** rewards are shared between the author and the curators who voted, 50/50. Beneficiaries take their share out of the author part.
- **Where they go:** the author share is normally half Hive Power and half HBD, unless you chose **Stake 100%** for the post (see [Reward options](/ecency/publish/#reward-options)). Curation rewards are paid in Hive Power.

:::note
The HBD half of author rewards depends on the chain's HBD print rate. While that rate is 0 (as it is now), the HBD half is paid as liquid HIVE instead. You can check the current value as `hbd_print_rate` on any Hive block explorer.
:::

### How do I claim my rewards?

On the web, press **Collect all** in your wallet, or the claim button on a token's page. In the mobile app, tap the button showing your unclaimed amount (for example `0.512 HP +`) on the token's card in the wallet. Claiming needs your **posting** authority and a little RC.

### My payout is still pending after 7 days

- Check the post's age: the 7 days count from when it was published, not from when you last edited it.
- Payouts go to your wallet as rewards to claim, not straight into your balance. Look for the claim button.
- Make sure you're signed in with the account that wrote the post.
- Payouts below 0.020 HBD in value are not paid at all, so tiny pending amounts can disappear at payout.

### Why is my reward lower than expected?

- **The pending amount is only an estimate.** It changes with every vote until payout, and with the HIVE price.
- **Curators get half.** The payout shown on a post is the total. You get the author half, minus any beneficiaries.
- **Downvotes reduce it.** A downvote, even late, takes value away.
- **Late votes count for progressively less.** In the last 12 hours before payout, a vote's strength shrinks steadily toward zero: with 11 hours left it keeps about 92%, with 1 hour left about 8%.
- **Votes depend on the voters' Hive Power and vote weight.** A smaller account or a lower vote weight gives a smaller vote.
- **Delegation rewards are separate.** Points for delegating to @ecency change with your delegation and pause after 90 days without activity. The daily HIVE curation share changes with Ecency's curation rewards that day and the holdback you chose. See [Ecency Points](/ecency/ecency-points/#why-does-my-daily-delegation-reward-change).

### Troubleshooting payouts

- **I don't see anything to claim:** wait until the post is at least 7 days old. Check that you're signed in with the right account. The message **Pending rewards already claimed.** means there is nothing left to claim.
- **Claim failed:** claiming rewards needs your **posting** authority. Sign in again with your posting key, Keychain, HiveSigner or the mobile app, then try again.
- **Rewards are lower than expected:** late downvotes or a lower HIVE price reduce the payout. In the last 12 hours before payout, upvotes and downvotes are both scaled down toward zero. Check the post's votes.
- **Not enough RC:** claiming is a blockchain transaction and needs Resource Credits. See [RC troubleshooting](/common/resource-credits/troubleshooting/).

## Conversions between HIVE and HBD

- **HBD to HIVE:** the blockchain conversion takes **3.5 days** and uses the median price feed at the moment it completes. Once requested, it can't be cancelled.
- **HIVE and HBD on the market:** a [market](/ecency/market/) swap fills from the order book and is usually much faster, as long as there are enough orders.
- **Fees:** the conversion has no protocol fee, but price changes during the 3.5 days can affect the final amount.

### Troubleshooting conversions

- **Still pending after a day:** HBD to HIVE conversions always take 3.5 days.
- **Wrong amount received:** the price used is the median price feed when the conversion completes, not the price when you asked. It can differ from the market price at the time of your request.
- **Need it faster:** use a market swap instead of a conversion.
- **No balance change after the request:** refresh and make sure you converted from your liquid HBD balance, not from savings.

## Related actions

- Move HBD to **savings** to earn interest (set by witnesses, currently about 10% APR). Withdrawals take **3 days**. See [HBD savings interest](/guides/hbd-savings-interest/).
- Use **Power up** and **Power down** to move between liquid HIVE and Hive Power. See [Power up and power down](/guides/power-up-down/).
- Check payout and conversion history on each token's page in your [wallet](/ecency/wallets/about/).
