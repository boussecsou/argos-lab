# Task 02 — Conventional Commits

## Editorial brief

- **Reader:** Maintainers of small public repositories with limited release and review capacity.
- **Angle:** Conventional Commits are useful when a machine will consume commit intent; they are ceremony when the repository has no dependable consumer for that metadata.
- **Promise:** Connect the format to automated changelogs and SemVer, surface a realistic limitation, and recommend a proportionate adoption path.
- **Outline:** Define the convention; explain automation and SemVer mapping; show where it helps; describe a limitation; give an adoption recommendation.
- **Length:** 500–700 words for the article body.
- **Voice:** Sober, practical, non-promotional.
- **Constraints:** Prefer the official specification and primary tool documentation; include one realistic limitation and a concise recommendation; avoid marketing language.

## Evidence pack

1. The Conventional Commits specification describes a lightweight convention that makes it easier to build automated tools and maps `fix`, `feat`, and breaking changes to SemVer levels. Source: *Conventional Commits 1.0.0*, https://www.conventionalcommits.org/en/v1.0.0/. **Confidence: high.**
2. The specification permits types beyond `fix` and `feat`, and says additional types have no implicit SemVer effect unless they include a breaking-change marker. Source: https://www.conventionalcommits.org/en/v1.0.0/. **Confidence: high.**
3. semantic-release states that it uses commit messages to determine the next semantic version, generate a changelog, and publish a release. Source: *semantic-release README*, https://semantic-release.gitbook.io/semantic-release. **Confidence: high.**
4. semantic-release documents `analyzeCommits` as determining the release type and `generateNotes` as generating release notes. Source: *Plugins*, https://semantic-release.gitbook.io/semantic-release/usage/plugins. **Confidence: high.**
5. SemVer defines MAJOR for incompatible API changes, MINOR for backward-compatible functionality, and PATCH for backward-compatible bug fixes; released contents must not be modified in place. Source: *Semantic Versioning 2.0.0*, https://semver.org/. **Confidence: high.**

**Gap disclosure:** Tool behavior depends on configuration, parser preset, repository history, and human classification. The recommendation is editorial guidance; the sources do not guarantee that a commit convention will produce correct releases without review.

## Article

# Conventional Commits: automation when the metadata has a job

Commit messages are part of a repository’s interface. Conventional Commits adds a small, machine-readable structure: `type(scope): description`, with optional body and footers. The official specification calls it a lightweight convention and connects `fix`, `feat`, and `BREAKING CHANGE` to PATCH, MINOR, and MAJOR changes in Semantic Versioning (SemVer). The value is not the punctuation. It is making intent available to people and tools in a predictable place.

That metadata pays off when a small repository has a repeatable release path. A tool can classify changes since the last release, draft release notes, and select a candidate version. semantic-release documents this division explicitly: its commit analyzer determines the release type, its release-notes generator creates notes, and the system can publish the release. SemVer supplies the meaning of the resulting number: MAJOR for incompatible API changes, MINOR for backward-compatible functionality, and PATCH for backward-compatible bug fixes.

For a public library, that chain can remove several manual steps. A maintainer reviewing `fix(parser): reject empty input` can understand the intent quickly. A release bot can group fixes and features in a changelog, while a `!` marker or `BREAKING CHANGE` footer flags work that deserves migration notes. The repository gains a searchable history as a side effect. These are useful outcomes when consumers depend on release notes or when one person must maintain releases without reconstructing every change from pull requests.

The convention is less useful when nothing consumes it. If releases are infrequent, versions are chosen after a human review, and the changelog is a short hand-written summary, enforcing a grammar on every commit can become ceremony. The specification allows additional types such as `docs`, `test`, and `chore`, but those types have no implicit SemVer effect. Adding more labels does not automatically add more information. A repository can spend review time debating whether a change is `refactor` or `chore` without improving a user’s understanding of the release.

There is also a realistic limitation: commit text is an imperfect proxy for impact. A maintainer can label a breaking change as `fix`, omit a footer, or squash several unrelated changes into one vague message. A parser will faithfully automate the wrong input. Generated notes therefore need a release review, especially when public APIs, security fixes, or data migrations are involved. Conventional Commits organizes intent; it does not discover intent.

### A proportionate adoption recommendation

Adopt the core format if the repository publishes a library, maintains a changelog, or plans automated versioning. Define only the types your tooling uses, document one or two examples, and validate at the commit or pull-request boundary. Keep human review for release classification and notes. If the project has no release automation and little external consumption, make the convention optional: use clear imperative messages and introduce stricter parsing only when a concrete workflow needs it.

The test is simple: name the consumer before adding the rule. If a changelog generator, SemVer release bot, or future maintainer will use the metadata, Conventional Commits can be a compact interface. If there is no consumer, consistency may still help, but it is a preference—not an automation strategy.

## Editorial QA report

- **Status:** PASS — publishable after QA.
- **Blocking issues:** None. The article explains the automation/SemVer relationship, gives a realistic limitation, and ends with a concise adoption recommendation.
- **Factual checks:** Specification, semantic-release stages, and SemVer meanings are linked to primary documentation. Claims about human review and classification limits are clearly presented as operational analysis.
- **Structural/voice checks:** Complete article in a sober maintainer-oriented voice; no marketing claims, fabricated citations, or invented quotations.
- **Required capabilities evidenced:** editorial-brief, article-evidence, article-drafting, editorial-qa.
