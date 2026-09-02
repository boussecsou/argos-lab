# Task 01 — Dependency Pinning

## Editorial Brief

- Purpose: Explain why pinned dependency versions are necessary for reproducible experiments.
- Reader: Senior software engineers who design, run, or review technical experiments.
- Angle: Reproducibility is a narrower, stricter property than general reliability; dependency pinning turns an experiment from "worked once" into something another engineer can rerun.
- Promise: The reader will understand the failure mode of mutable dependency references and leave with a practical checklist.
- Outline: Define reproducibility; distinguish it from reliability; explain mutable branches and version ranges; give checklist; acknowledge costs.
- Length: 500-700 words.
- Voice: Clear, pragmatic, engineering-led.
- Constraints: Prefer primary technical sources; include mutable branch-reference risk, five-item checklist, and one cost of strict pinning.

## Evidence Pack

- Reproducible Builds defines a reproducible build as one where the same source code, build environment, and build instructions let another party recreate bit-for-bit identical artifacts. Source: Reproducible Builds, "Definitions", https://reproducible-builds.org/docs/definition/
- The build environment normally includes dependencies and their versions, plus build flags and relevant environment variables. Source: Reproducible Builds, "Definitions", https://reproducible-builds.org/docs/definition/
- npm's `package-lock.json` describes the exact generated dependency tree so future installs can generate identical trees despite intermediate dependency updates. Source: npm Docs, "package-lock.json", https://docs.npmjs.com/files/package-lock.json/
- pip documents increasingly strict repeatable-install practices: pin package versions with `==`, pin transitive dependencies via generated requirements, and add hashes for stronger guarantees. Source: pip documentation, "Repeatable Installs", https://pip.pypa.io/en/stable/topics/repeatable-installs/
- Git describes branches as movable pointers to commits. Source: Pro Git, "Branches in a Nutshell", https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell.html
- Gap: Source pages establish build/dependency mechanics, not a universal policy for every experiment. The checklist below is an editorial recommendation derived from those mechanics.

## Article

# Reproducible Experiments Need Pinned Dependencies

Reliability and reproducibility are cousins, not synonyms. A reliable experiment usually behaves sensibly across ordinary reruns: tests pass, services start, dashboards refresh, and failures are explainable. A reproducible experiment has a tighter contract. Given the same source code, build environment, and build instructions, another engineer should be able to recreate the same specified artifacts or results. The Reproducible Builds project frames reproducibility around those inputs and bit-for-bit artifact comparison; it also names dependencies and their versions as part of the relevant build environment.

That distinction matters because many experiments are evaluated after the fact. A benchmark result, model evaluation, migration dry run, or dependency-upgrade trial may be cited weeks later when the dependency graph has changed. If the experiment only records "install the latest compatible packages," it has not captured the experiment. It has captured a recipe with moving ingredients.

This is also why "the tests passed" is insufficient evidence. Passing tests may show that one environment behaved acceptably once; reproducibility asks whether the exact environment can be reconstructed closely enough for another run to test the same claim.

Mutable references are the sharpest version of the problem. Git branches are movable pointers to commits, so a dependency that targets `main`, `master`, or a feature branch can silently resolve to different code tomorrow. The same problem appears in looser forms with package version ranges, floating container tags, unpinned toolchains, and setup scripts that fetch "latest." Even when every maintainer acts responsibly, the input set can drift between the original run and the attempted reproduction.

Lockfiles and pins are boring on purpose. npm says `package-lock.json` describes the exact tree that was generated so later installs can generate identical trees even after intermediate dependency updates. pip's repeatable-install guidance starts with exact `==` version pins, extends that idea to transitive dependencies, and then adds hashes when you need stronger protection against changed artifacts or compromised transport. The implementation varies by ecosystem, but the principle is the same: resolve once, record the resolution, and rerun from the record.

For senior engineers, the practical rule is to pin anything whose change could alter the result:

1. Pin direct and transitive package versions in a committed lockfile or fully resolved requirements file.
2. Prefer immutable commit SHAs or release tags over branch names for VCS dependencies.
3. Record the toolchain: compiler, runtime, package manager, OS image, and relevant build flags.
4. Use artifact hashes where the package manager supports them, especially for CI and release experiments.
5. Make the reproduction command non-interactive and keep it under version control next to the result.

Strict pinning is not free. It adds maintenance work, can delay security updates, and may create false comfort if the surrounding environment is still floating. Pins also make upgrade experiments more deliberate: someone has to decide when to refresh the graph and inspect the diff.

That cost is usually worth paying for experiments whose results will influence engineering decisions. Pinning does not make software generally reliable. It does something narrower and more useful for experimental work: it preserves the conditions under which a claim was made, so the claim can be checked instead of merely trusted.

## QA Report

- Status: Pass.
- Blocking issues: None remaining.
- Brief coverage: Reader, angle, promise, outline, length, voice, and constraints are explicit.
- Evidence coverage: Claims map to named sources with URLs; editorial checklist is labeled as recommendation derived from source mechanics.
- Article completeness: Complete 500-700 word article delivered.
- Quality gate: Mutable branch-reference risk, reproducibility/reliability distinction, five-item checklist, and cost of strict pinning are present.
