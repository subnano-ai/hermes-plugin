---
name: subnano-wallet
description: Inspect selected Nano/Base USDC wallet balances and budgets or send an explicitly approved direct Nano transfer. Post purchases and Comment tips have separate workflows.
---

Use `subnano_wallet_status` for read-only Nano and native Base USDC balances and
local workflow budgets. The bundled CLI `wallet status` returns the same format
with the same origin/state. No setup, receive, signing or grant is needed to inspect
an existing selection. Failed/unknown balances are null, never zero. Report each
asset separately: wallet balance, confirmedSpend, unresolvedExposure, remaining
cumulative allowance and expiresAt. Confirmed spend covers local recorded operations,
not the wallet's lifetime history. Remaining allowance is not a balance or a refill.
Provider/signer configuration and unknown transaction eligibility are separate from
live balance. Pending incoming Nano is not spendable. A readiness request may use
context summary; it preserves USDC flags, while full context contains exact grants.

Before a direct transfer, read [transfers and recovery](references/transfers.md).
If a requested payment needs spending permission, use
`subnano_request_spending_grant({workflow,purpose,cap,expires_at})` on a host with
form elicitation. The human approves the exact account, cap and expiry; never answer
the form. XNO cap uses 30 decimals and nano:mainnet; USDC uses 6 and the selected Base
network. Save `grant.id`. Duplicate terms preserve the original cumulative allowance
and cannot re-enable it. Without forms, use the explicitly authorized trusted CLI
`grant spend` workflow performed by the owner outside the agent runtime: the command
runs only in the owner's interactive terminal, prints the exact cap, network and expiry
and waits for them to type `GRANT`, and CLI `wallet send` is disabled. Never run
owner provisioning, `grant` or `wallet send` through a shell tool. The owner must restrict agent tool/shell access to
exclude provisioning, forged host approvals and changes to private permission state.
An existing grant allows autonomous purchases and tips within its cumulative cap
and expiry; direct transfers still require separate exact host confirmation. A spending grant does not create checkout-delivery consent.
Require the approved exact recipient, amount and existing spending grant. Do not
configure a payout address, receive funds, refill a wallet or expand a grant merely
to make a transfer succeed. Credentials and signatures stay outside chat.

Use `subnano-find-dataset` for purchases and `subnano-discussion` for Comment tips.
After uncertainty retain the original operation and recover only its saved transfer.
