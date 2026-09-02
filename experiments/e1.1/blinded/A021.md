# Task 02 - Conventional Commits

## Editorial Brief

- Purpose: explain when Conventional Commits improve automation and when they become ceremony.
- Reader: maintainers of small public repositories.
- Angle: the format is most valuable when it feeds release automation and less valuable when a repo has little automated release surface.
- Promise: connect the convention to changelog and semantic-version automation, describe one real limitation, and give a concise adoption recommendation.
- Outline: define the convention, explain the automation upside, show where the overhead appears, present one limitation, give a recommendation.
- Length: 500-700 words.
- Voice: sober, practical, non-marketing.
- Constraints: prefer the official specification and primary tool documentation.

## Evidence Pack

| Claim | Source | Confidence | Notes |
| --- | --- | --- | --- |
| Conventional Commits is a lightweight convention that makes commit history easier for automated tooling to interpret. | Official spec: https://www.conventionalcommits.org/en/v1.0.0/ | High | Core definition and rationale. |
| `feat`, `fix`, and breaking changes map naturally to SemVer categories. | Official Conventional Commits spec and SemVer spec: https://www.conventionalcommits.org/en/v1.0.0/ and https://semver.org/ | High | Directly answers the versioning relationship. |
| Release automation tools use Conventional Commits to build changelogs and version bumps. | Release Please README and design docs: https://github.com/googleapis/release-please and https://github.com/googleapis/release-please/blob/main/docs/design.md | High | Clear primary documentation for changelog/release workflows. |
| semantic-release uses commit messages to determine consumer impact and automate versioning and release notes. | semantic-release README: https://github.com/semantic-release/semantic-release/blob/master/README.md | High | Primary automation documentation. |
| Commit linting tools exist to enforce the format, but they add setup and policy maintenance. | commitlint README: https://github.com/conventional-changelog/commitlint | High | Supports the adoption-cost discussion. |

## Article Draft

# Conventional Commits Help When Your Repo Needs a Machine-Readable History

Conventional Commits are useful when your repository's commit history is not just for humans. The specification is deliberately small: prepend a type such as `feat:` or `fix:`, optionally add a scope, and use `BREAKING CHANGE` or `!` when the change is incompatible. The point is not aesthetic consistency. The official specification says the convention makes commit history easier for automated tools to interpret, and that it dovetails with Semantic Versioning by expressing fixes, features, and breaking changes in the commit stream itself. [1][2]

That automation benefit is real. Tools such as Release Please parse Git history, generate changelog entries, and propose or create releases from Conventional Commit messages. semantic-release goes a step further: it uses commit messages to determine consumer impact, calculate the next semantic version, generate release notes, and publish releases. For a small public repository with external users, that can remove a surprising amount of release friction. Instead of manually reading ten merged pull requests and deciding whether the next tag is `1.4.3` or `1.5.0`, the repository turns the decision into a documented convention that tooling can apply consistently. [3][4]

This is where Conventional Commits are at their best: libraries, CLIs, actions, plugins, and templates that publish versions, maintain a changelog, or need dependable release notes for users. They also work well when a maintainer wants a cleaner triage view. A history full of `fix`, `feat`, `docs`, and `chore` is easier to scan than a history full of "final changes", "oops", and "update stuff". If you already want automated changelogs, release PRs, or SemVer-driven publishing, the extra syntax usually pays for itself.

They become ceremony when the repository has little or no automation downstream. A small public repo that ships twice a year, has no changelog generation, and uses tags only occasionally may not gain much from requiring every commit to fit a formal grammar. The cost is not huge, but it is real: people have to remember the format, pick from a controlled vocabulary, and maintain linting or review rules. commitlint exists precisely because many teams need a tool to enforce the convention consistently, which means configuration, hook setup, and occasional policy debates. [5]

There is also a practical limitation inside the spec itself. Conventional Commits gives first-class semantic meaning to `feat`, `fix`, and breaking changes, but it does not assign automatic version impact to every other type. That is usually fine, but it means teams still need local judgment. A `perf:` change might be user-visible or not. A `docs:` change might matter a lot for operators and not at all for versioning. In other words, the convention structures history, but it does not eliminate release policy.

My recommendation is concise: adopt Conventional Commits when your repository already needs machine-readable release inputs, and keep the policy minimal. Start with `feat`, `fix`, `docs`, and `chore`; lint only what you actually automate; and avoid turning scopes and exotic types into a taxonomy exercise. If your repo is tiny, rarely released, and mostly maintained by one person, lightweight commit guidance may be enough. Conventional Commits shine when they remove manual release work. If they do not remove work, they are probably ceremony.

## References

[1] Conventional Commits 1.0.0: https://www.conventionalcommits.org/en/v1.0.0/

[2] Semantic Versioning 2.0.0: https://semver.org/

[3] Release Please README: https://github.com/googleapis/release-please

[4] Release Please design docs: https://github.com/googleapis/release-please/blob/main/docs/design.md and semantic-release README: https://github.com/semantic-release/semantic-release/blob/master/README.md

[5] commitlint README: https://github.com/conventional-changelog/commitlint

## QA Report

- Status: Pass
- Brief adherence: includes automation upside, changelog/SemVer relationship, one realistic limitation, and a concise adoption recommendation.
- Evidence check: claims are grounded in the official spec and primary tool documentation.
- Structural check: full article delivered with clear recommendation and no marketing tone.
- Blocking issues: none.
- Publish recommendation: publishable.

## Execution Receipt

- Condition: `argo`
- Required members materially used: `editorial-brief`, `article-evidence` via live web sources, `article-drafting`, `editorial-qa`
- Optional members loaded: none
- Result: complete
