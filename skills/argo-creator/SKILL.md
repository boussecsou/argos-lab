---
name: argo-creator
description: Use this skill when the user wants to design, create, audit, improve, package, or migrate an Argo: a reusable capability structure organized around one Destination. It derives the minimal capability set, reuses existing Skills, decides embedded/reference/dynamic bindings, selects Flexible or Hard participation semantics, preserves progressive disclosure, and validates the result without turning the Argo into a monolithic Skill or workflow engine.
---

# argo-creator

## Purpose
Design and create high-quality **Argos** efficiently.

An **Argo** is a reusable capability structure organized around one concrete **Destination**. It defines which capabilities belong together for that Destination and how those capabilities resolve to independently reusable Skills. The runtime owns execution mechanics unless the Argo explicitly constrains them.

Do not behave like a generic prompt generator. Do not start by asking which Skills the user wants unless that choice is genuinely subjective. Start from the Destination, infer the required capability architecture, inspect available Skills, then choose the smallest coherent solution.

## Operating principle
**Destination → capabilities → discovery → bindings → participation → packaging → validation.**

Prefer the smallest coherent capability set that can reliably satisfy the Destination. Reuse before creating. Keep Skill methods inside Skills. Keep the Argo focused on capability relationships, shared outcome, constraints, resolution, and success semantics.

## Inputs
Accept any of these:
- a Destination only;
- a task or outcome from which the Destination can be inferred;
- an explicit list of Skills;
- a partial list plus permission to complete it;
- an existing Argo to improve or audit;
- an existing Skill library, registry, filesystem, repository, or runtime capability set;
- a request for an embedded, referenced, dynamic, or hybrid Argo;
- a portable package or registry-native Argo.

Use conversation context and available sources before asking questions. Ask only when a missing choice materially changes the Argo and cannot be inferred or discovered.

## 1. Read the current Argo contract
Before creating or materially redesigning an Argo, use the current Argo specification/concept available in the environment as the source of truth.

Do not freeze experimental details into this Skill when they can be read from the canonical Argo definition. In particular, verify current conventions for packaging, metadata, manifests, nested Argos, dependency contracts, and portability before making schema-sensitive claims.

Stable concepts to preserve unless the canonical specification changes them:
- singular: **Argo**;
- plural: **Argos**;
- stable name prefix: `argo-`;
- one concrete Destination;
- independently reusable Skills;
- Destination Cohesion rather than domain similarity;
- progressive disclosure;
- runtime/workflow remains distinct from the Argo.

## 2. Decide whether an Argo should exist
Create or recommend an Argo when a broader reusable Destination naturally benefits from multiple distinct capabilities.

Do **not** create an Argo when:
- one existing Skill can satisfy the request cleanly;
- the proposed members only share a broad domain;
- the request is a one-off plan with little reuse value;
- the proposed members are fake `step-1`, `step-2`, `step-3` Skills that are not independently reusable;
- the user actually needs a strict workflow/state machine rather than a capability structure.

When uncertain, choose the **smallest reusable abstraction**.

## 3. Define the Destination first
Write the Destination before selecting Skills.

Preferred form:
> **Verb + concrete outcome + meaningful success qualifier.**

Examples:
- Produce a publishable evidence-backed article.
- Ship a tested production-ready feature.
- Diagnose and validate the root cause of a software failure.
- Validate a release against every mandatory security and quality gate.

Reject domain labels such as `Writing`, `Development`, `Marketing`, or `Research` as Destinations.

Destination test:
> **This Argo exists to __.**

If the sentence does not end in one coherent result, narrow or split the proposed Argo.

## 4. Derive the capability architecture
From the Destination, identify the capabilities that may or must contribute.

For every candidate capability, apply:
- **Contribution** — does it directly help reach the Destination?
- **Co-usage** — can it reasonably participate in the same task/context?
- **Independence** — is its Skill useful outside this Argo?
- **Non-overlap** — does it own a distinct responsibility?
- **Selection value** — does adding it materially improve the solution space?
- **Destination-change** — would a different Destination likely change this member set?

