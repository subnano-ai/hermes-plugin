#!/usr/bin/env node
import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);

// src/hosts/cli.ts
import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";

// src/hosts/connection-config.ts
import { isAbsolute } from "node:path";

// src/tool-groups.ts
var toolGroups = {
  starter: [
    "subnano_context",
    "subnano_help",
    "subnano_setup",
    "subnano_categories",
    "subnano_search",
    "subnano_preview",
    "subnano_read_content"
  ],
  research: ["subnano_profiles", "subnano_tag_collection", "subnano_open_browser"],
  publishing: [
    "subnano_create_draft",
    "subnano_list_drafts",
    "subnano_read_draft",
    "subnano_update_draft",
    "subnano_delete_draft",
    "subnano_sale_snapshot",
    "subnano_publish",
    "subnano_unpublish_post",
    "subnano_update_published_post",
    "subnano_list_tags",
    "subnano_set_post_tags",
    "subnano_request_draft_deletion_approval",
    "subnano_request_publication_approval"
  ],
  media: [
    "subnano_attach_file",
    "subnano_attach_zip",
    "subnano_attachment_status",
    "subnano_download_attachment",
    "subnano_extract_attachment",
    "subnano_image_associate",
    "subnano_image_cancel",
    "subnano_image_status",
    "subnano_upload_image",
    "subnano_upload_profile_image",
    "subnano_profile_image_status",
    "subnano_profile_image_cancel",
    "subnano_request_file_grant"
  ],
  scheduling: [
    "subnano_schedule_post",
    "subnano_reschedule_post",
    "subnano_cancel_post_schedule",
    "subnano_list_post_schedules",
    "subnano_post_schedule"
  ],
  "requests-reader": [
    "subnano_requests",
    "subnano_request",
    "subnano_requests_access",
    "subnano_request_workspace",
    "subnano_request_metrics",
    "subnano_request_own_posts",
    "subnano_solved_requests"
  ],
  "requests-author": [
    "subnano_create_request",
    "subnano_edit_request",
    "subnano_delete_request",
    "subnano_transition_request",
    "subnano_request_invitees",
    "subnano_invite_request_participant",
    "subnano_answer_request",
    "subnano_pause_request_participant",
    "subnano_set_aside_request_proposal",
    "subnano_restore_request_proposal",
    "subnano_set_request_wanted_by",
    "subnano_set_request_purchase_goal"
  ],
  "requests-contributor": [
    "subnano_propose_request",
    "subnano_edit_request_proposal",
    "subnano_withdraw_request_proposal",
    "subnano_request_interest",
    "subnano_ask_request",
    "subnano_offer_request_help",
    "subnano_reply_request",
    "subnano_withdraw_request_help",
    "subnano_withdraw_request_reply",
    "subnano_withdraw_request_question",
    "subnano_request_share_draft",
    "subnano_report_request"
  ],
  discussion: [
    "subnano_comment",
    "subnano_comments",
    "subnano_reactions",
    "subnano_create_comment",
    "subnano_reply_to_comment"
  ],
  account: [
    "subnano_account_message_acknowledge",
    "subnano_account_messages",
    "subnano_feedback",
    "subnano_financial_history",
    "subnano_financial_record",
    "subnano_notification_preferences_get",
    "subnano_notification_preferences_update",
    "subnano_notifications",
    "subnano_notifications_mark_read",
    "subnano_seller_information_get",
    "subnano_seller_information_update",
    "subnano_browser_signin"
  ],
  payments: [
    "subnano_buy_post",
    "subnano_purchase_status",
    "subnano_tip_comment",
    "subnano_request_spending_grant"
  ],
  wallet: [
    "subnano_wallet_status",
    "subnano_wallet_work",
    "subnano_send_nano",
    "subnano_nano_transfer_status",
    "subnano_payout_address_get",
    "subnano_payout_address_update"
  ],
  recovery: ["subnano_operation"]
};
var dependencies = {
  research: ["subnano_categories", "subnano_search", "subnano_preview", "subnano_read_content"],
  publishing: ["subnano_categories", "subnano_read_content"],
  media: ["subnano_read_draft", "subnano_request_file_grant"],
  scheduling: ["subnano_read_draft", "subnano_sale_snapshot"],
  "requests-author": toolGroups["requests-reader"],
  "requests-contributor": toolGroups["requests-reader"],
  discussion: ["subnano_profiles", "subnano_preview"],
  payments: ["subnano_search", "subnano_preview", "subnano_read_content", "subnano_wallet_status"]
};
function selectToolsets(value) {
  if (value === void 0 || value === "full") return null;
  const modules = [...new Set(value.split(","))].sort();
  const tools = /* @__PURE__ */ new Set(["subnano_context", "subnano_help", ...toolGroups.recovery]);
  for (const name of modules) {
    if (name === "recovery" || !Object.hasOwn(toolGroups, name)) throw new Error("invalid-toolsets");
    const group = name;
    for (const tool of toolGroups[group]) tools.add(tool);
    for (const tool of dependencies[group] ?? []) tools.add(tool);
  }
  return { modules, tools };
}

