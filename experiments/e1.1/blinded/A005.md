# Task 02 — Conventional Commits

## Editorial brief

- **Reader:** Maintainers of small public repositories.
- **Purpose and angle:** Explain where Conventional Commits create useful automation and where a small project should avoid turning message syntax into ceremony.
- **Promise:** Leave maintainers with a bounded adoption policy tied to an actual release or changelog workflow.
- **Outline:** Define the convention; connect commit types to SemVer and release notes; describe practical automation; identify a limitation; give an adoption recommendation.
- **Length:** 500–700 words for the article.
- **Voice:** Sober, practical, non-promotional.
- **Constraints:** Prefer the official specification and primary tool documentation; avoid implying that the convention guarantees release correctness.

## Evidence pack

1. Conventional Commits 1.0.0 defines the message structure and maps `fix` to PATCH, `feat` to MINOR, and `BREAKING CHANGE` to MAJOR under SemVer: <https://www.conventionalcommits.org/en/v1.0.0/>.
2. semantic-release documentation explains that formalized commit messages can drive version selection, changelog generation, and publishing; its default analyzer uses Angular conventions and is configurable: <https://semantic-release.gitbook.io/semantic-release>.
3. semantic-release’s FAQ notes that committing a generated `CHANGELOG.md` can add complexity and may duplicate release notes already hosted by GitHub Releases: <https://semantic-release.gitbook.io/semantic-release/support/faq>.

**Confidence and gaps:** High confidence for the specification and the cited semantic-release behavior. Automation still depends on correct configuration, complete history, and honest commit classification; neither source promises that every human-facing release note will be accurate.

## Article

# Conventional Commits: Automate the Boring Part, Keep the Policy Small

For a small public repository, commit messages are often the only durable explanation of why a change exists. Conventional Commits adds a lightweight structure: a type, optional scope, short description, and optional body or footers. The official 1.0.0 specification is explicit about its aim: make history meaningful to people and machines. That makes the convention useful when a repository has a real consumer for the structure.

The strongest consumer is release automation. The specification maps `fix` to a SemVer PATCH increment, `feat` to MINOR, and a `BREAKING CHANGE` footer—or `!` marker—to MAJOR. A tool such as semantic-release analyzes commit messages to choose the next version, generate release notes, and publish a release. A maintainer can therefore merge a change and have the release pipeline apply a consistent versioning policy without manually reconstructing intent from a diff.

This is especially valuable when the repository publishes a library, CLI, action, or other artifact that users install independently of the source tree. A predictable history can also let a changelog generator group fixes and features, surface breaking changes, and link a release back to the commits that caused it. The value is operational: fewer hand-maintained steps and a reviewable trail from change to release.

The convention is not an automation spell. A `feat` label does not prove that an API change is backward compatible, and a missing `BREAKING CHANGE` footer can make a major change look minor. Squashed pull requests may discard useful detail; generated commits, bot updates, and rebases can produce messages that do not reflect the user-visible effect. semantic-release itself is configurable, which means its defaults are policy choices, not universal semantics. Keep a human review step for release boundaries and test the pipeline with representative histories.

There is also a cost to ceremony. If a two-person project has no automated release, no generated notes, and no external users who benefit from SemVer, enforcing a long taxonomy can slow contributions while adding little information. More allowed types do not automatically produce clearer history. The Conventional Commits specification permits types beyond `fix` and `feat`, but those additional types have no implicit SemVer effect unless they carry a breaking-change signal. A project can spend energy debating `refactor` versus `chore` without improving a single release.

### A bounded adoption recommendation

Adopt Conventional Commits when you can name the downstream automation: semantic versioning, generated release notes, or a commit linter that protects a documented workflow. Start with `fix`, `feat`, and an explicit breaking-change marker; add `docs`, `test`, or `chore` only if those categories serve a report or filter that maintainers actually use. Document examples in `CONTRIBUTING.md`, validate at the pull-request boundary, and allow an escape hatch for exceptional history migrations.

If the repository has no such consumer, use a simpler rule: an imperative subject, a useful explanation of impact, and issue links where relevant. Revisit the convention when publishing or release volume changes. The right standard is the smallest one that reliably supplies information your maintainers or automation will consume.

## Editorial QA

- **Status:** PASS.
- **Blocking issues:** None. The article covers changelog and SemVer automation, gives one realistic limitation, and ends with a concise adoption recommendation.
- **Factual checks:** Specification mappings, semantic-release capabilities, configurability, and changelog-complexity caution map to the evidence pack.
- **Resolved issues:** No fabricated citations, marketing claims, or unresolved contradictions found.

## Observable execution receipt

- Artifacts: editorial brief, evidence pack, complete article, QA report.
- Article word count target: 500–700 words (excluding brief, evidence, and QA sections).
- Required capabilities evidenced: editorial-brief, article-evidence, article-drafting, editorial-qa.
