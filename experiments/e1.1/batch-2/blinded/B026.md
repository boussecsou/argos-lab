# Pin Dependencies to Reproduce an Experiment, Not Just to Keep It Running

Senior engineers often call dependency pinning a reliability practice. It can help reliability, but that description misses the experimental reason to do it. Reliability asks whether a system keeps delivering an acceptable service over time. Reproducibility asks a narrower, stricter question: can another person rerun a stated experiment and obtain the same result from the same inputs and method? A passing build today is not evidence that yesterday’s result can be reconstructed.

Dependencies are part of that method. A compiler patch, base image refresh, library release, model package update, or CI action can alter the code that executes an experiment even when the application repository is unchanged. When the version is unconstrained, the experiment specification contains an implicit instruction: “use whatever is current when you run it.” That is not a fully specified method.

The distinction matters in incident work. A service may be reliable because it accepts compatible dependency updates and because its tests catch regressions. That is a sensible operating strategy. Yet the same policy can make a benchmark comparison ambiguous: a later run may use a different solver, parser, or transitive library than the original run. Both runs can be healthy; they are simply not the same experiment. Reproducible-build guidance likewise treats environmental inputs such as timestamps as sources of unintended variation, which is why `SOURCE_DATE_EPOCH` exists for deterministic build metadata [Reproducible Builds](https://reproducible-builds.org/docs/source-date-epoch/).

Mutable Git references make the problem especially easy to overlook. A branch is intended to advance. GitHub’s documentation says that referencing an action by a branch always runs the version currently on that branch, and warns that a branch update can introduce breaking changes [GitHub Docs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/find-and-customize-actions). Tags are more readable but can also be moved or deleted. For third-party GitHub Actions, GitHub identifies a full commit SHA as the way to use an immutable release [GitHub Docs](https://docs.github.com/en/actions/reference/security/secure-use?learn=getting_started&learnProduct=actions). The same reasoning applies to an experiment’s script, container base, or plugin: a name is not necessarily the exact artifact you reviewed.

Pinning does not mean “freeze everything forever.” It means record the resolved inputs for a run, then choose and document a deliberate update cadence. Strict pins have costs: security fixes and bug fixes do not arrive automatically; updates require maintenance, retesting, and sometimes a new baseline. GitHub makes that tradeoff explicit for SHA-pinned actions: they are more reliable, but do not automatically receive important fixes [GitHub Docs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/find-and-customize-actions). Treat that cost as planned work, not a reason to leave experiments underspecified.

Use this five-item checklist before publishing a result:

1. Commit the lockfile and record the package-manager and runtime versions.
2. Pin containers, actions, and external code to immutable digests or full commit SHAs.
3. Capture the resolved dependency graph, including transitive dependencies, with the run artifact.
4. Record configuration, input-data versions, platform details, and nondeterminism controls alongside the result.
5. Schedule reviewed dependency refreshes, rerun the experiment, and label any changed result as a new baseline.

The goal is not to make software inert. It is to make the historical claim inspectable: this result came from these inputs, these versions, and this execution environment. That is the minimum useful promise of an experiment.

## Sources

- [GitHub Docs — Using pre-written building blocks in your workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/find-and-customize-actions)
- [GitHub Docs — Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use?learn=getting_started&learnProduct=actions)
- [Reproducible Builds — SOURCE_DATE_EPOCH](https://reproducible-builds.org/docs/source-date-epoch/)