// src/auth/connection-name.ts
function validConnectionName(name) {
  return /^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(name) && !["constructor", "prototype", "__proto__"].includes(name.toLowerCase());
}

// src/hosts/codex-launch.ts
async function launchCodexPlugin(options, inspectOnly = false) {
  const { spawn } = await import("node:child_process");
  const { readFile: readFile2, realpath } = await import("node:fs/promises");
  const { dirname, isAbsolute: isAbsolute2, join, relative, sep } = await import("node:path");
  const { createInterface } = await import("node:readline");
  const { default: events } = await import("node:events");
  const once = events.once;
  const fail = () => new Error("subnano-plugin-binding-unavailable");
  if (!/^subnano@[^\s@/\\]+$/.test(options.pluginId) || ![options.codexCommand, options.codexHome, options.cwd, options.stateDir].every(isAbsolute2) || new URL(options.origin).origin !== options.origin)
    throw fail();
  const host = spawn(options.codexCommand, ["app-server", "--stdio"], {
    cwd: options.cwd,
    env: { ...process.env, CODEX_HOME: options.codexHome },
    stdio: ["pipe", "pipe", "ignore"]
  });
  const lines = createInterface({ input: host.stdout });
  const pending = /* @__PURE__ */ new Map();
  let sequence = 0;
  let failed = false;
  let received = 0;
  const abort = () => {
    failed = true;
    for (const request2 of pending.values()) request2.reject(fail());
    pending.clear();
  };
  const timer = setTimeout(() => {
    abort();
    host.kill("SIGKILL");
  }, 15e3);
  host.on("error", abort);
  host.on("exit", abort);
  host.stdin.on("error", abort);
  host.stdout.on("data", (chunk) => {
    received += chunk.length;
    if (received > 16 * 1024 * 1024) {
      abort();
      host.kill("SIGKILL");
    }
  });
  lines.on("line", (line) => {
    try {
      const message = JSON.parse(line);
      const request2 = pending.get(message.id);
      if (!request2) return;
      pending.delete(message.id);
      if (message.error) request2.reject(fail());
      else request2.resolve(message.result);
    } catch {
      abort();
      host.kill("SIGKILL");
    }
  });
  const request = (method, params) => {
    if (failed) return Promise.reject(fail());
    const id = ++sequence;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      host.stdin.write(JSON.stringify({ id, method, params }) + "\n");
    });
  };
  const stopHost = async () => {
    clearTimeout(timer);
    lines.close();
    host.removeListener("exit", abort);
    if (host.exitCode !== null || host.signalCode !== null) return;
    const closed = once(host, "close").catch(() => {
    });
    host.kill("SIGTERM");
    const kill = setTimeout(() => host.kill("SIGKILL"), 1e3);
    await closed;
    clearTimeout(kill);
  };
  const onInterrupt = () => {
    abort();
    host.kill("SIGKILL");
  };
  process.once("SIGINT", onInterrupt);
  process.once("SIGTERM", onInterrupt);
  let runtime;
  try {
    await request("initialize", {
      clientInfo: { name: "subnano-plugin-launch", version: "1" },
      capabilities: { experimentalApi: true }
    });
    host.stdin.write(JSON.stringify({ method: "initialized" }) + "\n");
    const inventory = await request("plugin/installed", { cwds: [options.cwd] });
    const plugins = inventory.marketplaces.flatMap((market) => market.plugins);
    const selected = plugins.filter((plugin) => plugin.id === options.pluginId);
    if (selected.length !== 1 || !selected[0].installed || !selected[0].enabled) throw fail();
    const listing = await request("skills/list", { cwds: [options.cwd], forceReload: true });
    if (listing.data.length !== 1) throw fail();
    const anchors = listing.data[0].skills.filter(
      (skill) => skill.pluginId === options.pluginId && skill.name === "subnano:subnano-setup" && skill.enabled
    );
    if (anchors.length !== 1 || !isAbsolute2(anchors[0].path)) throw fail();
    const root = dirname(dirname(dirname(anchors[0].path)));
    if (anchors[0].path !== join(root, "skills", "subnano-setup", "SKILL.md")) throw fail();
    const resolvedRoot = await realpath(root);
    const inside = (path) => {
      const child = relative(resolvedRoot, path);
      return child !== ".." && !child.startsWith(".." + sep) && !isAbsolute2(child);
    };
    const cliPath = await realpath(join(root, "server", "cli.js"));
    const manifestPath = await realpath(join(root, "plugin.json"));
    if (!inside(cliPath) || !inside(manifestPath) || !inside(await realpath(anchors[0].path)) || inside(await realpath(options.stateDir)))
      throw fail();
    const manifest = JSON.parse(await readFile2(manifestPath, "utf8"));
    if (manifest.name !== "subnano" || typeof manifest.version !== "string" || manifest.version !== selected[0].localVersion)
      throw fail();
    runtime = { cliPath, version: manifest.version, pluginId: options.pluginId };
  } finally {
    await stopHost();
    process.removeListener("SIGINT", onInterrupt);
    process.removeListener("SIGTERM", onInterrupt);
  }
  if (failed) throw fail();
  if (inspectOnly) return runtime;
  const server = spawn(
    process.execPath,
    [
      runtime.cliPath,
      "serve",
      "--state-dir",
      options.stateDir,
      "--origin",
      options.origin,
      ...options.toolsets ? ["--toolsets", options.toolsets] : []
    ],
    { stdio: "inherit" }
  );
  const interrupt = () => server.kill("SIGINT");
  const terminate = () => server.kill("SIGTERM");
  process.once("SIGINT", interrupt);
  process.once("SIGTERM", terminate);
  try {
    const [code] = await once(server, "exit");
    process.exitCode = typeof code === "number" ? code : 1;
  } finally {
    process.removeListener("SIGINT", interrupt);
    process.removeListener("SIGTERM", terminate);
  }
  return runtime;
}
function codexLaunchArgs(options) {
  return [
    "--input-type=module",
    "--eval",
    `(${launchCodexPlugin.toString()})(JSON.parse(process.argv[1])).catch(() => { process.stderr.write('Subnano: selected Codex plugin unavailable; inspect plugin enablement and installation. No fallback runtime was started.\\n'); process.exitCode = 1; })`,
    "--",
    JSON.stringify(options)
  ];
}