Remove decorative, redundant, domain-only, or speculative capabilities.

Do not optimize for the largest set. Optimize for the **smallest coherent capability set**.

## 5. Discover Skills before creating them
For each capability role:
1. inspect already available/installed Skills;
2. search relevant registries, repositories, local project resources, native agent capabilities, or user-provided sources when accessible;
3. compare candidates by capability fit, routing boundary, quality, compatibility, provenance, and reuse value;
4. fetch full Skill instructions only for strong candidates when needed;
5. reuse the best existing Skill when it adequately implements the capability.

Create a new Skill only when:
- the capability is genuinely missing;
- it is independently reusable beyond this Argo;
- the user wants a complete implementation or creation is within the current task;
- creating it does not duplicate an adequate existing Skill.

If the current environment cannot access the relevant Skill source, do not invent a Skill identity. Use a dynamic capability requirement or explicitly mark the unresolved reference.

## 6. Choose the binding for each capability
Binding is a property of the **capability-to-Skill relationship**, not necessarily the whole Argo.

### Embedded
Use when the exact Skill implementation should ship inside the Argo.

Best for:
- self-contained portability;
- pinned proprietary methods;
- offline/reproducible packages;
- environments without reliable external resolution.

Check provenance and licensing before embedding third-party Skills.

### Reference
Use when the Argo should depend on a known Skill identity without copying it.

Best for:
- stable shared Skills;
- central updates;
- avoiding duplication;
- environments with a reliable resolver/registry.

Record enough identity/version/compatibility information to avoid ambiguous resolution when the current specification supports it.

### Dynamic
Use when the Argo requires a **capability**, not one exact Skill implementation.

Best for:
- interchangeable implementations;
- portability across different Skill ecosystems;
- allowing the runtime to choose the best available compatible Skill.

Declare capability requirements and constraints clearly enough that the runtime can resolve them honestly.

### Hybrid
An Argo is Hybrid when different members use different bindings. Treat Hybrid primarily as a derived label rather than a separate incompatible format.

Typical pattern:
- proprietary methodology → embedded;
- stable shared dependency → reference;
- generic interchangeable capability → dynamic.

## 7. Choose participation semantics
Treat participation as two related but distinct layers:

```text
Argo-level policy       → Flexible | Hard
Member-level constraint → required | optional
```

Use **Flexible** by default.

### Flexible
The **Destination is authoritative**. The runtime may decide which declared capabilities need to participate for the current task.

The runtime may:
- use only relevant members;
- skip capabilities already satisfied by user input/context;
- adapt order;
- execute one-shot, stepwise, or adaptively;
- stop when the Destination is honestly satisfied.

Do not interpret `required` as a hidden fixed workflow. In a Flexible Argo, prefer minimal adaptive participation unless the canonical Argo contract explicitly defines stronger semantics for required members.

### Hard
Use only when declared required capabilities must materially participate for completion to be valid.

Canonical rule:

> `required: true` identifies which members are mandatory. `execution: hard` makes those requirements normative for successful completion.

Therefore a Hard Argo may contain optional members; every required member must materially contribute; optional members remain runtime-selectable; and Hard never implies sequential execution.

Typical cases:
- compliance;
- security/release gates;
- mandatory audits;
- validated protocols.

For each member, decide both whether it belongs to the Argo and whether it must materially participate for success. Do not mark every member required by default.

## 8. Preserve progressive disclosure
Design the Argo so discovery does not load every Skill and resource.

Preferred layers:
1. **Argo discovery** — name, description, Destination, lightweight routing metadata.
2. **Argo body/manifest** — capability roles, bindings, required/optional semantics, shared constraints, Definition of Done.
3. **Selected Skills** — load only relevant Skill bodies.
4. **Skill resources** — references, scripts, assets, examples, evals only when needed.

