# Task 01 - Dependency Pinning

## Editorial Brief

- Purpose: explain why reproducible experiments require pinned dependency versions.
- Reader: senior software engineers running or reviewing experiments.
- Angle: reproducibility fails when the software stack is allowed to drift, even if the code under test does not.
- Promise: show the difference between reproducibility and general reliability, explain why mutable branch references are risky, and give a pragmatic checklist.
- Outline: define the distinction, show how floating dependencies change the experimental unit, explain branch-ref risk, give a five-item checklist, acknowledge the cost of strict pinning.
- Length: 500-700 words.
- Voice: clear, pragmatic, technically literate.
- Constraints: prefer primary technical sources; avoid invented citations; include at least one real cost of strict pinning.

## Evidence Pack

| Claim | Source | Confidence | Notes |
| --- | --- | --- | --- |
| Reproducibility concerns whether the same results can be obtained again under specified conditions. | NIST glossary and terminology pages on reproducibility and repeatability: https://csrc.nist.gov/glossary/term/reproducibility and https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-appendix-d1-terminology | High | Useful for distinguishing reproducibility from broader reliability. |
| `package-lock.json` records the exact dependency tree so later installs can reproduce it. | npm docs: https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json/ and https://docs.npmjs.com/cli/install/ | High | Primary evidence for lockfiles preserving exact trees. |
| `Cargo.lock` captures exact dependency versions; `--locked` causes Cargo to error instead of changing resolution. | Cargo Book: https://doc.rust-lang.org/cargo/guide/cargo-toml-vs-cargo-lock.html and https://doc.rust-lang.org/cargo/commands/cargo.html | High | Useful cross-ecosystem support. |
| pip allows VCS refs such as branches, tags, and commit hashes; full commit hashes are preferable. | pip VCS support docs: https://pip.pypa.io/en/latest/topics/vcs-support/ | High | Direct support for the mutable-branch argument. |
| A Git branch head moves forward as new development is added. | Git glossary: https://git-scm.com/docs/gitglossary.html | High | Supports the claim that branch references are mutable. |

## Article Draft

# Pinned Versions Are What Turn Software Runs Into Experiments

Reproducibility and reliability are related, but they are not the same promise. Reliability asks whether a system keeps working. Reproducibility asks whether someone else can rerun the same setup and obtain the same result. NIST defines reproducibility in terms of obtaining agreement under changed conditions, and its glossary frames the concept around other experts producing the same results from the same data. That is why dependency pinning matters so much in experimental work: if the software stack drifts between runs, you are no longer rerunning the same experiment. You are comparing outcomes across a moving target. [1]

Modern package managers make that risk easy to underestimate. A manifest like `package.json`, `Cargo.toml`, or a loose Python requirement often describes an allowed range, not one exact world-state. npm's documentation says `package-lock.json` records the exact tree that was generated so later installs can recreate identical trees, even if intermediate dependencies have changed. Cargo makes the same distinction: `Cargo.toml` describes broad dependency intent, while `Cargo.lock` stores exact versions, and `--locked` tells Cargo to fail rather than silently recalculate resolution. Those are not convenience features. They are the mechanism that keeps an experiment stable across time, machines, and CI runs. [2][3][4]

This is also why mutable branch references are dangerous. pip explicitly supports VCS installs that point to a branch name, tag, or commit hash, and recommends a full commit hash when you want precise resolution. Git's own glossary explains that a branch head moves forward as development continues. Put those two facts together and the failure mode is obvious: a dependency pinned to `main`, `master`, or any live branch is not pinned at all. The identifier is stable, but the code behind it is not. A benchmark that uses a branch reference on Monday and the same reference on Friday may be measuring two different dependency snapshots while claiming to be one experimental condition. [5][6]

The practical checklist is short.

1. Lock direct and transitive dependencies, not just top-level version ranges.
2. Pin VCS dependencies to immutable commit SHAs instead of branch names.
3. Commit lockfiles and use frozen install modes such as `npm ci` or Cargo's `--locked` checks in CI.
4. Record toolchain versions that affect resolution, including package-manager behavior.
5. Treat dependency updates as deliberate experimental changes, with a new run record, not as background noise.

Strict pinning does have a cost. It creates lockfile churn, forces teams to schedule dependency refreshes, and can delay easy adoption of upstream fixes. In security-sensitive environments, exact pins also create pressure to maintain a faster update cadence so "reproducible" does not quietly become "reproducibly outdated." That cost is real, but it is still cheaper than drawing conclusions from an experiment whose environment changed without being noticed.

If the goal is ordinary service reliability, a floating patch range may be acceptable. If the goal is a reproducible experiment, exact dependency state is part of the treatment. The moment you let it float, you stop controlling the experiment you think you are running.

## References

[1] NIST glossary on reproducibility: https://csrc.nist.gov/glossary/term/reproducibility and NIST TN 1297 terminology appendix: https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-appendix-d1-terminology

[2] npm `package-lock.json`: https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json/

[3] npm install behavior with `package-lock.json`: https://docs.npmjs.com/cli/install/

[4] Cargo on `Cargo.toml` vs `Cargo.lock` and `--locked`: https://doc.rust-lang.org/cargo/guide/cargo-toml-vs-cargo-lock.html and https://doc.rust-lang.org/cargo/commands/cargo.html

[5] pip VCS support: https://pip.pypa.io/en/latest/topics/vcs-support/

[6] Git glossary on branches and refs: https://git-scm.com/docs/gitglossary.html

## QA Report

- Status: Pass
- Brief adherence: reader, angle, checklist, mutable-branch risk, and cost of pinning are all present.
- Evidence check: all factual claims map to identifiable primary sources; no invented citations were introduced.
- Structural check: complete article delivered with clear opening, explanation, checklist, and conclusion.
- Blocking issues: none.
- Publish recommendation: publishable.

## Execution Receipt

- Condition: `argo`
- Required members materially used: `editorial-brief`, `article-evidence` via live web sources, `article-drafting`, `editorial-qa`
- Optional members loaded: none
- Result: complete
