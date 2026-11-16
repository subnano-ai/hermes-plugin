## Verify activation separately

Report each evidence field independently as `verified`, `pending`, `blocked` or
`unknown`, with a safe reason and next action:

| Field                | Required evidence                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `login`              | Fresh server verification of the expected Profile, origin, account kind, credential class and scope.         |
| `localAdoption`      | The private saved binding and journal agree, with no unresolved issuance.                                    |
| `clientRegistration` | Readback of the selected entry at its actual source/scope.                                                   |
| `nativeTools`        | The named tools are loaded in the target host/chat.                                                          |
| `mcpProof`           | Actual `subnano_context` from that named native connection matches the expected Profile/origin and succeeds. |

An installed package, accepted browser URL, preflight snapshot or `isError:false`
alone cannot prove completion. CLI adapter proof is labeled `transport: "cli-adapter"`;
it proves that process and does not fill native evidence. A fully connected named
native account requires all five native proofs. If tools await a supported reload,
say “login verified; native activation pending” and preserve the selected binding.