For Embedded Argos, preserve each member Skill's own progressive disclosure. Never flatten all member instructions into the Argo root.

## 9. Handle dependencies without becoming a workflow engine
When one capability needs another capability's result, prefer lightweight artifact/input/output contracts when necessary.

Example concept:
- research produces `research-notes`;
- validation consumes `research-notes` and produces `validated-evidence`;
- drafting consumes `validated-evidence`.

Do not add arbitrary branches, loops, retries, state-machine syntax, scheduling, queues, rollback, or orchestration machinery unless the user explicitly needs a workflow artifact rather than an Argo.

Rule:
> **Argo defines semantic capability architecture and success constraints. Runtime/workflow defines execution topology and recovery mechanics.**

## 10. Failure and fallback
For each required capability, decide what happens if its Skill cannot be resolved.

Possible policies when supported by the target format:
- fail honestly;
- dynamically find a compatible substitute;
- use an embedded fallback;
- continue only when the capability is optional and Destination remains achievable.

Never claim full success for a Hard Argo when a required capability did not materially participate.

For referenced third-party Skills, preserve provenance and avoid silently replacing exact-method dependencies with merely similar Skills.

## 11. Naming and identity
Every Argo stable name uses:
```
argo-<short-kebab-case-name>
```

Examples:
```
argo-write-article
argo-ship-feature
argo-debug-production-issue
argo-release-audit
```

Do not include version numbers in the stable name. Keep versioning in metadata when supported.

The name should describe the Destination, not the domain and not the member list.

## 12. Common creation scenarios

### User provides only a goal
Infer Destination → derive capability roles → discover Skills → choose bindings → create the minimal Argo.

### User provides exact Skills
Treat them as strong constraints, but still validate Destination Cohesion, overlap, independence, licensing, and availability. Add or remove members only when necessary and explain material corrections briefly.

### User provides some Skills
Keep valid members, infer missing capability roles, then resolve the remainder through reuse, dynamic resolution, or new Skill creation.

### No Skill registry is available
Prefer Embedded when implementations are supplied/creatable; otherwise declare Dynamic capability roles. Do not fabricate external references.

### Existing Skills differ across environments
Prefer Dynamic roles when exact implementation does not matter. Use Reference only when identity matters.

### Exact methodology must travel with the Argo
Prefer Embedded for the methodology-specific Skills and Reference/Dynamic for generic capabilities.

### Compliance or mandatory gates
Use Hard semantics for required contributions and define an explicit honest Definition of Done.

### Existing Argo needs improvement
Preserve identity unless the Destination itself changes. Audit routing, members, bindings, overlap, progressive disclosure, failure semantics, and whether it has drifted toward a workflow or monolithic Skill.

### User asks for nested Argos
Check the current Argo specification first. If nesting remains experimental or unsupported, prefer a flat capability architecture unless there is strong evidence nesting is necessary.

## 13. Argo body
Keep the Argo root focused. A robust default is:
- Destination
- Role / why these capabilities belong together
- Capability/member map
- Binding/resolution rules
- Participation semantics
- Shared constraints
- Lightweight dependency/artifact contracts only when necessary
- Progressive disclosure guidance
- Failure/fallback semantics
- Definition of Done

Do not copy detailed Skill methods into the Argo.

## 14. Validation pass
Before creation, verify:
- name begins with `argo-`;
- Destination is one concrete outcome;
- Argo is not merely a domain/category;
- every capability contributes materially;
- member Skills remain independently reusable;
- no unnecessary overlap exists;
- capability set is minimal but sufficient;
- binding choice is intentional per member;
- exact references really exist when claimed;
- third-party embedding respects provenance/licensing;
- Flexible vs Hard is intentional;
- required capabilities and success semantics are honest;
- progressive disclosure is preserved;
- Argo does not duplicate Skill methods;
- Argo does not recreate a workflow engine;
- package/schema follows the current Argo specification.

