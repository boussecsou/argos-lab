# Task 01 — Dependency Pinning

## Editorial brief

- **Reader:** Senior software engineers.
- **Purpose and angle:** Explain dependency pinning as an input-control practice for reproducible experiments, while separating it from broad operational reliability.
- **Promise:** Give engineers a practical way to make an experiment rerunnable and auditable without pretending that a lockfile solves every environmental difference.
- **Outline:** Define reproducibility; explain dependency drift and mutable branch references; show the controls that make a pin useful; provide a five-item checklist; acknowledge the maintenance cost.
- **Length:** 500–700 words for the article.
- **Voice:** Clear, pragmatic, technically precise.
- **Constraints:** Prefer primary technical sources; distinguish sourced claims from recommendations; disclose limits.

## Evidence pack

1. Reproducible Builds, “Definitions,” defines a reproducible build as one where the same source, build environment, and instructions produce bit-for-bit identical specified artifacts, and identifies dependency versions as part of the environment: <https://reproducible-builds.org/docs/definition/>.
2. Git documentation, “Git Data Model,” describes branches as references expected to change and tags as references usually not changed after creation: <https://git-scm.com/docs/gitdatamodel>.
3. npm documentation, “npm install,” says npm uses exact versions from a lockfile when they satisfy the manifest, and recommends `npm ci` when the manifest and lockfile must remain strictly in sync: <https://docs.npmjs.com/cli/v11/commands/npm-install/>.

**Confidence and gaps:** High confidence for the documented Git and npm behavior and the cited reproducible-build definition. A lockfile does not pin the operating system, compiler, registry availability, build timestamps, or native toolchains; those controls are recommendations rather than claims that the cited sources guarantee a complete hermetic build.

## Article

# Pin the Inputs Before You Trust the Experiment

An experiment is reproducible when another party can use the same source, build environment, and instructions to recreate the specified artifact—ideally byte for byte. That definition is narrower than “reliable.” Reliability asks whether a system performs as required over time and under stated conditions. Reproducibility asks whether a particular result can be regenerated and checked. A service can be reliable in production while two runs of its benchmark use different libraries and therefore answer different questions.

Dependencies are a common source of that drift. A manifest such as `requests>=2.31` records an acceptable range, not the exact input used yesterday. A fresh environment may resolve a newer transitive package, a changed build backend, or a different native wheel. The experiment still runs, perhaps even passes its tests, but its output is no longer directly comparable with the earlier run. The problem is not that the new version is necessarily bad; it is that the experiment has changed without an explicit change to its design or recorded protocol.

Branch references make the same mistake at a different layer. Git documents a branch as a reference expected to move when new commits arrive, while tags are normally left unchanged. Building from `main`, or from a dependency URL that names a branch, therefore leaves the source input dependent on when the checkout occurs. “The code at that URL” is not an identifier. A commit hash is. For a release artifact, record the full commit identifier and verify what was fetched; for a moving development dependency, treat each update as a new experimental input.

Pinning is a control, not a declaration of eternal truth. Commit the resolver’s lockfile, use the package manager’s frozen or CI-oriented installation mode, and record the runtime and toolchain versions alongside the experiment. npm’s documentation describes the lockfile as the exact dependency tree and recommends `npm ci` when the manifest and lockfile must stay strictly synchronized. Equivalent controls exist in other ecosystems, but the principle is the same: resolve once, review the diff, then reuse the recorded result.

### A five-item pinning checklist

1. Pin direct and transitive dependencies with the ecosystem’s lockfile or constraints file.
2. Install in a mode that fails on lockfile drift rather than silently rewriting it.
3. Replace branch or floating references with immutable commit IDs, or record the resolved ID in the run metadata.
4. Capture the interpreter, compiler, operating-system image, and relevant environment variables.
5. Rebuild and compare a checksum or other defined output, and document any known nondeterminism.

Strict pinning has a cost: updates become a deliberate maintenance queue. Security fixes and compatibility improvements do not arrive merely because a range permits them; someone must refresh, test, and review the pins. Old binary artifacts can also become unavailable, and native builds may still vary across kernels or hardware. The answer is not to abandon pins. Keep a reproducible baseline, schedule dependency refreshes, and publish the resulting input change as part of the experiment’s record.

## Editorial QA

- **Status:** PASS.
- **Blocking issues:** None. The article defines reproducibility, distinguishes reliability, explains mutable branches, includes five checklist items, and states a cost of strict pinning.
- **Factual checks:** Claims about reproducible-build inputs, Git refs, and npm lockfile behavior map to the evidence pack. The limits of pinning are explicitly framed as limitations or recommendations.
- **Resolved issues:** No fabricated citations or unresolved contradictions found.

## Observable execution receipt

- Artifacts: editorial brief, evidence pack, complete article, QA report.
- Article word count target: 500–700 words (excluding brief, evidence, and QA sections).
- Required capabilities evidenced: editorial-brief, article-evidence, article-drafting, editorial-qa.