// src/hosts/hermes-launch.ts
async function launchHermesPlugin(options, inspectOnly = false) {
  const { spawn } = await import("node:child_process");
  const { readFile: readFile2, realpath } = await import("node:fs/promises");
  const { isAbsolute: isAbsolute2, join, relative, sep } = await import("node:path");
  const { default: events } = await import("node:events");
  const fail = () => new Error("subnano-plugin-binding-unavailable");
  if (![options.pluginDir, options.stateDir].every(isAbsolute2) || new URL(options.origin).origin !== options.origin)
    throw fail();
  const root = await realpath(options.pluginDir);
  const inside = (path) => {
    const child = relative(root, path);
    return child !== ".." && !child.startsWith(".." + sep) && !isAbsolute2(child);
  };
  const cliPath = await realpath(join(root, "server/cli.js"));
  const manifestPath = await realpath(join(root, "plugin.json"));
  if (!inside(cliPath) || !inside(manifestPath) || inside(await realpath(options.stateDir)))
    throw fail();
  const manifest = JSON.parse(await readFile2(manifestPath, "utf8"));
  if (manifest.name !== "subnano" || typeof manifest.version !== "string") throw fail();
  const runtime = { cliPath, version: manifest.version };
  if (inspectOnly) return runtime;
  const server = spawn(
    process.execPath,
    [
      cliPath,
      "serve",
      "--state-dir",
      options.stateDir,
      "--origin",
      options.origin,
      ...options.toolsets ? ["--toolsets", options.toolsets] : []
    ],
    { stdio: "inherit", env: { ...process.env, SUBNANO_DISTRIBUTION: "hermes-catalog" } }
  );
  const interrupt = () => server.kill("SIGINT");
  const terminate = () => server.kill("SIGTERM");
  process.once("SIGINT", interrupt);
  process.once("SIGTERM", terminate);
  try {
    const [code] = await events.once(server, "exit");
    process.exitCode = typeof code === "number" ? code : 1;
  } finally {
    process.removeListener("SIGINT", interrupt);
    process.removeListener("SIGTERM", terminate);
  }
  return runtime;
}
function hermesLaunchArgs(options) {
  return [
    "--input-type=module",
    "--eval",
    `(${launchHermesPlugin.toString()})(JSON.parse(process.argv[1])).catch(() => { process.stderr.write('Subnano: selected Hermes plugin unavailable; inspect its installation. No fallback runtime was started.\\n'); process.exitCode = 1; })`,
    // The JSON starts with '{'. Node treats it as argv without a separator.
    // Hermes 0.23.1 parses a bare '--' as its own argument during mcp add.
    JSON.stringify(options)
  ];
}

