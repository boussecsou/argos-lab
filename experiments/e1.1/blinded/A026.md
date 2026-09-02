# Task 01 — Dependency Pinning

## Editorial Brief

- Reader: Senior software engineers responsible for build, CI, or release reproducibility.
- Angle: Version pinning is not a generic cleanliness rule; it is the mechanism that turns an environment description into a repeatable experiment.
- Promise: Explain why reproducible experiments need pinned dependency versions, where mutable references break that guarantee, and how to pin pragmatically without pretending it is free.
- Outline: Define reproducibility vs reliability, show how mutable references drift, give ecosystem examples, provide a five-item checklist, acknowledge tradeoffs.
- Length: 500–700 words.
- Voice: Clear, pragmatic, technically precise.
- Constraints: Prefer primary technical sources and disclose at least one real cost of strict pinning.

## Evidence Notes

- Reproducible Builds documentation says reproducibility depends on a specified build environment, including the tools used and their versions: <https://reproducible-builds.org/docs/perimeter/>
- Reproducible Builds also recommends recording relevant build-environment information: <https://reproducible-builds.org/docs/recording/>
- npm documents that `package-lock.json` captures the exact dependency tree so later installs can generate identical trees: <https://docs.npmjs.com/files/package-lock.json/>
- pip documents that VCS installs may point to a branch, tag, or commit hash, and that full commit hashes are preferable: <https://pip.pypa.io/en/latest/topics/vcs-support/>
- The Cargo Book explains that using the latest commit on a default branch breaks reproducible builds unless a specific revision is pinned: <https://doc.rust-lang.org/cargo/guide/cargo-toml-vs-cargo-lock.html>

## Article

Reproducible experiments need pinned dependency versions for a simple reason: an experiment is only repeatable if its execution environment is repeatable too. That sounds obvious, but teams often blur reproducibility with reliability and then miss the real control point.

Reliability asks whether a system usually works under expected conditions. Reproducibility asks whether the same inputs, code, and environment can produce the same result again later. A service can be reliable while still being hard to reproduce if a rebuild silently picks up newer transitive dependencies, a moved Git branch, or a different toolchain patch level. The Reproducible Builds project is explicit here: the build environment includes the tools used and their versions, and that environment should be recorded alongside the output. If versions are left floating, the environment description is incomplete.

That is why lockfiles and immutable references matter. npm’s documentation says `package-lock.json` records the exact dependency tree so future installs can recreate identical trees even if intermediate package releases happen later. Cargo makes the same point from another angle: if a dependency comes from a Git repository and you rely on the default branch, tomorrow’s build can pull a different commit than today’s. The Cargo Book calls out that this is bad precisely because it defeats reproducible builds. pip’s VCS documentation is similarly revealing: it permits branch names, tags, and commit hashes, but recommends full commit hashes when you care about precision.

Mutable branch references are the clearest failure mode. A dependency declaration such as “use `main` from this repo” is really a moving pointer. It looks pinned in syntax because the repository URL is fixed, but the resolved code is not. That makes experiment results harder to compare, debug, and defend. If a benchmark changes, you no longer know whether the cause was your code, the dependency, or a branch update that happened between runs.

For engineering teams, the operational rule is straightforward:

1. Commit lockfiles when the ecosystem supports them.
2. Pin direct dependencies to exact versions or exact revisions where experiment comparability matters.
3. Avoid branch-based VCS references in experiment-critical paths; use immutable commit hashes instead.
4. Record the surrounding build context, including toolchain versions and relevant environment settings.
5. Review dependency updates intentionally, as separate changes, rather than letting them drift into unrelated experiment runs.

Strict pinning does have a cost. It increases maintenance overhead, can create merge conflicts in lockfiles, and may delay security or bug-fix updates until someone refreshes the snapshot on purpose. Cargo’s documentation notes a related downside: locked installs can prevent you from automatically receiving dependency fixes. Teams also need a deliberate refresh cadence so snapshots do not age into operational risk. That tradeoff is real, but it is the price of control, not a reason to avoid control altogether.

If the goal is a reproducible experiment, pinning is not bureaucracy. It is part of the experiment design. You are defining the state you intend to test, making that state auditable, and preserving the ability to rerun the work later without guessing what changed.

## Editorial QA

- Brief coverage: Pass. Reader, angle, reproducibility-vs-reliability distinction, mutable branch risk, checklist, and pinning cost are all present.
- Evidence integrity: Pass. Claims are tied to identifiable primary documentation; no invented citations used.
- Structural completeness: Pass. The file includes brief, evidence notes, complete article, and QA verdict.
- Blocking issues found: None.
- Publish decision: Pass, publishable as-is.
