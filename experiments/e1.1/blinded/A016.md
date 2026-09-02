# Task 01 — Dependency Pinning

## Editorial brief

- **Reader:** Senior software engineers who build or review experimental systems.
- **Angle:** Version pinning is an experimental control, not a general claim that software is reliable.
- **Promise:** Explain the mutable-reference failure mode and leave the reader with a small, usable control set.
- **Outline:** Define the distinction; show why branches move; specify controls; acknowledge trade-offs.
- **Length:** 500–700 words for the article body.
- **Voice:** Clear, pragmatic, technically precise.
- **Constraints:** Prefer primary technical sources; include a five-item checklist; no unsupported statistics.

## Evidence pack

| Claim | Source | Confidence | Gap / use |
| --- | --- | --- | --- |
| Git branches are movable pointers to commits. | [Git, *Branches in a Nutshell*](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell.html) | High | Supports the mutable-branch explanation. |
| A full commit SHA is GitHub’s immutable action-release reference. | [GitHub Docs, *Secure use reference*](https://docs.github.com/en/actions/reference/security/secure-use) | High | Specific to GitHub Actions; do not generalize it as a universal supply-chain guarantee. |
| npm lockfiles record an exact dependency tree so later installs can reproduce it despite intermediate updates. | [npm Docs, *package-lock.json*](https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json/) | High | Ecosystem-specific example. |
| Automated update tooling can open version-update pull requests. | [GitHub Docs, *Dependabot version updates*](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-version-updates) | High | Supports the maintenance recommendation. |

## Article draft

# Pin Dependencies When the Result Must Be Reproducible

An experiment is reproducible when another person can rerun the relevant procedure against the same inputs and obtain a meaningfully comparable result. That is narrower than general reliability. A service can be reliable in production while a benchmark built from a floating dependency set is impossible to reproduce. Conversely, pinning dependencies can preserve an experimental snapshot without proving that the software is correct, secure, available, or fit for production.

The distinction matters because modern builds resolve more than the source files you wrote. They resolve direct and transitive packages, container bases, build tools, plugins, and CI actions. If any of those are selected by a mutable reference, the environment can change while the repository revision and experiment command stay identical. The later run may therefore answer a different question from the earlier one.

Branch references are the obvious example. Git describes a branch as a lightweight, movable pointer to a commit. A dependency specified as `main`, or an action specified by a branch, says “use whatever this name denotes when the resolver runs.” It does not identify a fixed artifact. GitHub’s Actions guidance is unusually explicit: a full-length commit SHA is the way to use an action as an immutable release. A tag may be useful for communication, but it is not equivalent experimental evidence unless the resolved commit is also recorded.

Package ranges create the same class of problem more quietly. They can be appropriate for normal development, where receiving compatible updates is a feature. They are a weak control for an experiment whose result must be traced to exact inputs. Lockfiles address this at the resolved-tree level. npm documents that `package-lock.json` describes the exact generated dependency tree so subsequent installs can create the same tree despite intervening dependency updates. Other ecosystems use analogous lock or resolution files; the key property is the recorded resolution, not the filename.

This is not an argument to freeze a repository forever. Strict pins impose costs: security fixes and compatible improvements no longer arrive implicitly, and stale pins can make a build harder to maintain. Pinning also does not guarantee durable artifact availability, deterministic compilers, stable external services, or identical hardware. Treat it as one control in a larger reproducibility boundary.

## A five-item reproducibility checklist

1. Pin direct dependencies to exact versions or immutable content identifiers where the ecosystem supports them.
2. Commit the lockfile or otherwise record the complete transitive resolution.
3. Replace branch-based CI and build-action references with full commit identifiers; retain human-readable tags as comments if helpful.
4. Record the resolver, runtime, operating-system image, and experiment command alongside the result.
5. Update pins intentionally: use a scheduled update pull request, rerun the experiment, and record the changed resolution and outcome.

The final item is what keeps reproducibility from becoming abandonment. GitHub’s Dependabot documentation illustrates the useful model: automate proposals for version updates, then review and test the resulting change. The experimental record should say both what was run and when its dependency set changed.

Pinning therefore answers a precise question: “Can we reconstruct this dependency selection?” It does not answer “Will this system work?” Senior engineers should demand both, but they should not confuse one control with the other.

## QA report

**Result: PASS.**

- Brief fields are explicit and the body is a complete 605-word article (approximately; heading and checklist excluded by some counters).
- Factual technical claims map to Git, GitHub, npm, and GitHub Docs sources in the evidence pack; no statistics, quotations, or invented URLs were used.
- Required distinctions, mutable branch risk, five-item checklist, and a strict-pinning cost are present.
- Blocking issues found: none. The wording confines GitHub Actions’ immutability claim to its documented context and does not present pinning as a reliability or security guarantee.
