# Task 01 Run Output — Dependency Pinning

## Editorial brief

- **Purpose:** Explain why dependency pinning is necessary for reproducible experiments and give senior engineers an immediately usable control set.
- **Reader:** Senior software engineers designing or reviewing experimental systems.
- **Angle:** Treat dependencies as experimental inputs, not incidental setup; pinning controls one major source of variance but is not a synonym for reliability or complete reproducibility.
- **Promise:** The reader will understand the distinction, the branch-reference failure mode, the tradeoff, and five concrete actions.
- **Outline:** Define the reproducibility boundary; explain mutable references; state what pins do and do not guarantee; give a five-item checklist; acknowledge maintenance cost.
- **Length:** 500–700 words for the article body.
- **Voice:** Clear, pragmatic, technically precise.
- **Constraints:** Prefer primary technical sources; distinguish reproducibility from reliability; avoid claiming that pinning alone is sufficient.

## Evidence pack

| Claim | Source | Confidence |
| --- | --- | --- |
| Reproducibility requires the same source, environment, and instructions; dependency versions are relevant environment attributes. | Reproducible Builds, [“Definitions”](https://reproducible-builds.org/docs/definition/) (current documentation, accessed 2026-09-02). | High |
| A Git branch is a reference to a commit and is expected to change over time. | Git project, [“Git data model — References”](https://git-scm.com/docs/gitdatamodel.html#_references) (current documentation, accessed 2026-09-02). | High |
| Exact-version lock files exist for reproducibility; a lock format can let installers determine what to install without resolving at install time. | Python Packaging Authority, [“Tool recommendations — Lock files”](https://packaging.python.org/en/latest/guides/tool-recommendations/#lock-files); Python Steering Council, [PEP 751](https://peps.python.org/pep-0751/). | High |
| Full commit SHAs are immutable references for GitHub Actions, while pinning means updates must be managed deliberately. | GitHub Docs, [“Managing custom actions”](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/manage-custom-actions#using-a-commit-sha-for-release-management). | High |

**Gaps:** These sources establish the mechanics and reproducibility rationale, not a universal experiment policy. The checklist and update cadence below are editorial recommendations. Pinning does not control hardware, operating-system state, data, randomness, external services, or undeclared transitive inputs.

## Article

# Reproducible Experiments Start by Freezing the Dependency Graph

An experiment can pass on Monday and fail on Friday without a line of experiment code changing. If installation resolves a newer library, container base, compiler plug-in, or Git branch tip, the second run did not receive the same inputs. The result may reveal an upstream improvement or regression, but it is not a clean replication.

For senior engineers, the useful rule is simple: dependency identity belongs in the experimental record. Pinning is how you make that identity explicit.

## Reproducibility is not general reliability

Reproducibility asks whether the same declared inputs and procedure can produce the same specified output. The Reproducible Builds project makes the boundary concrete: source code, build environment, and build instructions must be held constant, and dependency versions are among the relevant environment attributes ([definition](https://reproducible-builds.org/docs/definition/)). An experiment may use a weaker equality test than bit-for-bit build identity, such as a metric within tolerance, but the input-control principle remains.

Reliability is broader. A reliable system behaves acceptably across expected failures, load, time, and environmental variation. Pinning a defective package can make a run reproducible and consistently wrong. Conversely, a service can be operationally reliable while its unrecorded dependency resolution prevents anyone from reconstructing a particular result. Treat pinning as an experimental-control mechanism, not a certificate of software quality.

## A branch name is a moving input

References such as `main`, `develop`, or `release/v2` look descriptive but do not identify fixed content. Git’s own data-model documentation says a branch refers to a commit and is expected to change as new commits move the reference ([Git references](https://git-scm.com/docs/gitdatamodel.html#_references)). Two installations of `package @ git+…@main` can therefore fetch different trees.

The same risk appears behind mutable container tags and permissive version ranges. A manifest may be unchanged while the resolved graph changes. The dangerous part is not merely that a new version might break. It is that code change and dependency change become confounded, so the experiment cannot attribute the outcome.

Use immutable identifiers at the execution boundary: exact released versions plus a lock file, image digests, and full commit IDs for VCS dependencies. GitHub likewise documents a full commit SHA as an immutable way to select an Action, while noting that the consumer will not receive later updates automatically ([GitHub Docs](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/manage-custom-actions#using-a-commit-sha-for-release-management)).

## A five-item checklist

1. **Lock the entire resolved graph.** Record transitive as well as direct versions; PyPA describes lock files as containing exact installed versions for reproducibility ([PyPA](https://packaging.python.org/en/latest/guides/tool-recommendations/#lock-files)).
2. **Replace moving VCS references.** Resolve branches and convenience tags to full commit IDs.
3. **Pin non-package inputs.** Use container digests and record runtimes, compilers, system libraries, models, and data snapshots.
4. **Verify artifacts.** Store hashes where the ecosystem supports them, and retain the lock file and environment metadata with the result.
5. **Test the reconstruction.** Build the environment from scratch in clean CI, then run the experiment’s declared comparison.

## Pay the update cost deliberately

Strict pins trade automatic freshness for control. They can retain vulnerabilities, delay compatible fixes, create platform-specific lock files, and make upgrades arrive as noisy batches. That is a real operating cost, not a reason to abandon pins.

Separate replication from maintenance instead. Keep the recorded experiment immutable; let dependency automation propose reviewed updates on a schedule; rerun validation; and issue a new lock snapshot when it passes. You preserve the ability to explain yesterday’s result without pretending yesterday’s dependencies should run forever.

## QA report

**Verdict: PASS — publishable.**

| Gate | Result | Notes |
| --- | --- | --- |
| Brief adherence | Pass | Named reader, requested distinction, mutable branches, five-item checklist, cost, length, and pragmatic voice are present. |
| Factual and citation review | Pass | All hard technical claims map to the evidence pack; links identify primary project documentation. |
| Structure and clarity | Pass | Thesis appears in the opening; sections follow definition → risk → action → tradeoff. |
| AI-content audit and voice | Pass | No invented statistics, quotes, case studies, or sources; generic throat-clearing and false certainty were removed. |

**Blocking issue found:** The initial framing risked implying that pinned packages alone guarantee reproducibility. **Resolution:** The article now calls pinning an input-control mechanism, names uncontrolled inputs, and requires clean reconstruction testing. **Remaining blocking issues:** None.
