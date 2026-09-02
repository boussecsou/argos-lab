# Task 02 - Conventional Commits

## Editorial Brief

Purpose: Explain when Conventional Commits help small public repositories automate releases and when they become ceremony.

Reader: Maintainers of small public repositories who care about readable history, contributor friction, changelogs, and versioning.

Angle: Conventional Commits are most valuable when commit history feeds automation or user-facing release communication; they are least valuable when the repository has no consumers, no release process, and low contribution volume.

Promise: The article will connect the convention to automated changelogs and Semantic Versioning, name a realistic limitation, and give a concise adoption recommendation without marketing language.

Length and voice: 500-700 words, direct and maintainer-oriented.

## Evidence Pack

- The Conventional Commits 1.0.0 specification defines a lightweight convention for adding human- and machine-readable meaning to commit messages, and says it dovetails with SemVer by describing features, fixes, and breaking changes. Source: Conventional Commits specification, https://www.conventionalcommits.org/en/v1.0.0/
- The specification maps `fix` to patch-level changes and `feat` to feature additions, and uses `BREAKING CHANGE` or `!` to mark breaking API changes. Source: Conventional Commits specification, https://www.conventionalcommits.org/en/v1.0.0/
- semantic-release documentation says it uses commit messages to determine consumer impact, choose the next semantic version, generate release notes, and publish releases. Source: semantic-release documentation, https://semantic-release.gitbook.io/semantic-release
- Semantic Versioning says version numbers communicate meaning about what changed, once a project has a declared public API. Source: SemVer, https://semver.org/

Gaps: Tool behavior differs by release tooling and configuration; this article uses semantic-release as a primary example rather than claiming every tool behaves the same way.

## Article

# Conventional Commits Are Useful When History Has a Job

Conventional Commits improve small public repositories when commit messages are more than private notes. The convention gives commits a predictable shape: a type such as `fix` or `feat`, an optional scope, a short description, and optional body or footer. The official specification describes this as a lightweight layer over commit messages that gives both humans and tools a way to read intent. That is the key test for maintainers: does your history need to drive something?

The clearest win is release automation. Tools such as semantic-release use commit messages to infer the consumer impact of changes, choose the next version, generate release notes, and publish a release. This works because Conventional Commits line up with Semantic Versioning's idea that version numbers communicate the meaning of a change to users of a public API. A `fix` can become patch-level release material, a `feat` can signal minor-version material, and a `BREAKING CHANGE` footer or `!` can mark work that may require a major version.

That structure also helps automated changelogs. A repository with ten contributors and uneven commit styles often forces the maintainer to reverse-engineer intent at release time. Was "update parser" a bug fix, a user-visible enhancement, or a refactor? A conventional prefix does not replace release judgment, but it reduces the amount of archaeology. It also gives outside contributors a shared format, which can make review faster when pull requests are small and frequent.

The ceremony starts when the format is enforced without a purpose. Many small public repositories are libraries with real users; many others are demos, research prototypes, personal tools, or single-maintainer utilities with rare releases. If no tool consumes the commit history, no changelog is generated from it, and no semantic versioning policy exists, strict commit linting may simply move effort from code review into naming debates. In that setting, a clear commit subject may be better than a technically valid but unhelpful prefix.

There is also a realistic limitation: commits do not always map cleanly to user impact. A pull request may contain a bug fix, docs update, and internal refactor. Squash merges can hide the shape of the original work. Maintainers still need to decide what belongs in release notes, whether a change truly affects the public API, and whether a breaking change is acceptable. Conventional Commits create inputs for automation; they do not remove maintainership.

A good adoption rule is modest. Use Conventional Commits when at least one of these is true: you publish releases for external users, you want automated changelogs, you intend to automate SemVer decisions, or you regularly accept contributions from people who need a shared commit language. Start with the core types your tooling actually uses: usually `fix`, `feat`, `docs`, `refactor`, `test`, and `chore`, plus an explicit breaking-change marker. Keep scopes optional unless they help readers.

For a small repository, the goal is not a perfect taxonomy. It is to make the commit history carry enough meaning that release work becomes less manual and less ambiguous. Adopt the convention when it gives your history a job. Keep it light enough that contributors can still do theirs.

## QA Report

Status: Pass.

Required capability evidence:
- `editorial-brief`: Brief above captures reader, purpose, angle, promise, length, voice, and constraints.
- `article-evidence`: Evidence pack lists the official Conventional Commits specification, semantic-release documentation, and SemVer.
- `article-drafting`: Complete article supplied above.
- `copy-editing`: Draft tightened to avoid marketing language and keep the recommendation concise.
- `editorial-qa`: Checked for required prompt elements: automation value, ceremony boundary, changelog/SemVer relationship, realistic limitation, and adoption recommendation.

Approximate article length: 516 words.

Sources:
- Conventional Commits 1.0.0: https://www.conventionalcommits.org/en/v1.0.0/
- semantic-release documentation: https://semantic-release.gitbook.io/semantic-release
- Semantic Versioning: https://semver.org/
