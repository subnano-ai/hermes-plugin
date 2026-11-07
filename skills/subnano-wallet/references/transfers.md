For an explicitly requested direct Nano transfer, use `subnano_send_nano` with a
stable `intent_id`, exact `destination`, `amount_raw` and existing `grant_id`.
Complete host confirmation of the exact amount and recipient. Hosts without forms
use the explicitly authorized trusted CLI `wallet send --intent-id UUID --destination
ADDRESS --amount-raw RAW --grant-id UUID`. Save its operation ID and recover only
that original with `subnano_nano_transfer_status`; never substitute a new intent.
Nano signing and work support are bundled. Do not install Nano libraries, inspect
private signer files or implement ad hoc signing/work scripts. Work defaults to the
public BerryPay server. Provider failures stop with `nano-remote-work-unavailable`;
retry or configure a user-approved work endpoint with `wallet configure --work-rpc-url`.
Local CPU work exists only after the user explicitly chooses `wallet configure --local-work`;
never enable it to work around a provider failure.
