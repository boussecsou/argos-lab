# Task 02 — Conventional Commits

## Editorial Brief

- Purpose: Explain when Conventional Commits help small public repositories and when they become unnecessary ceremony.
- Reader: Maintainers of small public repositories.
- Angle: Conventional Commits are valuable when commit metadata feeds release automation; they are wasteful when no one or no tool consumes the structure.
- Promise: The reader will know whether to adopt the convention and how lightly to start.
- Outline: Define the convention; connect it to changelogs and SemVer; describe good-fit cases; describe poor-fit cases; give adoption recommendation.
- Length: 500-700 words.
- Voice: Plain, skeptical of marketing language, practical for maintainers.
- Constraints: Prefer official Conventional Commits specification and primary release-tool documentation; include one realistic limitation.

## Evidence Pack

- The Conventional Commits 1.0.0 spec defines a lightweight convention for commit messages that adds human- and machine-readable meaning and supports automated tooling. Source: Conventional Commits, https://www.conventionalcommits.org/en/v1.0.0/
- The spec maps `fix` to PATCH, `feat` to MINOR, and breaking changes to MAJOR releases under Semantic Versioning. Source: Conventional Commits, https://www.conventionalcommits.org/en/v1.0.0/
- SemVer defines MAJOR, MINOR, and PATCH increments according to incompatible API changes, backward-compatible functionality, and backward-compatible bug fixes. Source: Semantic Versioning 2.0.0, https://semver.org/
- release-please automates changelog generation, GitHub releases, and version bumps by parsing git history for Conventional Commit messages. Source: release-please README, https://github.com/googleapis/release-please
- release-please does not handle package-manager publication or complex branch management. Source: release-please README, https://github.com/googleapis/release-please
- Gap: Official specs and tools describe mechanics; the recommendations for small-repo adoption are editorial judgments based on those mechanics.

## Article

# Conventional Commits Are Useful When a Tool Reads Them

Conventional Commits are not a virtue signal. They are a compact interface between maintainers, contributors, and release tooling. The 1.0.0 specification describes a lightweight convention that adds human- and machine-readable meaning to commit messages. Its core shape is simple: a type such as `fix` or `feat`, an optional scope, a colon, and a short description. Breaking changes are marked with `!` or a `BREAKING CHANGE` footer.

That structure pays off when something consumes it. The Conventional Commits spec explicitly connects `fix` commits to SemVer patch releases, `feat` commits to minor releases, and breaking changes to major releases. SemVer itself defines those version levels around bug fixes, backward-compatible functionality, and incompatible API changes. Put together, the commit message becomes release metadata: not perfect, but structured enough for automation.

For a small public repository, the strongest case is automated release work. release-please, for example, says it automates changelog generation, GitHub releases, and version bumps by parsing git history for Conventional Commit messages. In that setup, a maintainer who writes `fix(parser): handle empty input` is not merely making history tidier; they are giving the release bot enough signal to place the change in release notes and choose the right version bump. That is real leverage, especially when the project has external users who read changelogs or depend on version promises.

The convention also helps in lightweight triage. A history full of `docs:`, `test:`, `fix:`, and `feat:` commits is easier to scan than a history full of "updates" and "misc changes." New contributors can infer what kind of change a pull request contains. Maintainers can search history by type. None of that requires a large team.

But Conventional Commits become ceremony when the repository has no release automation, no public API, no meaningful changelog, and no contributor base that benefits from the shared language. A two-person project that deploys continuously from `main` and never publishes versioned artifacts may spend more energy policing prefixes than it saves. The convention is also only as accurate as the human choosing the type. A mislabeled `fix` that actually introduces a feature can produce misleading release notes or the wrong version bump.

There are tool limits too. release-please is clear that it does not handle package-manager publication or complex branch management. Conventional Commits can feed a release process; they do not design the entire process. Maintainers still need branch policy, review norms, and a way to correct release notes when history is messy.

The adoption recommendation is therefore modest: use Conventional Commits when commit metadata will drive changelogs, SemVer bumps, release pull requests, or contributor coordination. Start with only the types your tooling needs: usually `feat`, `fix`, `docs`, `test`, `chore`, and `refactor`, plus the breaking-change marker. Enforce it on squash-merge titles rather than every local commit if that fits your workflow.

If no person or tool will read the prefix, skip the ritual. Good commit messages matter. Conventional Commits matter when their structure becomes an input to maintenance, not when they are treated as decorative punctuation.

## QA Report

- Status: Pass.
- Blocking issues: None remaining.
- Brief coverage: Reader, angle, promise, outline, length, voice, and constraints are explicit.
- Evidence coverage: Claims map to official/spec or primary tool sources; editorial recommendation is labeled as judgment.
- Article completeness: Complete 500-700 word article delivered.
- Quality gate: Relationship to changelogs and SemVer, realistic limitation, and adoption recommendation are present.

