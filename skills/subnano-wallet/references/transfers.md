Direct Nano transfers are unavailable in agent mode. In human mode, for an explicitly
requested direct Nano transfer use `subnano_send_nano` with a
stable `intent_id`, exact `destination`, `amount_raw` and optional explicit legacy `grant_id`.
Complete host confirmation of the exact amount and recipient. Without human host forms, new direct transfers are unavailable; CLI `wallet send` is disabled. Save its operation ID and recover only
that original with `subnano_nano_transfer_status`; never substitute a new intent.
Nano signing and work support are bundled. Do not install Nano libraries, inspect
private signer files or implement ad hoc signing/work scripts. Work defaults to the
public BerryPay server. Provider failures stop with `nano-remote-work-unavailable`;
retry or configure a user-approved work endpoint with `wallet configure --work-rpc-url`.
Local CPU work exists only after the user explicitly chooses `wallet configure --local-work`;
never enable it to work around a provider failure.
