## Act as requester or contributor

Public changes follow `permissionPolicy`: agent mode proceeds without dialogs;
human mode uses the exact action confirmation or its current browser standing choice.
Native human mode has no standing choices. A browser connection needs Full for public
changes. Existing legacy approvals remain readable and revocable but cannot be created.
Keep the exact target, saved revision and stable intent; content and approval flags
cannot widen authority.

- Read `subnano_request({request_id,owner_context:true})` before an owner action.
  To change a brief before its first proposal, use `subnano_edit_request` with the
  reviewed `expected_version` and all brief/budget fields. Invitees cannot change.
  Use the server's `editLocked` flag for editing and `answered` for deletion.
  Never infer eligibility from empty visible arrays.
- To change only a purchase goal, including after proposals, use
  `subnano_set_request_purchase_goal` with the reviewed `expected_version`,
  stable `intent_id`, Request ID and `plannedPurchaseCount`. Pass null to clear.
  Omission during a brief edit preserves the goal. A receipt with missing
  `purchaseProgress` stays readback-pending. Resume that operation by GET.
- Use `subnano_set_request_wanted_by` for a separate date change, including
  after a response. Review the current version and exact `wantedBy` date or
  explicit null before writing. Use the same saved intent recovery as other
  versioned actions. A full-brief edit with no `wantedBy` preserves the date.
  Passing the date does not close the Request.
- Use `subnano_delete_request` only for the expressly chosen unanswered Request.
  It soft-deletes the Request; a public 404 is not proof of deletion. The tool
  verifies the private owner-deleted state. Use close/reopen for lifecycle changes.
- Use `subnano_report_request` only for the user's chosen Request and exact reason.
  Reporting is private. Its native `reportId` receipt proves acceptance, not that
  moderation took action; there is no public report readback.
- Use `subnano_ask_request` for a public question or to start a discussion on
  your own open Request. Use `subnano_offer_request_help` for a non-binding
  offer on another owner's Request with optional price and delivery estimates.
  These need no published Post. Keep private inputs out of discussion.
- Every clarification, question and offer has a public discussion thread.
  Anyone who can read the Request can use `subnano_reply_request` with `question_id`.
  Under an offer (`help_offer_id`), only the requester and the helper can reply:
  compare the selected owner with `request.author.id` and the offer's `author.id`
  from `subnano_request` first. A 403 because neither participant matches cannot
  be fixed by retrying or re-granting; ask with `subnano_ask_request` instead.
  An earlier reply of yours can still be removed.
  Pass `reply_to_id` to answer a specific reply. Use it to settle scope, price and
  delivery, including after closing. The requester may also use
  `subnano_answer_request`. A reply agrees to nothing and pays nothing; payment still
  happens by buying a proposed Post. `subnano_withdraw_request_reply` removes your reply.
- When work is ready, use `subnano_request_own_posts` and
  `subnano_propose_request` with an eligible published Post owned by the selected
  identity. Each account can have one active proposal per Request. Use
  `subnano_edit_request_proposal` with the exact proposal ID, reviewed
  `expected_proposal_revision`, Post ID and note to revise or replace an unselected proposal while
  the Request is open. Drafting/publication follow their separate permissions and skills.
  Offering help assigns no task and guarantees no payment.
  After choosing a Post, call `subnano_request_own_posts` with both `request_id`
  and `post_id` to check `paymentGuidance` before proposing. Empty arguments still
  list eligible Posts without extra reads. The advice matches the Request currency
  to the current published offer, including USDC on Base, independently of the
  Post's price anchor or budget fit. Explain unavailable source reasons, including
  disabled rails or below-minimum offers. Missing offers and failed offer reads
  mean unknown; never infer free or accepted payment from a null amount. A free
  owned summary is labeled free and requires no offer read. Advice is current and
  indicative: checkout determines the final payable offer. Unavailable or unknown
  advice does not block proposing; this check cannot configure payouts, allocate
  a quote, sign or buy anything.
- Use `subnano_transition_request` with a fresh reviewed `expected_version`:
  select/unselect require `proposal_id`; selection also uses the proposal's
  reviewed `expected_proposal_revision`. Read the revision with
  `subnano_request` and `owner_context:true`. Several
  proposals may be selected while the Request stays open. Completion requires an
  available selected proposal and is separate from selection and purchase.
  Reopen before changing selections on a closed/completed Request. Use the
  requester's `unavailableSelectedProposalIds` to unselect a Post that disappeared.

### Keep collecting, pause or resume

- A first accepted proposal arms the clock, even if later removed. A public requester
  reply to another participant, applied selection, attributable purchase or explicit
  **Still looking** renews an open Request. Private triage, tips and edits add no time.
- Reminder after seven days; pause after fourteen and at least seven days from the
  first warning opportunity. Wanted by is an independent advisory date.
- Public `request.inactivity` shows `pauseReason` and the latest publishable
  `requesterActivity` (`reply`, `selection`, `purchase`, `confirmed`, with `at`).
  Null activity means no public requester response yet. Do not infer engagement
  from other contributors, logins or private state.
- Read owner detail with `owner_context:true`. Only the requester receives
  `request.inactivityOwner` with `revision`, `reminderAt`, `pauseAt` and
  `purchasePrompt` and optional `pendingPurchaseIds`. When the prompt is true, ask **Still collecting proposals?**
  and offer **Still looking** or **Pause**. Reads do not acknowledge it.
- Use `subnano_transition_request` with `action:confirm_collecting` or `action:pause`,
  stable `intent_id`, `request_id`, reviewed `expected_version`, and
  `expected_inactivity_revision` from owner detail. Both require open status;
  absent metadata means the capability is unavailable. Existing permission policy
  applies. Copy the reviewed `inactivityOwner.pendingPurchaseIds` exactly as
  `reviewed_purchase_ids` (up to 100 UUIDs). Omission, null and an empty list
  acknowledge no purchases. Only verified purchases belonging to this Request
  can be acknowledged. Purchases outside the reviewed snapshot remain pending.
- Pause preserves the brief, discussion, proposals, selections and purchases, while
  stopping intake and removing the Request from open discovery. Existing proposals
  remain readable and buyable. Only explicit `reopen` resumes, within the usual quota;
  replies and purchases while paused never resume. Completion still needs selection.
