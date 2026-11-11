## Requested published Post edit

Check that the installed full local server exposes `subnano_update_published_post`.
Hosted Subnano Browse retains exactly nine anonymous read-only tools. Read the owned
Post with `subnano_read_draft`, including its exact `updatedAt` revision and
`contentEditability`. Private draft access does not authorize a published
edit; `subnano_update_draft` remains unpublished-only.

Prepare `{intent_id, post_id, revision, ...intendedFields}` in an absolute owner-only
`0600` JSON file with a stable intent UUID. Preserve omitted fields. Omit any Markdown
section whose `editable` is false, and always omit published `slug`, even unchanged.
Call `subnano_update_published_post` with `{intent_id, post_id, revision, ...intendedFields}`.
Agent mode allows the edit without a dialog. Human mode confirms the exact change,
unless its current published-content choice allows it; editing a scheduled paid Post
always asks. A live unused legacy one-use approval remains bound to origin, owner,
Profile and publishing credential and may be revoked with
`revoke published-edit --intent-id UUID`. `permissions.publishedEdit` and
`publishedEditApprovals` are legacy compatibility facts; `permissionPolicy` governs
new actions. `subnano_update_draft` remains unpublished-only. Preserve the exact
request, selected binding and operation; tool arguments cannot authorize it.

Native PATCH rules still govern pricing, accepted rails, provenance, review
invalidation, publication readiness and payout settings. A required
`creationAttested: true` must be part of the exact approved request: it accepts author
responsibility and never attests human review. The tool cannot add human review and
never unpublishes or republishes the Post.

Keep `operationId`. The exact same intent/request recovers its original operation;
changed input under the same intent UUID is rejected. `subnano_operation` inspect or
resume can read current state and preserves a definitive moderation rejection.
After `account-contribution-busy`, or after restoration for `account-publishing-paused`,
explicitly call `subnano_update_published_post` again with the exact original input
and current authority. Read private details with `subnano_account_messages`. An
expired or revoked approval for this definitive rejection does not authorize a new dispatch; evaluate the original exact input under current policy.
The renewal retains the saved operation. An
ambiguous save resumes through readback only. During readback there is never
another PATCH or an automatic rebase. Current policy is checked again before a new dispatch. Distinguish
`savedRevision`, received from the actual PATCH response, from later
`currentRevision`. After a lost response, matching current fields do not prove the
original saved revision: `savedRevision` stays null. Reconcile conflicts before a new
intent and exact approval. This documents repository support, not a new release or
deployment. See https://docs.subnano.ai/v1/api/mcp.md#edit-a-published-post.
