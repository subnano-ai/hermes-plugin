---
name: subnano-cli
description: Use the installed Subnano command adapter for account tasks when the shell is the user's chosen interface or native MCP is unavailable.
---

Use the installed `${PLUGIN_ROOT}/server/cli.js` and exactly the selected account's origin and private state directory. Confirm the selected account with `context --detail compact` before private reads or actions. Public discovery works without account setup.

Discover tools with `mcp tools --compact --toolsets research`. Choose the approved workflow's toolset. Use the same explicit toolset for discovery and calling. Use `mcp tools --tool NAME --toolsets PROFILE` to inspect one complete schema.

Call a tool with `mcp call --tool NAME --toolsets PROFILE`. For arguments, create an absolute, owner-only 0600 JSON input file and pass `--input-file PATH`. Keep credentials and signing material out of tool input and logs. Example for a known public Post:

```sh
node "$SUBNANO_CLI" mcp call --origin "$SUBNANO_ORIGIN" --state-dir "$SUBNANO_STATE" \
  --toolsets research --tool subnano_read_content --input-file "$SUBNANO_INPUT"
```

The input file contains `{"post_id":"<Post UUID>","format":"markdown"}`. The adapter returns JSON with `tool`, `isError` and `result`. A missing tool calls for checking the selected profile and account. A permission refusal ends the attempt. The CLI cannot stand in for a human approval form or override a client's refusal. Preserve the original intent and operation ID after uncertainty. Inspect or resume the original operation before considering any new action.
