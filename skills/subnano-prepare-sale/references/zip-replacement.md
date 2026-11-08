## Add or replace a ZIP on a paid Post

For an additional ZIP on a published paid Post, omit `replaces_attachment_id` and
use the current revision. Keep the Post published: existing content stays available
during upload and scanning, and existing buyers receive the cleared new file
without another purchase. The three-file, 10 MiB Post and 100 MiB Profile limits
still apply. This does not consume another publication slot.

When the user explicitly selects a replacement file, inspect the current attachment
ID with `subnano_preview`, then use `subnano_attach_zip` with `replaces_attachment_id`
and the current Post revision. This can update a published paid Post even after a
purchase. Existing buyers receive the current files without paying again. The old
ZIP remains available until the new one clears screening; failed or cancelled
updates preserve it. A replacement uses the original logical slot, while both
physical files count against the Profile allowance until cleanup.

Every published addition and every replacement needs exact human form approval
or a one-use
`grant zip-update --input-file /private/zip-update.json --expires-at RFC3339_INSTANT`
that the human types in their own terminal; the CLI prints the Post, path, revision
and expiry and waits for them to type `GRANT`. The agent never runs it through a shell tool.
The absolute private JSON file contains the exact tool input, including the
selected path and current revision, plus the original attachment ID only when
replacing. Expiry is at most one hour away. Do not answer the human's form or infer approval from draft permission.
Read-root and draft grants still apply. Preserve and recover the original operation
after uncertainty; changed files or targets need new approval.

Ordinary Post text, pricing or settings changes use `subnano_update_published_post`
and its separate approval. ZIP consent cannot authorize Post edits or publication.

Inspect `attachment.safetyState` separately from the transfer receipt. For
`queued`/`checking`, wait `attachment.retryAfterSeconds` before inspecting the same
saved operation. `attachment.safetyReason` is a safe code or `null`; `rejected`
is terminal screening rejection and does not always mean malware, while `failed`
is a screening error. Never diagnose a missing reason or re-upload automatically.
`reuploadAllowed` and `retryAllowed` cannot override a durable byte receipt or
existing approval requirements. Original receipt inspect/resume does not send
bytes again; cleared files still need current eligibility and byte verification.
