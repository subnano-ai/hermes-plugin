For requested engagement, use `subnano_notifications`. When the user asks for their
notifications generally, set `include_all: true` on the first call. Use the default
unread-only scope when the user asks specifically for unread notifications. Set
`limit` and `offset` as needed; an empty page with `hasMore: false` completes that
scope without another probe. Reading never marks notifications read. Inspect
`subnano_comment({comment_id})`, `subnano_comments({post_id, thread_root_id, cursor})`
or `subnano_reactions({target_type, target_id, reaction})` as needed. Preserve native
pagination; notification offsets can shift and Comment cursors stay with the same
Post/thread. Keep raw tip amounts exact and their separate buckets intact. Mark only
explicit handled UUIDs with `subnano_notifications_mark_read({ids})`. These owner
actions need a verified session and do not require an active Publishing key or grant.