## Creation workflow
Use this sequence by default:
1. Understand or infer the requested outcome.
2. Read the current Argo contract when available.
3. Decide Argo vs Skill vs workflow vs no new reusable resource.
4. Write the Destination.
5. Derive the minimal capability architecture.
6. Search for existing Skills.
7. Decide `embedded`, `reference`, or `dynamic` binding per capability.
8. Decide Flexible/Hard and required/optional participation.
9. Define shared constraints, fallbacks, and Definition of Done.
10. Produce the Argo using the target environment's current format.
11. Create only genuinely missing reusable Skills when required by the task.
12. Verify saved files/pages/relations when tools permit.
13. Report the created Argo, member decisions, and unresolved dependencies concisely.

## Output
Return or create, depending on the user's request:
- a complete Argo;
- an Argo package;
- a registry/page representation;
- a capability/member plan before implementation when creation is not possible;
- missing independently reusable Skills when justified;
- or an audit/update of an existing Argo.

When useful, summarize the final design as:
```
Argo: argo-...
Destination: ...
Participation: Flexible | Hard
Capabilities:
- role → Skill / binding / required?
Definition of Done: ...
```

## Definition of Done
The Argo is complete when:
- its Destination is concrete;
- its capability set is coherent, minimal, and sufficient;
- existing Skills were reused where appropriate;
- any new Skill is independently reusable;
- every member has an honest binding/resolution strategy;
- required participation is explicit;
- progressive disclosure is preserved;
- failure/fallback behavior is honest enough for the target runtime;
- the root contains coordination, not duplicated expertise;
- the result remains distinct from a domain collection, monolithic Skill, and workflow engine;
- the saved artifact follows the current Argo contract and is verified when possible.

## 15. Self-describing Argo principle

Every Argo created by this Skill MUST be locally interpretable by a capable agent that has never loaded a separate `/argo` reference Skill. `/argo` may provide deep global knowledge, but is never a prerequisite for normal execution.

The root contract MUST make clear: the Destination; why members belong together; each member identity or role; binding semantics; Flexible/Hard policy; required/optional constraints; relevant shared constraints; lightweight artifact dependencies; failure semantics; and an honest Definition of Done.

Explain semantic terms locally and minimally. In particular, explain that Hard requires every `required: true` member to materially participate, that optional members remain selectable, and that Hard does not prescribe order. Explain Dynamic as resolving a compatible capability, not assuming one exact Skill.

Use a two-layer model:

```text
LOCAL CONTRACT — in each Argo; enough for execution
GLOBAL MODEL   — /argo or the canonical specification; deep authoring and audit knowledge
```

## 16. Semantic Preservation Gate

Before writing, exporting, or approving an Argo, run a semantic preflight. Do not claim completion while a blocking ambiguity remains.

Verify independently:

1. One concrete Destination, not a domain, member list, or task-instance goal.
2. Every member contributes materially and remains independently reusable.
3. Membership does not silently prescribe a workflow.
4. Bindings describe resolution, not capability meaning.
5. Flexible/Hard is Argo-level; required/optional is member-level.
6. In Hard, every required member has material participation; optional members may be skipped.
7. In Flexible, adaptive selection is allowed when the Destination remains honestly satisfied.
8. Runtime mechanics (retries, queues, general branching, rollback) stay outside the Argo.
9. Detailed methods remain inside member Skills.
10. The Argo is locally self-describing and progressively disclosed.
11. Failure semantics and Definition of Done prevent false success.

If a field can support two materially different interpretations, clarify it locally before packaging.

## 17. Constraint calibration

Specify invariants, not ceremony. Preserve high freedom when several paths are valid; constrain order only for an artifact/data dependency or genuine correctness property. Prefer “required members must materially participate before success” over an imposed sequence of Skills.

## 18. Argo authoring evals

For important Argos, evaluate routing and semantic execution, not merely file parsing.

