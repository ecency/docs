---
title: Account Recovery
description: Step-by-step playbook for recovering a lost or compromised Hive account using your owner key and recovery account.
---

# Account Recovery on Hive

Recovering a Hive account is possible, but only if you retained your **previous owner key** and your **recovery account** can vouch for you. Use this playbook the moment you suspect a compromise.

---

## 🔎 Quick Triage

- **Did you lose access to keys but still have the previous owner key?** → Go to **Reset keys with your owner key**.
- **Were your keys changed without permission in the last 30 days?** → Go to **Request a recovery**.
- **Has it been more than 30 days since the keys changed?** → Recovery is no longer possible; create a new account and move any funds you can still access.

> Keep your owner key offline. Never paste it into chats or screenshots.

---

## ✅ Reset keys with your owner key

If you still have your **owner key**, you can rotate all other keys immediately:

1. Open the [Ecency Permissions page](https://ecency.com/@username/permissions) (replace `username`).
2. Click **Change Keys**.
3. Paste your **current owner key** when prompted.
4. Generate new **posting**, **active**, and **memo** keys.
5. Confirm the transaction.
6. Back up the new keys in at least two safe places.

This restores control and invalidates any compromised keys.

---

## 🆘 Request a recovery (within 30 days)

If an attacker changed your keys and you still have the **previous owner key**:

1. Contact your **recovery account** (the account that created yours, often `ecency`, `appreciator`, or a friend/business).
2. Provide your username, the date/time you lost control, and state that you still possess the previous owner key.
3. The recovery account submits a **recovery request** on-chain.
4. Ecency will prompt you to **confirm** the request with your **previous owner key**.
5. On confirmation, generate new posting/active/memo keys and store them securely.

> You have **30 days from the unauthorized key change** to complete this process. After that, the blockchain rejects recovery attempts.

---

## 🧾 Verifying ownership (what to expect)

Recovery accounts may ask for:

- Proof that you control email or socials previously linked to the account.
- Transaction history only you would know (recent transfers, memos).
- The **previous owner key** (entered in a secure form, never in chat).

This protects against fraudulent recovery attempts.

---

## 🧹 After regaining access

- **Rotate keys again** from the Permissions page to ensure only the new set remains valid.
- **Review recent activity** in your wallet and notifications; revoke any active delegations or power-downs you did not start.
- **Change passwords** on any third-party sites that stored your keys.
- Consider updating your **recovery account** to a trusted contact you can reach quickly.

---

## 🛡️ Prevention checklist

- Store the **owner key offline** (hardware or paper) and never use it for daily actions.
- Use **Hive Keychain** or the Ecency mobile app to avoid pasting keys into browsers.
- Keep a record of your **recovery account** and how to contact them.
- Enable **two-factor security** on email and devices tied to your Hive activity.
- Periodically test that you can locate your backups.

If you cannot meet the 30-day window, create a new account via the [account creation guide](/guides/create-account/) and secure it with the practices above.
