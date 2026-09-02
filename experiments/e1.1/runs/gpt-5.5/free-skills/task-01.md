# Task 01 Output - Dependency Pinning

## Editorial Brief

- Purpose: Explain why pinned dependency versions are necessary for reproducible experiments.
- Reader: Senior software engineers designing, running, or reviewing software experiments.
- Angle: Treat dependency versions as part of the experimental apparatus, not general maintenance trivia.
- Promise: The reader will leave with a practical distinction between reproducibility and reliability, a clear warning about mutable branch references, and a checklist they can apply.
- Outline: Define reproducibility; contrast with reliability; show how mutable dependency references undermine experiments; provide five-item checklist; acknowledge pinning costs.
- Length: 500-700 words.
- Voice: Clear, pragmatic, technical.
- Constraints: Prefer primary technical sources; include identifiable citations; disclose gaps; no invented citations.

## Evidence Pack

Likely claims and sources:

- Lockfiles support reproducible installs by recording exact dependency trees. Source: npm Docs, "package-lock.json," https://docs.npmjs.com/files/package-lock.json/
- pip requirements files support version specifiers and direct URL references, including VCS/archive-style sources. Source: pip documentation, "Requirements File Format," https://pip.pypa.io/en/stable/reference/requirements-file-format/
- GitHub recommends pinning third-party Actions to full-length commit SHAs; tags can move or be deleted. Source: GitHub Docs, "Secure use reference," https://docs.github.com/en/actions/reference/security/secure-use
- SLSA provenance treats resolved dependencies, including resolved git commits, as part of how an artifact was produced and verified. Source: SLSA, "Build: Provenance," https://github.com/slsa-framework/slsa/blob/main/spec/build-provenance.md

Unresolved gaps: Exact behavior varies by ecosystem and package manager. This article intentionally avoids claiming that all lockfiles guarantee bit-for-bit builds across operating systems, compilers, registries, or build backends.

## Article

# Pinned Dependencies Are Experimental Control, Not Housekeeping

Reproducible experiments require a stronger discipline than generally reliable software. Reliability asks whether a system behaves acceptably across normal variation: new patch releases, fresh runners, rotated images, or updated transitive dependencies. Reproducibility asks a narrower question: can another engineer rerun the same experiment and get evidence about the same system under the same relevant conditions? In that context, dependency versions are not background implementation detail. They are part of the experimental apparatus.

A/B tests, benchmark comparisons, migration trials, and model evaluations all depend on isolating the variable under study. If a benchmark compares two storage strategies while the HTTP client, test runner, compiler plugin, or CI action changed between runs, the result is no longer cleanly attributable to the storage change. The software may still be reliable enough to ship. The experiment is not reproducible enough to trust.

Package managers recognize this problem in their own ways. npm's lockfile documentation says `package-lock.json` records the exact dependency tree so future installs can recreate the same tree rather than resolving fresh versions from ranges. pip requirements files support explicit version specifiers and URL-based requirements, including direct references to archives or VCS sources. These mechanisms do not make every build bit-for-bit identical, but they reduce one major source of drift: dependency resolution changing while the experiment name stays the same.

Mutable branch references are especially dangerous because they look specific while behaving like moving targets. A dependency such as `some-tool @ main`, a GitHub Action referenced by `@v4`, or an internal library pulled from `develop` can resolve to different code tomorrow. GitHub's Actions security guidance is blunt: a full-length commit SHA is the only immutable release reference for an action, while tags can be moved or deleted. SLSA's provenance model makes the same principle visible from another angle: a build record should capture resolved dependencies, such as the exact commit a git reference resolved to, so consumers can verify what actually participated in producing the artifact.

For senior engineers, the practical point is not "freeze everything forever." It is "freeze the inputs while drawing conclusions." During an experiment, mutable references convert time into an untracked variable.

Use this checklist before trusting an experiment result:

1. Pin direct dependencies to exact versions or immutable digests for the experiment window.
2. Commit lockfiles and use installation commands that honor them in CI.
3. Replace branch and floating tag references with commit SHAs for Actions, build plugins, fixtures, and internal tools.
4. Record the runtime context: language version, package manager version, base image, operating system, and relevant feature flags.
5. Separate dependency-update runs from experiment runs; if dependencies change, rerun the baseline.

Strict pinning has costs. Security fixes and compatibility updates do not arrive automatically. Lockfile conflicts create review work. Exact pins can also hide whether the system remains healthy under normal dependency churn. That is why pinning belongs to an experiment protocol, not as a blanket excuse to avoid maintenance.

The right operating model is two-speed. For product reliability, keep dependencies current with automated update workflows, tests, and staged rollout. For experimental reproducibility, snapshot the dependency graph, run the comparison, and preserve enough provenance for another engineer to reconstruct what happened. Reliability keeps the product alive. Reproducibility keeps the evidence honest.

## QA Report

Status: Pass.

Checks:

- Editorial brief complete: Pass. Reader, angle, promise, outline, length, voice, purpose, and constraints are explicit.
- Evidence traceability: Pass. Factual claims map to npm, pip, GitHub Actions, and SLSA primary sources.
- Article completeness: Pass. Complete 500-700 word article delivered with required distinction, mutable branch risk, five-item checklist, and cost of strict pinning.
- Blocking issues: None found.
- Resolved issues: No blocking issues required repair.

## Execution Receipt

- Artifacts produced: editorial brief, evidence pack, article draft, QA report.
- Required capabilities used: editorial-brief, article-evidence, article-drafting, editorial-qa.
- Optional capabilities used: none.
- Article word count: 544.
