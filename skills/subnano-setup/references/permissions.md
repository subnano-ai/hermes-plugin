## Permission regimes and current authority

Read `subnano_context({detail:"summary"})` and its `permissionPolicy` before acting.
The installation regime is locked by setup and connection type: a native credential
created by `setup new-agent` selects agent; a browser connection is always human,
even on an Agent Profile. The Profile label does not select the regime. An autonomous
agent needs a native credential. Native human login stays human-local, with no
standing choices or rolling budget; it asks for public actions and exact payments,
except where an existing live legacy approval applies.

In agent mode, ordinary actions within the account run without dialogs: drafts, free or
paid publication, scheduling, published edits, withdrawal, deletion, tags, discussion,
Requests and public Profile/seller details. Only the operator controls payout addresses,
folders, budget and regime. Direct Nano transfers are unavailable to agent tools.
Money stays off until the operator configures a rolling budget and standing immediate-
delivery consent. Local policy is best effort; shell/credential access remains the
operator's responsibility, alongside wallet balances and existing server limits.

For human browser connections the owner chooses **Read, Drafts or Full** in the browser.
Read permits reads. Drafts permits unpublished, unscheduled Post work, its uploads,
private preferences and requester-private reversible proposal triage. Uploaded draft
images have an unlisted public URL. Public Requests, communication, publication and
new payments need Full. The server returns HTTP 403 `mcp-connection-level` above the
level, including when local checks are bypassed. No level permits account deletion.
Already accepted original operations can finish and be read back at every level;
recovery never creates a replacement. An old read tuple cannot upgrade in place. Browser delegation cannot declare a human
Profile agent or save, publish or schedule `autonomous_agent` content on that human
Profile to convert it.

Private reversible actions do not ask. Human public actions ask unless the owner
has selected allow for one of five groups: `publication`, `discussion`, `requests`,
`publishedContent`, `profile`. Paid publication/scheduling and draft deletion always
ask. Payout changes and direct Nano transfers always need an exact dialog. Purchases
and tips inside the current rolling budget need no dialog; outside it the human
approves the exact amount and recipient without raising the budget. Browser standing
choices, budgets and delivery consent are set only in Connected apps. Expanding them
requires recent browser login; reducing access does not. Native human installations
have no standing choices or budget; connect through the browser for those controls.

A rolling budget counts confirmed spending inside its window plus **all unresolved
reservations**, regardless of age. Context reports cap, used, remaining, next available
time or blocking originals, for each configured asset/network. XNO raw and USDC atomic
units are separate. Standing delivery consent stores `termsVersion`, `termsSha256` and
`consentText`; changed terms stop new purchases until the owner/operator consents again.
The compatibility argument `accept_immediate_delivery` is accepted but ignored.
An explicitly selected old `grant_id` retains its separate cumulative cap and expiry;
it never mixes with a rolling budget or resets through an upgrade.

Use the original action tool. Qualified hosts show its exact confirmation; known
unsupported Claude desktop clients receive link guidance before any dialog attempt.
A decline is final for that intent: never repeat it, infer consent from timing, or
use a link as another approval channel. Without dialogs, switchable public actions
link to the exact connection settings; always-ask actions link to the website action.
Structured refusals contain `code`, `effect`, `changedBy`, `retryable`, optional
`retryAfter`/blocking operations, `next`, and a `url` or `command`. Relay that next
sentence once. Retryability is information, not automatic retry permission.

Operator commands use the same origin and private state directory:

```sh
subnano-mcp permissions show
subnano-mcp permissions apply --input-file /absolute/private/permissions.json
subnano-mcp permissions allow-folder --read-root /absolute/workspace --output-root /absolute/downloads
subnano-mcp permissions forget-folder --read-root /absolute/workspace
subnano-mcp permissions budget --input-file /absolute/private/budget.json
subnano-mcp permissions consent --accept-immediate-delivery
subnano-mcp permissions consent --revoke
subnano-mcp permissions regime --regime agent
```

The private apply file accepts `readRoots`, `outputRoots`,
`budgets:[{cap:{asset,network,decimals,atomic},windowMs}]` and
`standingDeliveryConsent`. A budget file contains one `{cap,windowMs}` object.
Adding or raising a budget, shortening its window or turning on standing consent
requires typing `ALLOW SPENDING` in an interactive terminal; lowering and revoking need
none. Human folder expansion and any regime switch also require an interactive terminal. A browser connection cannot change regime. An unknown
human upload folder is confirmed once and remembered locally; without a working dialog,
the human uses `permissions allow-folder` in their terminal.

An installation without a saved regime stays native human until the operator runs
`permissions regime --regime agent`. That covers `setup new-agent` installations
upgrading from 0.3.58 or earlier and every `setup declare-agent` installation, which
left no local setup record. Installations that already saved agent mode on 0.3.59 keep it. Existing full browser connections become Full
with unset public choices, which fall back to live legacy grants until explicitly changed.
Old read connections stay Read. Legacy approvals remain readable/revocable, and unused
exact approvals and accepted operations retain original recovery. The old grant commands
and four permission-request tools explain the new model without writes for one release;
no MCP argument issues permission. `--temporary-draft` is accepted and ignored.
