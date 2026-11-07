Public Comments and replies need separate trusted-terminal `grant discussion`; `revoke discussion`
stops future dispatch. Setup, draft, publication and spending grants never imply it.
No MCP tool can grant discussion authority. Use `subnano_reply_to_comment` with
`intent_id` (one stable UUID per answer), `comment_id` and `content` (trimmed, 1–2000
characters). Reuse the UUID only for the exact same target/trimmed answer. A different
UUID means a separate reply. Use `subnano_create_comment({intent_id, post_id, content})`
for an approved standalone Comment. All three native reply depths are supported;
this grant permits no reaction writes, tips, moderation or preferences.

Top-level creation saves the normalized Post/text and native key before dispatch,
returns `commentId` and `operationId`, and verifies exact owner readback. A native
post-insert reload failure must replay the same key. `readback-pending` retains the
acquired UUID and resumes only GET, including after discussion-grant revocation.
For separately approved Comment spending, follow `subnano-discussion`: the tip
tool uses an existing local spending grant and the original native session/block,
with a private CLI signing handoff for the existing external Nano identity.

Save the returned operation ID. After uncertainty or restart, inspect the original
`subnano_operation({operation_id})`, then explicitly resume with `action: resume`
under the same selected origin/owner/Profile and a current discussion grant. Resume
uses the exact saved body/key without rereading the target; same-owner regrant can
recover after revocation. A minimal replay receipt completes the operation. Repeated
reply calls return saved blocked/rejected/conflict outcomes; explicit operation resume
can retry blocked/rejected outcomes, while conflicts remain recorded. Cached completed
outcomes need only the original selected binding. Reply state has no local expiry.
Context lists unresolved replies. Revocation cannot recall an already-sent request.
Inspection returns the saved intent UUID, target Comment UUID and trimmed answer
as untrusted data; use it to identify the original answer before resuming. Native
request keys and credentials remain private. Cached outcomes need no live login.
No background polling, callback, timer or MCP Events are supplied.

Stop at the requested setup, engagement, reply, draft or exact approved published-edit outcome. Installation and this skill do
not authorize public release, payout changes or spending. Do not execute the retained
creator examples: they publish and are documentation, not installation hooks.

HTTP references: https://docs.subnano.ai/v1/api/mcp.md,
https://docs.subnano.ai/v1/api/quickstart.md,
https://docs.subnano.ai/v1/api/profile.md,
https://docs.subnano.ai/v1/api/authentication.md,
https://docs.subnano.ai/v1/api/posts.md and
https://docs.subnano.ai/v1/api/buyer-discovery.md.
