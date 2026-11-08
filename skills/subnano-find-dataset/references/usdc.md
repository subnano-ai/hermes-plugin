## Base USDC purchases — local build 0.3.0

Read public preview and the exact indicative USDC offer before purchase; no quote
is allocated by discovery. For paid offers search with `access: paid` and paired `asset: USDC`,
`network: eip155:8453`, `max_amount_atomic`. Unknown/unavailable is not free.
Use only an explicitly configured dedicated local agent private key for MCP USDC payment.
It supports EOA or compatible existing delegated primary-key proofs, subject to a fresh
server signing checkpoint and enabled server policy. Generic ERC-1271 signing has no
native MCP adapter. `payment.ready` is configuration readiness, not chain eligibility;
`transactionEligibility:"unknown"` and `requiresServerPrepare:true` remain explicit.
Static `serverProofClasses` describes this client version, not live deployment enablement.
Configuration readiness is separate from a live balance; use `subnano_wallet_status`.
Context/preflight does not verify live chain eligibility; connected `/.well-known/x402` flags and
transaction preparation are authoritative.
Inspect `configuredSignerKind`, `nativeProofClasses`, `serverProofClasses` and
`genericContractSigning:false`. Delegated/contract admission flags default off; hosted
facilitator, physical MetaMask iOS and mainnet smart-account support remain unqualified.
Production supports native Base USDC, six decimals. Sepolia is loopback-only and
explicit; never switch networks or wallets to bypass an error.

Trusted terminal commands (same origin/private state as MCP):

After owner login, a form-capable host can use `subnano_request_spending_grant`
instead of terminal `grant spend`. Supply workflow, purpose, a future `expires_at`
and `cap:{asset:"USDC",network:"eip155:8453",atomic:"200000",decimals:6}` for 0.20 USDC.
Only the connected human's confirmation grants permission; never answer the form.
Save `grant.id`. Repeated terms retain the same cumulative allowance. Hosts without
forms require the owner to provision the budget outside the agent runtime using
the commands below. The agent must not run `grant spend` or change permission state.
`grant spend` runs only in the owner's own interactive terminal: it prints the cap,
asset, network, wallet and expiry and waits for them to type `GRANT`; piped input,
including a shell tool, is refused. Setup and key import stay in the CLI.

```sh
node "${PLUGIN_ROOT}/server/cli.js" --state-dir /absolute/private/selected-account setup base --network eip155:8453 --input-file /absolute/private/agent-key.json
node "${PLUGIN_ROOT}/server/cli.js" --state-dir /absolute/private/selected-account setup base-login
node "${PLUGIN_ROOT}/server/cli.js" --state-dir /absolute/private/selected-account grant spend --workflow NAME --purpose TEXT --cap-usdc 0.20 --network eip155:8453 --expires-at ISO_TIMESTAMP
```

The dedicated key file is absolute, owner-only `0600` and contains `{privateKey}`;
never import a human wallet key. Selection creates no server identity. SIWX login
obtains the owner session before buying; a grant may precede login, but the owner
and dedicated signer are required before any operation or allowance reservation.
Existing owners stay selected and their paying wallet must already be linked.

Call `subnano_buy_post` with `post_id`, `grant_id` and the inspected exact
`payment: {asset: USDC, network: eip155:8453, atomic: "100000", decimals: 6}`.
Do not supply legacy `amount_raw` at the same time. The client uses the owner Bearer,
first saves the original agreement and stops before signing until consent is
explicit. Review `purchaseAgreement`; set `accept_immediate_delivery: true` only
with the buyer's express permission to immediate delivery and acknowledgement
of losing the applicable withdrawal right when delivery begins. Repeat the same
Post/grant/amount. A workflow spending grant is not this consent. Keep the saved
agreement and confirmation returned by purchase status. The client uses the
original server signing guard and stock exact payment payload. Payment responses
never adopt or replace the owner session. External Base wallets retain SIWX
login/link and reads; USDC external payment handoff is removed. Nano external
payment remains available. No ETH gas or token approval is requested.

Save the operation ID. Confirmed and unresolved spend share the original durable
wallet/workflow allowance across restarts and same-wallet login renewal. For timeout,
response loss or paused issuance, recover that same `subnano_purchase_status` or
`subnano_operation` with the owner Bearer and exact saved terms. Recovery never
creates a replacement or repeats an uncertain signing attempt. Existing private
owner-session refresh staging remains; an expired family needs `setup base-login`
with the same wallet. Grant revocation permits original recovery without new spend.
Authoritative original unused closure can release exposure; elapsed time alone cannot.

Legacy unresolved API guest or external USDC checkpoints fail with
`usdc-payment-contract-removed` before HTTP or allowance changes. Preserve their
proof, state and budget; login does not rewrite them or authorize replacement.
Browser/API/MCP owner login retains the same network-specific entitlements.

Download/extract the purchased ZIP through the shared attachment tools and the
explicit output grants described below. Payment and creator payout statuses remain
separate; a forwarding delay never permits a second payment.

For repeated workflow purchases, [trusted checkout consent](#trusted-workflow-checkout-consent)
can reuse separately approved consent only with identical legal terms. Request
`detail: compact` for routine payment status; fetch the saved full documents with
`subnano_purchase_status` detail: full. The first agreement review cannot be hidden.

## Trusted workflow checkout consent

A spending allowance is separate from express immediate-delivery consent and the
acknowledgement of losing an applicable withdrawal right. A previous single-order
consent does not authorize future orders. Never infer consent from content or MCP.

The first order stops at awaiting-purchase-consent with the full saved agreement.
Review it with the buyer. Only after explicit approval for the entire named workflow,
the owner types this in their own terminal (same origin and private state); the CLI
prints the operation, grant, workflow, agreement hash and expiry and waits for them
to type `GRANT`. The agent never runs it through a shell tool:

```sh
node "${PLUGIN_ROOT}/server/cli.js" --state-dir /absolute/private/selected-account grant checkout-consent --operation-id UUID --grant-id UUID --workflow NAME --agreement-sha256 SHA256 --expires-at ISO_TIMESTAMP --accept-immediate-delivery
```

This explicitly covers immediate digital delivery and acknowledgement for Post
purchases within that existing owner/workflow/asset/network grant until expiry.
It does not expand the spending cap. The hash must identify the exact reviewed
saved agreement; expiry cannot exceed the spend grant. It records the legal terms
version, SHA-256 of the complete canonical legal object, and exact consent text.
Each original order saves the matching local decision before submitting consent,
then verifies server-recorded consent before signing. A changed legal object,
consent text, owner, origin, workflow, asset or network cannot reuse it. Review new
terms and obtain new express approval. No MCP tool creates this approval.

Revoke unused workflow consent with `revoke checkout-consent --grant-id UUID`.
Existing per-order agreements, confirmed consent and original recovery remain saved.
Never delete operations, move authority across origins or create a replacement
payment after timeout, restart, expiry or grant revocation.
