# Task 02 Output - Conventional Commits

## Editorial Brief

- Purpose: Explain when Conventional Commits help small public repositories and when they add unnecessary process.
- Reader: Maintainers of small public repositories.
- Angle: Conventional Commits are most useful when commit history feeds automation; otherwise they can become lightweight bureaucracy.
- Promise: The reader will understand the automation connection, a realistic limitation, and a concise adoption recommendation.
- Outline: Define the convention; connect it to changelogs and semantic versioning; describe when it pays off; describe when it becomes ceremony; recommendation.
- Length: 500-700 words.
- Voice: Practical, direct, non-marketing.
- Constraints: Prefer official Conventional Commits specification and primary tool documentation; include identifiable citations.

## Evidence Pack

Likely claims and sources:

- Conventional Commits 1.0.0 defines a structured commit format and explicitly relates `fix`, `feat`, and breaking changes to semantic versioning. Source: Conventional Commits specification, https://www.conventionalcommits.org/en/v1.0.0/
- semantic-release uses commit messages to determine release impact, generate changelogs, determine the next semantic version, and publish releases. Source: semantic-release README/documentation, https://github.com/semantic-release/semantic-release
- commitlint describes commit conventions as adding semantic meaning that tools can use for automated changelogs, version bumps, and selective test harnesses. Source: commitlint documentation, "Concept: Commit conventions," https://commitlint.js.org/concepts/commit-conventions.html
- commitlint can enforce message structure through configurable rules. Source: commitlint documentation, "Configuration," https://commitlint.js.org/reference/configuration.html

Unresolved gaps: Tool behavior depends on repository configuration and release policy. This article does not claim Conventional Commits alone produce correct releases without review.

## Article

# Conventional Commits Help When Machines Read Your History

Conventional Commits are a compact agreement about commit messages: start with a type such as `feat` or `fix`, optionally add a scope, then write a short description. The official specification frames this as a lightweight convention that gives both humans and tools a clearer history. Its strongest promise is not prettier logs. It is automation that can safely infer release intent from changes.

That matters for small public repositories because maintainers often have the least spare process budget. A one-person library, plugin, or documentation tool may still need dependable releases, readable changelogs, and contributor guidance. Conventional Commits can help when the repository's commit history feeds those outcomes. The specification maps `fix` to patch-level changes, `feat` to minor-level changes, and breaking-change markers to major-version impact under semantic versioning. semantic-release builds directly on this idea: it analyzes commit messages to determine the next semantic version, generate release notes, and publish from CI. commitlint describes the same semantic layer as input for automated changelogs, version bumps, and other workflow decisions.

In that setting, the convention is not ceremony. It is a small data contract. A commit titled `fix(parser): handle escaped commas` gives the release system, the maintainer, and a future contributor more usable information than `update parser`. A breaking-change footer gives downstream users an early warning. A consistent type vocabulary makes changelog sections less arbitrary and review history easier to scan.

The convention becomes ceremony when no consumer uses the structure. If a repository has irregular releases, no generated changelog, no semantic-version promise, and mostly squash merges written by one maintainer, strict commit policing may add friction without changing outcomes. Small projects also receive drive-by contributions from people who are already negotiating build setup, tests, and project norms. Rejecting a useful patch because the subject line says "Added support for TOML" instead of `feat(config): support TOML` can spend contributor goodwill on a detail the maintainer could fix while merging.

There is also a realistic limitation: commit messages describe intent, not truth. A `fix` can accidentally introduce a feature; a `feat` can be backward compatible in one package and breaking in another; a squash merge can collapse several impacts into one line. Automated release tools are only as good as the commit discipline, branch policy, and human review around them. Conventional Commits improve the input signal, but they do not replace maintainership.

The adoption recommendation is simple. Use Conventional Commits when at least one of these is true: you generate changelogs from commits, drive semantic-version decisions from commits, lint contributor messages in CI, or maintain a public API where release impact matters. Keep the rule set minimal: accept `feat`, `fix`, `docs`, `test`, `refactor`, `build`, `ci`, `chore`, and `perf`; require breaking changes to be explicit; avoid arguing over scope taxonomy until the project is large enough to need it.

For tiny repositories without release automation, document the format as a preference rather than a gate. Maintainers can normalize commit messages during squash merge. Once changelog or semantic-release automation arrives, promote the preference into enforcement with commitlint or an equivalent check.

Conventional Commits are worth it when they turn history into reliable input for releases. Without that consumer, they are mostly formatting. Good maintainers can tell the difference.

## QA Report

Status: Pass.

Checks:

- Editorial brief complete: Pass. Reader, angle, promise, outline, length, voice, purpose, and constraints are explicit.
- Evidence traceability: Pass. Claims map to the Conventional Commits specification, semantic-release, and commitlint documentation.
- Article completeness: Pass. Complete 500-700 word article delivered with changelog/semantic-version relationship, limitation, and adoption recommendation.
- Blocking issues: None found.
- Resolved issues: No blocking issues required repair.

## Execution Receipt

- Artifacts produced: editorial brief, evidence pack, article draft, QA report.
- Required capabilities used: editorial-brief, article-evidence, article-drafting, editorial-qa.
- Optional capabilities used: none.
- Article word count: 541.
