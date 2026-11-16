---
name: subnano-wallet
description: Inspect selected Nano/Base USDC wallet balances and budgets or send an explicitly approved direct Nano transfer. Post purchases and Comment tips have separate workflows.
---

Verify the intended account, origin and wallet in `subnano_context`. Use `subnano_wallet_status` to read live balances and configured budgets. Wallet configuration does not prove current payment authority.

For exact direct Nano transfers use the [transfer workflow](references/transfers.md). Fresh qualified human confirmation is required. A budget never authorizes a transfer. After uncertainty inspect the original transfer using its operation ID. [Wallet workflows](references/workflows.md).
