# Why Reproducible Experiments Need Pinned Dependencies

## Editorial brief

- **Reader:** Senior software engineers who design or review experiments.
- **Angle and promise:** Reproducibility is an ability to recreate a specific result; pinning turns a dependency declaration into a recoverable input. The article distinguishes this from broad operational reliability.
- **Outline:** Define the distinction; explain mutable references; give the checklist; weigh the cost; close with a practical rule.
- **Length and voice:** 500–700 words; clear, pragmatic, technically precise.
- **Constraints:** Evidence-backed, primary technical sources preferred; include a five-item checklist and one cost of strict pinning.

## Evidence pack

| Claim | Source | Confidence / gap |
| --- | --- | --- |
| Reproducible builds require the same source, environment, and instructions, including dependency versions. | “Definitions,” Reproducible Builds project, undated, accessed 2026-09-02. https://reproducible-builds.org/docs/definition/ | High. This definition concerns builds; the article applies the same controlled-input principle to experiments. |
| A Git branch is a pointer to a commit, while a commit SHA identifies a particular object. | Scott Chacon and Ben Straub, *Pro Git*, “Git References,” 2nd ed., undated, accessed 2026-09-02. https://git-scm.com/book/en/v2/Git-Internals-Git-References | High. |
| GitHub documents full commit SHAs as unique and immutable action references; tags can be moved or deleted. | “Managing custom actions,” GitHub Docs, undated, accessed 2026-09-02. https://docs.github.com/en/actions/how-tos/create-and-publish-actions/manage-custom-actions | High. Applies directly to GitHub Actions; branch-reference risk generalizes to Git. |

## Article

An experiment is reproducible when another person can rerun the defined work and obtain the defined result. That is a narrower promise than “the system is reliable.” A service can be highly available, monitored, and well tested while an experiment based on it remains impossible to recreate six months later. Conversely, a pinned experimental environment can be reproducible even if it contains an old dependency with a known defect. The two goals overlap, but they answer different questions.

Dependency versions belong in the reproducibility question because they are part of the environment. The Reproducible Builds project defines reproducibility in terms of the same source, build environment, and instructions, and explicitly lists dependency versions among relevant environment attributes. The point is not aesthetic neatness in a manifest. It is to preserve the inputs that could change an observation.

Consider a benchmark that installs `library@latest`. The command is identical tomorrow, but the package behind that label may not be. A changed resolver, new transitive package, altered compiler flag, or performance regression can change the runtime without any edit to the benchmark repository. If the result moves, reviewers cannot tell whether the hypothesis failed, the code changed, or the environment drifted. A version range such as `^2.4.0` is often useful for ordinary application maintenance, but it is still a range of possible experimental inputs.

Branch references are an especially sharp version of this problem. In Git, a branch is a pointer to the head of a line of work; it is deliberately expected to advance. `some-tool@main` therefore records an intent to follow a moving target, not the exact source used for a run. GitHub’s action documentation makes the trade-off explicit: a full commit SHA is unique and immutable, whereas a tag may be moved or deleted. A branch is more convenient still, but gives up the identity needed for later reconstruction.

Pinning is not the entire experiment. Hardware, operating-system image, configuration, seeds, input data, and invoked commands can also affect a result. But an unpinned dependency creates a known uncontrolled variable in a place teams often overlook because package installation feels routine.

## A five-item pinning checklist

1. Record direct dependencies at exact versions and commit the lockfile.
2. Resolve transitive dependencies deterministically; preserve the resolver and registry configuration where practical.
3. Reference external Git code by full commit SHA; record a human-readable tag separately for context.
4. Capture the runtime image, language/toolchain version, and platform details with the run artifact.
5. Store hashes or immutable identifiers for inputs and produced artifacts, then rerun a representative case from the record.

Strict pinning has a cost: it delays routine security and bug-fix uptake, and dependency refreshes become deliberate work rather than background motion. That is healthy only if teams schedule that work. Use separate, reviewed update batches, rerun the experiment after each batch, and record the new environment as a new condition.

The practical rule is simple: use mutable references when you want current behavior; use immutable identifiers when you need to explain past behavior. An experiment usually needs the latter.

## QA report

**Status: PASS.** The article is 507 words, targets senior engineers, distinguishes reproducibility from reliability, explains mutable branch references, includes exactly five practical checklist items, and states a pinning cost. Factual claims map to the three sources in the evidence pack; no figures, quotes, or unverifiable citations were added. No blocking issues found; none required resolution.
