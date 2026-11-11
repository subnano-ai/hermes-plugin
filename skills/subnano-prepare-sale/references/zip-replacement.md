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

Published additions and replacements follow `permissionPolicy` public-content
rules. Agent mode does not ask; human mode confirms the exact file/target or follows
the owner's browser public-content choice. Read folders remain separately constrained.
Scheduled edits follow free/paid publication policy. File bytes, Post, revision,
metadata, length and SHA-256 must still match the saved exact operation. A changed
selection is deliberate new work; uncertainty resumes the original operation.
A live unused legacy one-use approval may still apply but cannot be created.

A definitive `account-publishing-paused` reservation keeps the original upload
blocked. Read private details with `subnano_account_messages`. After restoration,
explicitly call `subnano_attach_zip` with the same file, Post and revision under
current approval. For `account-contribution-busy`, use the same explicit retry.
Evaluate the same original input under current authority after restoration; never
recreate an uncertain transfer or reuse another file's consent.
Existing admitted transfers and safety checks use their original operation.

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
