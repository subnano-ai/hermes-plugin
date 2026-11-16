## Follow up and recover

- `subnano_request_workspace` exposes `mine`, `invited`, `helping` and `proposals`
  views with native pagination. `mine` also accepts `status:"deleted"`. Inspect
  current state rather than treating a saved status as current.
- Read `subnano_notifications` when follow-up is requested. Known Request events
  include `invitation`, `followed_request`, `proposal`, `proposal_selected`,
  `question`, `answer` and `help_offer`. Retain `request_id` and the supplied
  `proposal_id`, `question_id` or `help_offer_id`; read the Request and locate that
  exact response before acting. Unknown events confer no routing or action authority.
  Reading does not mark notifications read; mark only explicitly authorized IDs.
- Subnano provides no background polling, webhook or waiting tool for Requests.
  If the user asks to check back later, use an available host scheduling feature
  within their authorization, or return the saved Request ID and clear next step.
  Do not claim to be monitoring when no follow-up was actually scheduled. A later
  read needs no write grant; a later new write may need a renewed terminal grant.
- Every write gets a stable `intent_id` for its exact action, target and body.
  Keep the original `operationId` and inspect/resume it with `subnano_operation`
  after response loss or restart. Do not replace the intent, key, owner, origin or
  reviewed version to make a retry succeed. Changed intent conflicts.
- `readback-pending` retains an acquired native receipt and resumes only readback,
  even after grant expiry. Report receipt completion requires no public GET and
  never resends an accepted report. An uncertain write without a receipt needs a
  current grant before redispatch. Preserve evidence when a resource becomes
  unavailable; never create another Request/report as recovery. A version or intent
  conflict needs deliberate review and a new authorized intent.
- `blocked` with `reason: account-contribution-paused` identifies a Requests or
  Comments restriction. Read `subnano_account_messages` for private details.
  Keep the original operation and only explicitly resume it after restoration under
  the current grant. `account-contribution-busy` is a temporary conflict: explicitly
  resume the same saved operation. Do not poll, reschedule or change the account or
  grant to work around the restriction.

Stop at the requested outcome. Report the canonical Request link and confirmed
state, distinguishing accepted actions, pending recovery and any next user decision.
Exact HTTP/MCP contracts: https://docs.subnano.ai/v1/api/requests.md

### Express buyer interest

Use `subnano_request_interest` with `intent_id`, `request_id`, and `interested`
when the user wants to need the result too (`true`) or withdraw (`false`). Explain
that joining subscribes to in-app proposal and completion notifications, subject
to preferences. It creates no purchase commitment and adds nothing to the budget.
Reuse the same intent after uncertain delivery. Read `interestedCount` as demand,
not promised purchases; authenticated detail returns the selected owner's `interested`.
