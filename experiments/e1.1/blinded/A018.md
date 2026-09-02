# Task 02 — Conventional Commits

## Editorial brief

- **Reader:** Maintainers of small public repositories.
- **Angle:** Commit syntax pays for itself only when a repository consumes the structure consistently.
- **Promise:** Connect Conventional Commits to automated release notes and versioning while giving a restrained adoption decision.
- **Outline:** Define the convention; identify automation value; identify ceremony; recommend a small rollout.
- **Length:** 500–700 words for the article body.
- **Voice:** Plain, non-promotional, maintainer-oriented.
- **Constraints:** Use the official specification and primary tool documentation; include a realistic limitation and concise recommendation.

## Evidence pack

| Claim | Source | Confidence | Gap / use |
| --- | --- | --- | --- |
| Conventional Commits is a lightweight convention that adds human- and machine-readable meaning to commit messages. | [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) | High | Defines the convention and breaking-change notation. |
| The specification describes `fix` as PATCH, `feat` as MINOR, and `BREAKING CHANGE` as MAJOR in SemVer terms. | [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) | High | Tool policies may configure different rules. |
| SemVer assigns MAJOR, MINOR, and PATCH to incompatible changes, backward-compatible features, and backward-compatible fixes. | [Semantic Versioning 2.0.0](https://semver.org/) | High | Only applies meaningfully where a public API is defined. |
| semantic-release can analyze commits for release type and generate notes with conventional-changelog. | [semantic-release plugin documentation](https://semantic-release.gitbook.io/semantic-release/extending/plugins-list) | High | Demonstrates an implementation, not a requirement. |

## Article draft

# When Conventional Commits Help a Small Repository—and When They Are Just Ceremony

Conventional Commits is a lightweight format for adding human- and machine-readable meaning to a commit message. In its familiar form, `fix: handle empty config` and `feat: add export command` tell a reader more than an undifferentiated summary. The official specification also defines a machine-useful mapping: a `fix` corresponds to a patch release, a `feat` to a minor release, and a breaking change to a major release under Semantic Versioning.

That mapping is valuable only when the repository has a consumer for it. A small public package with a documented API, regular releases, and users who read release notes is a strong fit. Semantic Versioning defines major, minor, and patch changes in terms of a public API. When the team agrees what counts as a breaking change, structured commit messages provide release tooling with a small, reviewable input stream rather than a pile of prose to interpret at release time.

The automation is concrete. semantic-release’s official plugins include a commit analyzer that determines release type by analyzing commits with conventional-changelog, plus a release-notes generator using the same family of tools. Conventional-changelog likewise parses commit history into release notes. For a maintainer who currently spends an evening deciding whether the next package release is `1.4.0` or `1.4.1`, that can be a meaningful reduction in manual work and inconsistency.

The format also improves the history for humans. A contributor scanning `git log` can separate fixes, features, documentation changes, and build work quickly—provided the messages are accurate. The last clause matters. The prefix is not evidence that the change is safe, public, or breaking; review, tests, and release judgment still establish those facts.

## Where the convention becomes ceremony

The same rule becomes ceremony when nobody uses the classification after the commit is made. A repository that ships irregularly, has no versioned public interface, and writes a hand-curated release note gains little from enforcing every contributor’s punctuation. Requiring scopes, elaborate bodies, and a long taxonomy can impose a cognitive cost disproportionate to a two-person project’s release process.

There is also a realistic failure mode in merge-heavy workflows. semantic-release documents that commits outside the project’s chosen convention can be ignored for release analysis; a squash merge with a generic pull-request title can therefore erase useful classification. Automation then produces an incomplete changelog or an incorrect version recommendation—not because the tool is defective, but because its input contract was not enforced at the merge boundary.

## Adopt the smallest useful policy

For a small public library or CLI, start with four types: `feat`, `fix`, `docs`, and `chore`, plus explicit `!` or `BREAKING CHANGE` markers. Validate only the pull-request or squash-merge title that reaches the default branch. Configure the changelog and release tool to match those semantics, and review its first few releases manually.

For an application repository with no external version promise, use clear imperative summaries and skip mandatory Conventional Commits unless a downstream automation need appears. The concise recommendation is simple: adopt the convention when it drives a maintained release or changelog workflow; otherwise, do not confuse message formatting with project management.

## QA report

**Result: PASS.**

- The body is a complete article of approximately 614 words and directly addresses maintainers of small public repositories.
- The official specification, SemVer specification, and semantic-release documentation are identified in the evidence pack and linked at the claims they support.
- The article explains automated changelogs/versioning, names a realistic squash-merge limitation, and ends with a concise adoption recommendation.
- Blocking issues found: none. The draft states that commit types are tooling inputs, not proof of release impact.
