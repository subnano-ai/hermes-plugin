## Requested published Post edit

Check that the installed full local server exposes `subnano_update_published_post`.
Hosted Subnano Browse retains exactly nine anonymous read-only tools. Read the owned
Post with `subnano_read_draft`, including its exact `updatedAt` revision and
`contentEditability`. Draft grants and `--temporary-draft` never permit a published
edit; `subnano_update_draft` remains unpublished-only.

Prepare `{intent_id, post_id, revision, ...intendedFields}` in an absolute owner-only
`0600` JSON file with a stable intent UUID. Preserve omitted fields. Omit any Markdown
section whose `editable` is false, and always omit published `slug`, even unchanged.
Present the exact edit for approval before the human authorizes that same file in
their own terminal with `node "${PLUGIN_ROOT}/server/cli.js" --state-dir /absolute/private/selected-account grant published-edit --input-file
/absolute/private/edit.json --expires-at ISO_TIMESTAMP`; the CLI prints the Post,
revision, changed fields and expiry and waits for them to type `GRANT`. The agent
never runs `grant` through a shell tool. Then call
`subnano_update_published_post` with the exact approved file's object. The request's
Post, revision, intent and fields are bound to origin, owner, Profile and publishing
credential (account connection or legacy Publishing key) for one use; no MCP tool or `approved: true` can grant it. Never issue this trusted
grant as a substitute for human approval. `permissions.publishedEdit` and the sanitized
`publishedEditApprovals` list report authority. Withdraw an unused approval with
`revoke published-edit --intent-id UUID` through the same trusted CLI.

Native PATCH rules still govern pricing, accepted rails, provenance, review
invalidation, publication readiness and payout settings. A required
`creationAttested: true` must be part of the exact approved request: it accepts author
responsibility and never attests human review. The tool cannot add human review and
never unpublishes or republishes the Post.

Keep `operationId`. The exact same intent/request recovers its original operation;
changed input under the same intent UUID is rejected. `subnano_operation` inspect or
resume performs GET readback only, never another PATCH or an automatic rebase.
Revocation or expiry blocks fresh dispatch without deleting recovery. Distinguish
`savedRevision`, received from the actual PATCH response, from later
`currentRevision`. After a lost response, matching current fields do not prove the
original saved revision: `savedRevision` stays null. Reconcile conflicts before a new
intent and exact approval. This documents repository support, not a new release or
deployment. See https://docs.subnano.ai/v1/api/mcp.md#edit-a-published-post.
