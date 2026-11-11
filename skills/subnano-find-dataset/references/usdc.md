## Base USDC purchases

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

New purchases and tips use the current rolling budget and separately recorded
standing delivery consent, or a human exact payment dialog. Agent money is off until
the operator sets both controls; it never opens a dialog. Native human mode has no
budget and asks for each exact payment. A live legacy spending grant is used only
with its explicit `grant_id`, retaining its original cumulative cap/expiry and separate
checkout consent. Inspect `permissionPolicy` and preserve the original operation.

```sh
node "${PLUGIN_ROOT}/server/cli.js" --state-dir /absolute/private/selected-account setup base --network eip155:8453 --input-file /absolute/private/agent-key.json
node "${PLUGIN_ROOT}/server/cli.js" --state-dir /absolute/private/selected-account setup base-login
```

The dedicated key file is absolute, owner-only `0600` and contains `{privateKey}`;
never import a human wallet key. Selection creates no server identity. SIWX login
obtains the owner session before buying; the owner
and dedicated signer are required before any operation or allowance reservation.
Existing owners stay selected and their paying wallet must already be linked.

Call `subnano_buy_post` with `post_id`, optional explicit legacy `grant_id` and the inspected exact
`payment: {asset: USDC, network: eip155:8453, atomic: "100000", decimals: 6}`.
Do not supply legacy `amount_raw` at the same time. The client uses the owner Bearer,
saves the original agreement and verifies current delivery consent before signing.
Standing consent is bound to `termsVersion`, `termsSha256` and `consentText`; a change
requires fresh owner/operator consent. Human exact over-budget confirmation covers
that purchase's delivery terms without raising the budget. `accept_immediate_delivery`
is accepted but ignored; a model argument is not consent. Keep the original agreement
and confirmation returned by purchase status. The client uses the
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

The current model records standing immediate-delivery consent separately from the
rolling budget. Agent operators use `permissions consent --accept-immediate-delivery`;
human browser owners use Connected apps. These controls bind current terms version,
SHA-256 and exact consent text; changed terms stop new purchases. Native human mode
has no standing consent and asks for each exact purchase. No MCP argument can create it.

An existing legacy workflow checkout consent remains bound to its original
owner/workflow/asset/network grant and exact legal version/hash/text until expiry.
It cannot be created or expanded. Revoke unused legacy consent with
`revoke checkout-consent --grant-id UUID`. Each original order retains its agreement,
server-confirmed consent and saved signed proof. Recover that original after timeout,
restart, expiry or revocation; never replace it or sign an uncertain attempt again.