// src/hosts/connection-config.ts
async function connectionConfig(plan, binding) {
  if (plan.version !== 2 || !validConnectionName(plan.connectionName) || plan.program?.name !== "subnano" || plan.program.entrypoint !== "server/cli.js" || !isAbsolute(plan.targetStateDir) || !plan.expected?.profileId || !plan.expected.credentialClass || !["agent", "human"].includes(plan.expected.authorKind) || new URL(plan.expected.origin).origin !== plan.expected.origin)
    throw new Error("invalid-connection-plan");
  const toolsets = selectToolsets(plan.toolsets)?.modules.join(",");
  const common = {
    ...toolsets ? { toolsets } : {},
    connectionName: plan.connectionName,
    expected: plan.expected,
    hostConfigurationChanged: false,
    instructions: "Inspect all effective entries and native name aliases before registration. Preserve existing tool approvals, environment and account state. Read back config, reload MCP and verify each named native subnano_context account and the currently installed runtime version. This command proves resolution only, not native activation."
  };
  if (binding.host === "codex") {
    const options2 = {
      pluginId: binding.pluginId,
      codexCommand: binding.codexCommand,
      codexHome: binding.codexHome,
      cwd: binding.cwd,
      stateDir: plan.targetStateDir,
      origin: plan.expected.origin,
      ...toolsets ? { toolsets } : {}
    };
    const runtime2 = await launchCodexPlugin(options2, true);
    return {
      ...common,
      runtimeBinding: { kind: "installed-plugin", host: "codex", pluginId: binding.pluginId },
      observedRuntime: runtime2,
      desiredServer: {
        command: process.execPath,
        args: codexLaunchArgs(options2),
        // Resolution has a bounded 15s timeout before MCP initialization starts.
        startup_timeout_sec: 30
      }
    };
  }
  if (binding.host !== "hermes" || !isAbsolute(binding.pluginDir))
    throw new Error("unsupported-host-binding");
  const options = {
    pluginDir: binding.pluginDir,
    stateDir: plan.targetStateDir,
    origin: plan.expected.origin,
    ...toolsets ? { toolsets } : {}
  };
  const runtime = await launchHermesPlugin(options, true);
  const desiredServer = {
    command: process.execPath,
    args: hermesLaunchArgs(options),
    env: { SUBNANO_DISTRIBUTION: "hermes-catalog" },
    timeout: 660
  };
  return {
    ...common,
    runtimeBinding: { kind: "host-managed-directory", host: "hermes", path: binding.pluginDir },
    observedRuntime: runtime,
    desiredServer,
    hermes: {
      register: {
        command: "hermes",
        args: [
          "mcp",
          "add",
          plan.connectionName,
          "--command",
          process.execPath,
          "--env",
          "SUBNANO_DISTRIBUTION=hermes-catalog",
          "--args",
          ...desiredServer.args
        ],
        interactive: true,
        instructions: "Inspect inventory first. Decline overwrite prompts; reuse only an exact binding."
      },
      configureTimeout: {
        command: "hermes",
        args: ["config", "set", `mcp_servers.${plan.connectionName}.timeout`, "660"],
        instructions: "Apply only after exact command/args/env readback. Named entries do not inherit plugin timeout."
      },
      reload: "/reload-mcp",
      updateCommand: "hermes plugins update subnano"
    }
  };
}

// src/hosts/cli.ts
try {
  const { values } = parseArgs({
    options: Object.fromEntries(
      [
        "input-file",
        "toolsets",
        "host",
        "plugin-id",
        "host-command",
        "host-home",
        "host-cwd",
        "plugin-dir"
      ].map((key) => [key, { type: "string" }])
    ),
    strict: true
  });
  const required = (key) => {
    const value = values[key];
    if (typeof value !== "string" || !value) throw new Error("missing-host-binding");
    return value;
  };
  const host = required("host");
  if (!["codex", "hermes"].includes(host)) throw new Error("unsupported-host-binding");
  const plan = JSON.parse(await readFile(required("input-file"), "utf8"));
  const result = await connectionConfig(
    { ...plan, toolsets: values.toolsets ?? plan.toolsets },
    host === "codex" ? {
      host,
      pluginId: required("plugin-id"),
      codexCommand: required("host-command"),
      codexHome: required("host-home"),
      cwd: required("host-cwd")
    } : { host: "hermes", pluginDir: required("plugin-dir") }
  );
  process.stdout.write(JSON.stringify(result) + "\n");
} catch {
  process.stderr.write(
    "Subnano: connection configuration unavailable. Verify the activation plan, explicit host selection and installed plugin. No configuration or account was changed.\n"
  );
  process.exitCode = 1;
}
