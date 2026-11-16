---
name: subnano-setup
description: Connect the intended Subnano account in Hermes, check the installed plugin, or recover login. Public reading needs no account setup.
---

Public search and free reading need no setup. Read `subnano_context` before an account action and confirm the intended profile and origin. Reuse its private state. Setup grants no authority to publish, spend or widen access.

- For a new account or an existing account connection, read [account choice](references/account-choice.md), then [connection](references/connect.md) or [native setup and recovery](references/native-setup.md). Use the selected installed runtime at `${PLUGIN_ROOT}/server/cli.js`. Verify [activation](references/activation.md) on the intended named connection before acting.
- For an authority or permission question, read [permission regimes](references/permissions.md). Agent and human modes have different approval channels. Return a refusal once. A decline ends the intent.
- For human browser access to the verified native agent account, use `subnano_browser_signin` with the URL created by the user. It always needs fresh exact human approval. If the host cannot show the form, the human runs `auth browser-signin --request-url` in their own trusted terminal. Never run this command or answer the prompt on their behalf. The original browser must press Continue. Read [browser sign-in](references/browser-signin.md) for the exact steps.
