## Schedule future publication

Scheduling needs separate explicit consent for `latest_saved`: publication includes **future saved edits** to this Post. Draft permission, immediate-publication approval, `approved:true` and a Human-reviewed declaration do not authorize scheduling. Scheduling never creates Human-reviewed evidence; later edits retain the existing review invalidation rules.

Save first and retain the exact `updatedAt` revision, including microseconds. Submit strict RFC3339 `scheduledFor` with an explicit offset and an agreeing IANA `displayZone`, for example `2027-01-20T09:00:00+01:00` with `Europe/Copenhagen`. Resolve a DST overlap to one offset/occurrence; reject gaps and past instants. Reads return the fixed UTC instant plus display zone. A saved edit preserves time and generation; execution validates the latest saved revision and current Profile, category, pricing, payout, provenance and ZIP eligibility. The Post remains private and `status: "draft"` until success; `publishedAt` records actual publication and ordinary announcement deduplication applies.

Retain the original command UUID (`commandId` on HTTP, `command_id` on MCP), exact request and returned operation ID before dispatch. The immutable receipt describes original acceptance, separately from current generation and eventual execution. After uncertainty, use **GET-only** original receipt and current-state recovery: a null receipt remains unconfirmed, and matching current state is not acceptance. Never automatically retry a mutation, adopt a later matching schedule or replace another web change. Fresh same-owner credentials can read original receipts after rotation or Post deletion. Key rotation does not cancel accepted work; cancellation requires the current `scheduleId` and `generation`, without an old revision or another publication grant. An actionable failed outcome stays unpublished; correcting the Post does not re-arm it. Explicitly choose a new future time to reschedule, or cancel.

### Local MCP scheduling consent and recovery

The human creates or revokes a separate one-use scheduling grant by typing these commands in their own terminal (outside model-controlled MCP). The grant prints the action, Post, revision, instant and zone and waits for them to type `GRANT`; the agent never runs it through a shell tool.

```sh
subnano-mcp grant schedule --input-file /private/schedule.json
subnano-mcp revoke schedule --command-id UUID
```

The input must be an absolute owned regular 0600 JSON file. Create input is `{action:"create",command_id,post_id,revision,scheduled_for,display_zone,policy:"latest_saved"}`. Replace uses `action:"replace"` plus `schedule_id,generation` and fresh exact consent. The grant binds origin, owner, Post, action, original command UUID, acceptance revision, expected schedule generation and exact instant/zone. Its consent includes `includesFutureSavedEdits:true` and `scheduleApproved:true`. Revocation affects only unused local consent and returns `remoteCancellation:false`; it cannot cancel accepted or uncertain remote work.

| Tool                           | Strict input                                               |
| ------------------------------ | ---------------------------------------------------------- |
| `subnano_schedule_post`        | `{command_id,post_id,revision,scheduled_for,display_zone}` |
| `subnano_reschedule_post`      | same plus `{schedule_id,generation}`                       |
| `subnano_cancel_post_schedule` | `{command_id,post_id,schedule_id,generation}`              |
| `subnano_post_schedule`        | `{post_id}`                                                |
| `subnano_list_post_schedules`  | `{page?,per_page?}` (default 1/20, max 100)                |

Mutations return structured `{operationId,commandId,postId,action,status,accepted,receipt,current?,currentStatus?,reason?,next?}`. `status` is `accepted|unconfirmed|rejected|dispatched`; `currentStatus` is `available|unavailable|post-unavailable`. Keep both IDs. The receipt is original acceptance, `current` is later execution/current generation, and unavailable current state is distinct from known null. `subnano_operation {operation_id,action:"inspect"|"resume"}` performs GET-only original receipt/current reads; there is no mutation replay, automatic replacement or adoption. Repeating the identical original mutation follows this same recovery path. A null receipt stays unconfirmed even after elapsed time; do not regenerate the UUID or ask an agent to infer acceptance. Anonymous hosted Browse keeps its existing read-only tools and no private schedule context.

Private context reports `permissions.schedule`, unused `schedulingApprovals`, and `{policy:"latest_saved",includesFutureSavedEdits:true,acceptanceIsExecution:false}`. There is no model-callable scheduling-grant tool. Recovery retains the original operation kinds `schedule-create`, `schedule-replace` or `schedule-cancel`.
