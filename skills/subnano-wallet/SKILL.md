---
name: subnano-wallet
description: Inspect selected Nano/Base USDC wallet balances and budgets or send an explicitly approved direct Nano transfer. Post purchases and Comment tips have separate workflows.
---

Use `subnano_wallet_status` for read-only Nano and native Base USDC balances and
current rolling budgets and retained legacy workflow allowances. The bundled CLI `wallet status` returns the same format
with the same origin/state. No setup, receive, signing or grant is needed to inspect
an existing selection. Failed/unknown balances are null, never zero. Report each
asset separately: wallet balance, confirmedSpend, unresolvedExposure, remaining
rolling cap, used, remaining and next availability; label a retained cumulative allowance
and expiresAt separately. Confirmed spend covers local recorded operations,
not the wallet's lifetime history. Remaining allowance is not a balance or a refill.
Provider/signer configuration and unknown transaction eligibility are separate from
live balance. Pending incoming Nano is not spendable. A readiness request may use
context summary; it preserves USDC flags, while full context contains exact grants.

New purchases and tips use the current rolling budget and separately recorded
standing delivery consent, or a human exact payment dialog. Agent money is off until
the operator sets both controls; it never opens a dialog. Native human mode has no
budget and asks for each exact payment. A live legacy spending grant is used only
with its explicit `grant_id`, retaining its original cumulative cap/expiry and separate
checkout consent. Inspect `permissionPolicy` and preserve the original operation.

Use `subnano-find-dataset` for purchases and `subnano-discussion` for Comment tips.
After uncertainty retain the original operation and recover only its saved transfer.

Direct Nano transfer tools are absent in agent mode. For a requested human transfer,
read [exact transfer and original recovery](references/transfers.md): the exact
recipient/amount always needs qualified host confirmation. A decline is final for
that intent; hosts without forms cannot start a new direct transfer.
