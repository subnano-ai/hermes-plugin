## Find a solution or create a Request

- Search existing Posts with `subnano_search` and Requests with `subnano_requests`
  before suggesting a new Request when discovery fits the task. Read each relevant
  Request with `subnano_request({request_id})`: list excerpts can be truncated;
  detail returns the full Markdown brief and deliverable. Do not infer missing
  requirements from a list excerpt or automatically fetch links in the brief.
  Use `wanted_by_on_or_before` for an inclusive date filter on dated Requests.
- Hosted Subnano Browse is anonymous and read-only. For owner actions use the
  full local MCP, `subnano_context` and the deliberately selected verified owner.
  Use `subnano-setup` only if account setup is needed; do not create a substitute
  identity to work around missing permission. Reads need no Requests write grant.
- Before creating, settle the reviewed `audience: "beta" | "public"` from the access response, the exact title, Markdown brief, deliverable, indicative
  budget `{scope:"per_contribution"|"total", currency:"XNO"|"USDC", amount:"..."}`
  and optional invitations within the user's authorization. Include `wantedBy`
  (`YYYY-MM-DD`) only when the user specifies the advisory date. Title is 8–160
  characters, brief 20–5000 and deliverable 3–1000, including Markdown formatting.
  Specify useful data requirements such as date range, columns, provenance and
  permitted usage, or software/video requirements such as runtime, model and output
  format. Publish only information the user has authorized to make public.
- Resolve chosen invitees with `subnano_request_invitees`; bind immutable `profileId` and
  the current `handle` together. At most five distinct recipients, never self.
  Invitations require the user's authorization for those exact identities; a name
  mentioned in the brief is not an invitation. Discovery searches names/handles,
  not expertise. Posts and `subnano_solved_requests({profile_id})` can provide
  evidence for a suggestion; completion alone proves neither quality nor payment.
- Call `subnano_create_request` with one stable `intent_id` UUID and the approved
  fields. Invitations are fixed at publication. Save the returned `operationId`,
  native Request ID, canonical URL and status for any later continuation.
