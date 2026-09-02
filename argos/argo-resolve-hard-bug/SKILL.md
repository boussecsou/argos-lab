---
name: argo-resolve-hard-bug
description: Diagnose a difficult software defect, establish its root cause, implement a regression-protected fix at a sound seam, and review the resulting patch. Use for hard bugs or regressions that need an end-to-end verified resolution, not for a small isolated test, design discussion, or review-only request.
metadata:
  kind: argo
  version: "1"
  execution: hard
---

# Destination

Resolve a difficult software defect with a validated root cause, a regression-protected fix, and a review of the resulting patch against repository standards and the originating specification when available.

# Argo role

This Argo assembles four independently reusable capabilities that contribute to one verified bug-resolution outcome: disciplined diagnosis, seam-aware design, test-driven implementation, and review against repository standards plus the originating specification when one exists.

The Argo coordinates these capabilities. Their execution methods remain in their embedded Skills.

# Contract authority

This `SKILL.md` is the normative semantic source for the Argo. `argo.json` is a machine-readable projection of this contract and MUST NOT introduce semantics that are absent from or contradictory to this file.

If the two files diverge, the runtime follows `SKILL.md`, reports manifest drift, and does not silently combine the conflicting definitions.

# Member Skills

| Capability role | Embedded Skill | Participation | Material contribution |
| --- | --- | --- | --- |
| Establish and validate causality | `skills/diagnosing-bugs/SKILL.md` | Required | Produce a tight red-capable feedback loop, a minimized reproduction, and evidence for the root cause. |
| Place or improve the test seam | `skills/codebase-design/SKILL.md` | Optional | Clarify the module interface and seam when the regression cannot be tested cleanly through an existing public interface. |
| Protect and implement the fix | `skills/tdd/SKILL.md` | Required | Turn the minimized reproduction into a failing behavior test at an agreed seam, then make the smallest implementation pass. |
| Review the resulting patch | `skills/code-review/SKILL.md` | Required | Review the diff against repository standards and, when an originating specification exists, review it separately against that specification. |

# Skill Sources

All four members use the `embedded` binding. Resolve them only from this package's `skills/` directory. Each member retains its own `SKILL.md`, support files, identity, and progressive-disclosure structure.

# Participation and execution

Execution is **Hard**: every capability marked **Required** MUST materially participate before the Argo can claim successful completion. Hard does not mean that every member is mandatory. The Destination is not fully satisfied unless diagnosis, TDD, and code review each materially participate; `codebase-design` remains optional and participates only when seam placement or interface shape is genuinely uncertain.

Hard participation does not impose a general workflow topology. The runtime may adapt execution and ordering to the repository state, while respecting the lightweight artifact dependencies below.

# Lightweight artifact contracts

- `diagnosing-bugs` supplies a red-capable command, minimized reproduction, and causal finding.
- `codebase-design`, when selected, supplies the agreed public interface or seam used by the regression test.
- `tdd` supplies the failing-then-passing regression test and the minimal fix.
- `code-review` consumes a fixed-point diff plus the available standards and specification sources. It always supplies Standards findings and also supplies separate Spec findings when an originating specification exists.

# Shared constraints

- Redact secrets from commands, outputs, logs, and captured artifacts.
- Preserve the user's existing work and repository conventions.
- Test observable behavior through a public interface, not implementation details.
- Do not claim causality without a reproducible signal and falsifiable evidence.
- Do not claim full completion when a required member cannot participate.
- Keep execution and recovery mechanics in the runtime; this Argo does not define retries, branching, queues, or rollback.

# Progressive disclosure

1. Use this root file for discovery and capability selection.
2. Load a member `SKILL.md` only when its capability is selected or required.
3. Load that Skill's referenced files, scripts, or agent metadata only when its instructions call for them.
4. Do not load all embedded member resources merely because the Argo was discovered.

# Failure semantics

- If `diagnosing-bugs`, `tdd`, or `code-review` is unavailable or cannot make its required contribution, report partial progress and the missing contribution; do not claim the Destination is complete.
- If no correct regression-test seam exists, use `codebase-design`. If a viable seam still cannot be established, document that architectural finding and report the Argo as incomplete.
- If no originating specification exists, `code-review` must still complete the Standards review and explicitly disclose that the Spec axis was unavailable; the absence of a specification alone does not make the Argo incomplete.

# Definition of Done

The Argo may claim success only when:

- the original symptom is reproduced by a tight, red-capable feedback loop;
- the root cause is supported by falsifiable evidence;
- the original symptom no longer reproduces after the fix;
- a regression test failed before the fix and passes after it at an agreed public seam;
- temporary diagnostic instrumentation is removed;
- the final diff receives a Standards review and, when an originating specification exists, a separate Spec review;
- any absence of an originating specification and the resulting reduced assurance are disclosed;
- remaining risks and unresolved review findings are reported honestly.
