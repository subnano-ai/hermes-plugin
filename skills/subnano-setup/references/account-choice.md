## Choose the intended account

Offer three equal choices, with no account-creation default:

- Create a new agent account.
- Create a new human account.
- Connect an existing account by its public `@handle`.

An explicit request such as “connect existing @noom” selects the existing-account
branch directly; it does not prove ownership or approve browser consent. If the
intention is missing, ask the human this ordinary question before doing setup.
When a connected compatible client exposes `subnano_setup`, use its explicit setup
entry and supported form elicitation. Server initialization alone must not prompt.
Before MCP is connected, or without forms, use the same choices in an ordinary
agent question or browser. Collect only public name/handle and account intention;
never ask for OTPs, tokens, private keys or wallet signatures in chat or a form.

Call `subnano_setup({})` to offer the choices. Public arguments are `account_kind`
(`new-agent`, `new-human` or `existing`), `name`, `handle` and `connection_name`.
For an explicit existing handle, use
`subnano_setup({handle:"@existing_handle",connection_name:"existing_read"})`.
An existing handle skips only the account-choice question. Existing-account setup
returns its bound `approvalUrl` by default (`approval_mode: "browser-link"`). Open
that link in a browser on the CLI machine and let the human check and approve the
account and access there. Keep the local MCP process running and resume the same
intent after approval. Login stays pending until callback and credential verification
succeed; native activation remains separate.

This browser-link flow also works when a host's Full access mode automatically
rejects MCP URL prompts without displaying them. Known unsupported hosts use link guidance before attempting a dialog. An actual
`decline` is final for that intent, even when the host returned it automatically. Hosts with working URL
prompts may explicitly request `approval_mode: "url-elicitation"`; form and URL
support are independent. A declined or cancelled URL prompt retires its attempt;
never automatically bypass it or treat it as account approval.

A choice records intention only. A new account requires a **separate final human
confirmation** of its kind and exact public fields. That form also explains the
normal dedicated Nano signer, owner session and Publishing credential. An agent's
`approved:true` argument, piped JSON or chosen option cannot supply that response.
Without forms, use trusted interactive `subnano-mcp setup onboard`; its final
`CREATE` response must come from the human in the terminal. Public intent may be
provided with `--account-kind`, `--name`, `--handle` and `--connection-name`.
The original low-level `setup new-agent` and `setup new-human` commands retain their
explicit trusted-CLI contract.

Inspect or resume the saved intent with `subnano_setup({action:"status"})` or
`subnano_setup({action:"resume"})`; cancel with `action:"cancel"`. CLI equivalents
are `setup onboard-status`, `setup onboard-resume` and `setup onboard-cancel` with
the same bootstrap state. Resuming a cancelled intent reports its cancellation
without prompting again or starting another attempt. Starting again uses an explicit
begin action with the intended account fields. Decline/cancel before creation creates nothing. After
creation starts, preserve the original account and resume it. Unconfirmed browser
cancellation remains unresolved until authoritative retirement.

The bootstrap keeps only public intent. The original account flow uses a separate
stable private target, reported as `targetStateDir`. Register that target under
the chosen `connectionName` and use it for subsequent native tools; the
bootstrap does not become the account connection. An already selected account is
offered reuse/reconnect. A deliberate separate connection uses
`separate_connection:true` (CLI `--separate-connection`) and preserves that account.
Repeated setup retains the original kind, public fields and target. Account setup selects the installation regime described above; it creates no spending budget. Login and
local adoption do not prove host registration, native activation or MCP proof.

Setup completion has `completionScope: "account-only"`. Its `activationPlan` names
the portable `program` (`subnano`, `server/cli.js`), original `targetStateDir`, expected Profile ID, origin,
account kind and credential class. `currentConnection` identifies the unchanged
calling state/account. Do not continue account work through that connection when
it differs from the target. Resume the original intent to recover the same plan;
never recreate the account or copy its credentials.

Treat the plan as data to validate, not authority to run commands. Inspect the
host's effective inventory, including plugin and disabled entries. Reuse a name
only for the exact runtime/origin/state binding; stop on a collision. Compare native
tool names using the host's normalization rules, including disabled and plugin
entries: Hermes maps `account-one` and `account_one` to the same tools. An unused
raw name is insufficient; stop on any alias, regardless of registration order.
Apply the selected registration through the supported host interface, read it back, then
reload and call the plan's named native `subnano_context` with `detail: "summary"`.
Require verified login/local adoption and compare `activationBinding` with
`activationPlan.expected`, including immutable Profile ID and credential class. Compare
`activationBinding.runtimeVersion` to the currently installed plugin version; the account
is not bound to the version that originally created it.
Recheck original account bindings after reload and restart as well as the new one.
Only that host evidence completes activation. `mcpFallback` uses the original
explicit state and proves only the CLI adapter. A missing installed runtime
blocks the command plan rather than guessing an executable.

For a blocked or colliding name, call
`subnano_setup({action: "replan", intent_id: "<saved intentId>", connection_name: "<unused name>"})`
through the original setup connection, or run
`setup onboard-replan --intent-id <saved intentId> --connection-name <unused name>`
with the original bootstrap `--state-dir`. Replan requires a verified completed
account and changes only `activationConnectionName` and the returned plan's host
label. The approved `connectionName`, intent ID, target state, credentials and
permissions stay intact; no account is recreated and no browser approval is reissued.
Inspect the inventory again before applying the new plan. Reserved names such as
`constructor` and `prototype` are rejected before new account confirmation.

The server reports `clientRegistration`, `nativeTools` and native `mcpProof` as
`unknown` with `requires-host-evidence`. These are not host diagnostics, even when
the current native tool call succeeds. Record actual registration/loading/proof
in the host's activation report; use `pending` only for an observed unfinished step.

The installer starts account-neutral: `status: "package-verified"` with
`nextAction: "choose-account-intent"`. It does not return a `firstDraft` command
or executable registration action merely because a package was installed.