- **Routing:** include should-select, near-miss single-Skill, workflow, indirect-intent, and broad-domain non-selection prompts.
- **Semantic interpretation:** without `/argo`, test understanding of Destination, bindings, participation, runtime freedom, failure conditions, and completion.
- **Execution:** test required participation, unnecessary activation, appropriate Flexible skips, progressive disclosure, artifact contracts, honest failure, and Destination success.
- **Ablation:** compare no Argo, Argo only, and Argo plus global `/argo` knowledge; measure quality, interpretation, compliance, context cost, latency, and agreement.

## 19. Source-of-truth and duplication discipline

When both representations exist, use:

```text
SKILL.md  → normative human/agent-readable semantic contract
argo.json → machine-readable projection or index
```

The projection MUST NOT introduce, remove, or contradict normative semantics. Treat drift as invalid until reconciled. Add manifest fields only when they materially help resolution, validation, indexing, or cross-runtime testing.

## 20. Final semantic audit

Before claiming readiness, check artifact quality (specific routing, focused contract, progressive disclosure, clear imperative instructions, no decorative duplication) and run the Semantic Preservation Gate.

Apply the cold-agent test: a capable agent that sees only the package and a task must understand the Destination, members, bindings, obligations, runtime freedom, failure conditions, and completion criteria. Improve the local contract if it cannot.

## 21. Runtime support profile

Treat runtime support as dimensions, not a vendor-specific maturity ladder:

- **Interpretable** — can understand the root contract.
- **Resolvable** — can resolve member identities/dynamic bindings.
- **Operational** — has the selected capability’s required tools/environment.
- **Verifiable** — can produce observable evidence for mandatory obligations.

Distinguish semantic requirements, environment requirements, and runtime execution choices. Do not require a particular vendor, model, or sub-agent pattern unless independence itself is a success constraint.

## 22. Hard participation evidence

For Hard Argos, design observable evidence for every required member. Evidence is an artifact, decision, check, or externally observable result — never hidden reasoning or a bare “ran” checkbox.

Ask for every required member: what unique responsibility makes it mandatory; what evidence proves material participation; and whether success would be honest without that evidence. If completion would still be honest, reconsider whether the member is actually required.

## 23. Redundancy and ablation testing

Challenge overlap empirically when necessary. Compare variants that remove suspect members, then measure outcome quality, guarantees, cost, and reliability. Prefer the smallest variant that preserves the Destination and success guarantees. Flag high-risk redundancy for an ablation rather than deleting it solely from similar descriptions.

## 24. Argo evaluation protocol

Do not claim performance value merely because a package is coherent. Compare where possible:

```text
A — same model/runtime, normal tools, no Skill package
B — same model/runtime, Skill registry, ad-hoc discovery
C — same model/runtime, same registry, Argo
```

Control model, system instructions, tools, task/input, budget, success criteria, and underlying Skill implementations. Measure outcome quality, member selection/compliance, unnecessary activations, context/tool/latency cost, repeatability, resolution failures, and Hard-compliance failures. Test multiple registry sizes when evaluating routing value.

## 25. Portability invariants

Portability preserves semantic invariants across compatible runtimes, not identical execution traces. Preserve identity, Destination, member/capability identity, binding intent, participation semantics, constraints, and Definition of Done. Order, parallelism, tools, models, and recovery may vary. Do not claim portability until it has been tested.

## 26. Evidence-first maturity rule

Do not standardize new mandatory Argo machinery until repeated real executions show that the minimal model is insufficient. For experimental Argos: freeze current boundaries; run real tasks; inspect failures and redundancy; run ablations; compare model-only vs ad-hoc Skills vs Argo; then promote only evidence-backed requirements into the future specification.

## Provenance

Canonical source: [Skillbase `argo-creator`](https://app.notion.com/p/3cbeba09656f81a7bc18e705f5e55599), fetched 2026-09-02. The Notion page is authoritative for future synchronization.
