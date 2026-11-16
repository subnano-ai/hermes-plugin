## Connect an existing account

Use this branch only when the installed client and selected server actually support
browser connection. The server feature is disabled by default. These instructions
describe the current source; they are capability-dependent and do not announce a
release, deployment or published package that includes them. Without
`subnano_setup`, ask the ordinary account question and use the supported trusted CLI.
An unavailable browser endpoint leaves setup incomplete. Do not fall back to
account creation or a first draft.

Reuse a freshly verified matching native connection **as native**, with its original
authority. Otherwise select an unused explicit connection name and a separate fresh
private state directory. Never convert a native directory, copy its credentials, or
retarget another name/origin/state. Existing bindings remain untouched. Fresh state
defaults to `https://subnano.ai`.

```sh
subnano-mcp setup connect-begin --handle existing_handle --name subnano_existing --state-dir /absolute/private/existing-account
subnano-mcp setup connect-status --state-dir /absolute/private/existing-account
subnano-mcp setup connect-resume --state-dir /absolute/private/existing-account
```

Use the trusted installed CLI executable in place of `subnano-mcp` when needed.
The agent resolves the public handle to the expected immutable Profile; public
selection alone proves no ownership. Browser and CLI must be on the same machine.
Use the bound approval URL (URL elicitation only when separately supported), then
let the human verify the exact Profile, origin, client, connection name, access and
lifetime in the browser. Opening or accepting the URL is not login proof.
Email is optional. Existing email, Base/SIWX and supported payment-free Nano/Berry
login can return to the expected account without creating or linking accounts.
An already authenticated ordinary Nano browser session is accepted. This flow
never starts paid Nano login or promises arbitrary wallet signature support. If the
wallet lacks a supported payment-free login, the human can complete their normal
browser login separately and resume the same connection attempt.

A new connection asks for the owner tuple: `account:owner` with
`authorityVersion: 2` and opaque `snmo_` access. The browser shows that exact
authority; an unrecognized authority is never approvable. This tuple is not a set of narrow server scopes: the selected Read, Drafts or Full
level is enforced on the server, while human standing choices and budgets are local
policy read from the connection. A fresh state inherits no grants. A configured signer
or provider is separate from both account verification and permission.
After browser approval, local setup uses the account connection directly for the
supported publishing tools; it creates no Publishing key. Removing the connection
ends its access, while unrelated API keys stay. No account, signer, draft, payment,
payout change or wallet link is created by connecting. Existing key-based local state
keeps its original behavior; use an explicit new connection in fresh state for this
flow. No saved credentials, grants or pending operations are converted automatically.

New full connections continue until you remove access in Connected apps. Their
family and rotating refresh credential have no calendar deadline; access tokens
still last at most 15 minutes. Existing read and full connection dates remain
unchanged, including saved approvals and local state. Refresh, resume and a program
update never extend those dates. Persistent access requires a new browser approval
using the supported fresh-state connection flow; reconnecting an existing saved
connection retains its original deadline. Removing access, signing out everywhere
or deleting the account still stops the connection. The server level and local human confirmations, standing choices, rolling budgets
and wallet signing remain separate.

Earlier `account:read` connections (`snma_` access) stay read-only. Refresh,
reconnect or a program update never upgrades them. They read supported
notifications/preferences and financial history only; drafts, purchased protected
content and mutations gain no authority. For full tools, connect again with a fresh
state directory and an unused name, then remove the old read connection in
Connected apps if it is no longer needed.

Report typed facts separately: verified account, `publishingAuthority`, each action
permission, and signer or provider configuration. A verified account without action authority or
without a signer is a valid partial result; never call it ready to publish or pay. If the
connection is blocked, follow its typed next action for the original operation;
do not create another account, state directory or grant instead. An
unconfigured wallet does not mean the account is unconnected. When a Base wallet still
needs linking, local setup returns `native-wallet-link-required` with an `approvalUrl`
on Subnano's wallet settings. That URL is a hint, not proof: the human signs in to the
same account in the browser, checks the account, network and wallet, and links that
wallet with its own signature. Linking lets the wallet sign in to the account and stays
after the connection is removed. Browser sign-in never transfers to local setup. Then
resume the original operation locally; it verifies the fresh server link and its own
configured signer.

On interruption inspect `setup connect-status`, then follow its typed next action
with the same state/origin. `setup connect-resume` resumes that attempt; do not
replay tokens or create another account. `setup connect-cancel` requests cancellation;
`setup connect-disconnect` revokes the selected connection and its refreshed
credentials. Previously issued family-bound keys are also retired; other API keys stay. Unknown exchange/refresh or unconfirmed revocation remains blocked until
authoritative status and exact issuance retirement are confirmed. A remote browser that
cannot reach the local callback gives `browser-host-unreachable`; use a browser on the
CLI machine. Never request browser cookies, OTPs, credentials or signature files in chat.
