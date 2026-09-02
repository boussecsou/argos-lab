# Task 01 — Dependency Pinning

## Editorial brief

- **Purpose:** Explain why dependency pinning is a prerequisite for reproducible experiments and give engineers an adoption checklist.
- **Reader:** Senior software engineers who design or review experimental systems.
- **Angle:** Pinning is input control, not a general guarantee that software is dependable.
- **Promise:** The reader will understand the reproducibility/reliability distinction, recognize mutable-reference risk, and leave with five concrete controls.
- **Outline:** Define the boundary; explain version drift and mutable branches; give a five-item checklist; close with costs and a pragmatic policy.
- **Length:** 500–700 words for the article body.
- **Voice:** Clear, pragmatic, technically precise.
- **Constraints:** Prefer primary technical sources; distinguish reproducibility from reliability; cover mutable branches; acknowledge pinning costs; avoid claims that pinning alone is sufficient.

## Evidence pack

| Claim | Source | Confidence |
| --- | --- | --- |
| A reproducible build holds source, instructions, and the relevant environment constant; dependency versions are part of that environment. | [“Definitions,” Reproducible Builds project](https://reproducible-builds.org/docs/definition/) (n.d.) | High |
| Exact Python package versions, including transitive dependencies, support repeatable installation; hashes add stronger artifact verification. | [“Repeatable Installs,” pip documentation](https://pip.pypa.io/en/stable/topics/repeatable-installs/) (accessed 2026-09-02) | High |
| A full commit SHA is immutable, while a Git tag can be moved or deleted; GitHub recommends full-SHA pinning for third-party Actions. | [“Secure use reference,” GitHub Docs](https://docs.github.com/en/actions/reference/security/secure-use) (accessed 2026-09-02) | High |

**Unresolved gaps:** The sources do not quantify the maintenance cost of strict pinning. The cost discussion below is therefore framed as an engineering tradeoff, not a measured effect. “Experiment” reproducibility is broader than byte-for-byte build reproducibility; the article applies the same controlled-input principle without claiming the concepts are identical.

## Article

# Reproducible Experiments Start With Pinned Dependencies

An experiment that ran yesterday can fail today even when its code and data did not change. The hidden variable is often the environment: a resolver selects a newer library, a container base tag moves, or a Git branch points to a different commit. If the input changed, the second run is not a faithful repetition of the first.

That is why dependency pinning is an experimental control, not merely packaging hygiene.

## Reproducibility is narrower than reliability

Reproducibility asks whether another run can reconstruct the relevant inputs and obtain the same result. The Reproducible Builds project defines the analogous build property in terms of the same source, build environment, and instructions producing bit-for-bit identical artifacts; it explicitly includes dependency versions among relevant environmental attributes ([Reproducible Builds](https://reproducible-builds.org/docs/definition/)). Experiments may compare metrics rather than binaries, but the control principle is the same: record what can affect the outcome.

Reliability is broader. A reliable system behaves acceptably across expected conditions, handles failures, and continues to meet its service objectives. A perfectly pinned experiment can reliably recreate a bug. Conversely, a production service can be reliable while continually updating dependencies. Pinning supports causal interpretation; it does not prove correctness, availability, or statistical validity.

## Floating versions create an unrecorded treatment

A constraint such as `library>=2` does not identify one environment. On a later date, the resolver may choose a different direct or transitive dependency. pip’s repeatable-install guidance therefore recommends exact versions and notes that `pip freeze` captures transitive packages; it also describes hashes as protection against an artifact changing behind a version label ([pip documentation](https://pip.pypa.io/en/stable/topics/repeatable-installs/)).

Git references need the same scrutiny. A branch name such as `main` is intentionally mutable: new commits move its tip. Tags can also be moved in many hosting workflows. GitHub’s security guidance says that pinning a third-party Action to a full-length commit SHA is the only way to consume it as an immutable release, and warns that tags can be moved or deleted ([GitHub Docs](https://docs.github.com/en/actions/reference/security/secure-use)). A branch URL in an experiment is therefore not a version; it is a request to resolve a version later.

This drift is especially damaging when comparing treatments. If the control run used one dependency graph and the candidate run used another, an observed delta cannot be attributed cleanly to the intended change.

## A five-item pinning checklist

1. **Pin the full graph.** Lock direct and transitive dependencies, not only top-level requirements.
2. **Use immutable source identities.** Replace branch references and movable tags with full commit IDs or content-addressed artifacts.
3. **Verify retrieved bytes.** Record cryptographic hashes for packages, archives, images, datasets, and model files where the ecosystem permits it.
4. **Capture the surrounding environment.** Record runtime, operating-system or image digest, architecture, resolver version, configuration, and relevant seeds.
5. **Test reconstruction.** Rebuild the environment from an empty cache in an independent job, then retain the lockfile, commands, and resulting metadata with the experiment.

## Pin deliberately, then update deliberately

Strict pinning has costs. Security fixes and compatibility improvements do not arrive automatically; lockfiles create review work, and some artifacts may disappear unless they are mirrored. Pins can also preserve known defects.

The answer is not to float production experiments. Separate execution from maintenance: run recorded experiments against immutable inputs, while an automated update process proposes new pins for review and reruns validation. Pinning freezes the question long enough to answer it; scheduled updates decide when to ask the question again.

## Editorial QA report

- **Result:** PASS.
- **Blocking issues found:** None in the reviewed final draft. No fabricated sources, unresolved contradictions, missing promised sections, or unreadable structural passages were identified.
- **Resolution status:** Not applicable for blockers. During revision, the scope was clarified so that build reproducibility is used as an analogy rather than treated as identical to experimental reproducibility.
- **Brief adherence:** PASS — reader, distinction, mutable-branch risk, five-item checklist, cost, voice, and requested length are present.
- **Evidence and citations:** PASS — factual technical claims map to the three sources in the evidence pack; the unquantified maintenance-cost discussion is identified as an engineering tradeoff.
- **Publishability:** PASS.

## Execution receipt

- Produced: editorial brief, evidence pack, complete article draft, editorial QA report.
- External research used: Reproducible Builds project, pip documentation, GitHub Docs.
- Optional capabilities used: none.

