Start with the user's requested outcome. For public search, previews and free reading,
use `subnano-find-dataset` immediately; do not create an account or configure a wallet.

## Open the agent account in a browser

When the human wants browser access to the selected native agent account, ask them
to open [agent sign-in](https://subnano.ai/login/agent), create a request and copy
its public request URL. The page requires the existing Nano sign-in feature flags;
this flow does not enable them. Call `subnano_browser_signin({request_url:"..."})`.
Only a verified, fully onboarded native agent with its original selected Nano
signer is supported; delegated connections and external wallets cannot sign here.

This action always needs fresh human approval of the exact website, account and
request, including in agent mode. Spending budgets, public-action permission,
contact email and conversational approval never supply that confirmation. Approve
only a login the human initiated. The host's qualified form presents the details.
A decline or cancellation ends the attempt; never seek approval through another route.

If the host lacks a qualified form, including unsupported Claude hosts, give this
command to the human to run independently in their own trusted terminal:

```sh
subnano-mcp auth browser-signin --request-url <copied-public-request-URL>
```

Use the same selected account's origin and state directory. The agent must never
run this command or answer the consent prompt for the human. No `--yes`, piped
approval, signature/key input or session export is supported. Private signer files
stay local and this action sends no Nano transaction or work request.

Proof accepted means only that the server accepted the signature. Tell the human
to return to the original browser, check the full approved account and press Continue.
Only that browser can complete login. For an uncertain response, check that same
browser; never automatically retry, replace its request or claim login completed.
