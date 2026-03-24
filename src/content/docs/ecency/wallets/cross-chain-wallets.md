---
title: Cross-chain wallets
description: Manage ETH, BNB, SOL, and BTC wallets alongside your Hive balances in Ecency using MetaMask.
---

# Cross-chain wallets

Ecency supports external wallets for **BTC**, **ETH**, **BNB**, and **SOL** so you can monitor balances and send transfers next to your Hive assets.

> **What changed:** Ecency previously supported TRON, TON, and APT wallets and used seed phrases to generate addresses. The wallet system now uses **MetaMask** for address discovery, key management, and transaction signing. If you have funds in a wallet created with a seed phrase, see the [seed phrase migration guide](/guides/seed-phrase-migration/) to move them to an external wallet.

---

## Setting up external wallets

There are two ways to add external wallet addresses to your Ecency account:

### Link MetaMask (recommended)

1. Go to **Wallet** and click **Setup External Wallets**.
2. Choose **Link MetaMask**.
3. MetaMask will discover your ETH, BNB, and SOL addresses automatically.
4. The Hive Snap is installed to derive Hive keys inside MetaMask, enabling MetaMask login.
5. Your wallet addresses are stored in your Hive account metadata.

After linking, you can **send ETH, BNB, and SOL** directly from your wallet page — MetaMask handles signing.

### Watch Wallet (view-only)

1. Go to **Wallet** and click **Setup External Wallets**.
2. Choose **Watch Wallet**.
3. Enter wallet addresses manually for any supported chain.
4. Balances are displayed but **transfers are not available** — this is view-only.

---

## Sending transfers

Transfer support requires MetaMask-linked wallets. From your wallet page:

1. Navigate to the token page (e.g., **/@you/wallet/eth**).
2. Click **Send**.
3. Enter the recipient address and amount.
4. Review the transaction details and estimated network fee.
5. Click **Confirm with MetaMask** — MetaMask shows its signing popup.
6. Once confirmed, the transaction is broadcast to the network.

| Chain | Transfer support | Signing method |
|-------|:---:|-------|
| **ETH** | Yes | MetaMask `eth_sendTransaction` |
| **BNB** | Yes | MetaMask `eth_sendTransaction` + chain switch |
| **SOL** | Yes | MetaMask Wallet Standard |
| **BTC** | Coming soon | — |

> **Watch-only wallets** do not support transfers. You need to link MetaMask to send tokens.

---

## Receiving tokens

All wallet types (MetaMask-linked and watch-only) support receiving:

1. Navigate to your token page.
2. Click **Receive** to see your address and QR code.
3. Share the address or QR with the sender.

---

## Login to mobile app

MetaMask users can transfer their web session to the Ecency mobile app:

1. Open the user menu and click **Log in to Mobile**.
2. Read the security warning and click **Reveal QR code**.
3. Open the Ecency mobile app and tap the QR scanner.
4. Scan the QR code — you're logged in on mobile.

> The QR code contains your session credentials. Do not share it, screenshot it, or scan it in public spaces.

---

## Security tips

- MetaMask handles all private key storage — Ecency never sees your external chain keys.
- Start with small test transfers, especially on chains you haven't used before.
- Verify recipient addresses carefully — blockchain transactions are irreversible.
- Keep MetaMask and your browser updated.
- If you were previously given a **seed phrase**, keep it safe until you have [migrated all funds](/guides/seed-phrase-migration/).
