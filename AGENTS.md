# Agent instructions for ArgoLab

## Repository purpose

ArgoLab is a public repository for reusable **Argo** packages. An Argo groups independently reusable Skills around one concrete Destination. The root `SKILL.md` in each package is the normative human-readable contract; `argo.json` is its machine-readable projection.

Current package layout:

```text
prototypes/
  argo-<destination>/
    SKILL.md        # normative Argo contract
    argo.json       # machine-readable manifest
    skills/         # embedded member Skills, when applicable
    references/     # progressively disclosed supporting material
```

Keep package paths stable. Do not move, rename, or flatten an Argo without updating its manifest, internal references, and documentation in the same change.

## Public-repository safety

This is a public GitHub repository. Treat every tracked file, commit message, diff, issue, and release artifact as publicly visible.

- Never add credentials, tokens, passwords, private URLs, personal data, customer data, or unredacted logs.
- Use `.env.example` with clearly fake placeholders for configuration examples; never commit a real `.env`.
- Redact secrets from commands, test fixtures, screenshots, examples, provenance, and generated artifacts.
- Do not copy material whose redistribution rights are unclear.
- Before committing, inspect `git diff --check`, `git status --short`, and the staged diff. Remove accidental binaries, archives, and generated files unless they are intentional release artifacts.

## Commit convention

Use Conventional Commits for every commit:

```text
<type>(optional-scope): imperative summary
```

Examples:

```text
feat(argo-write-article): add editorial QA fallback
fix(argo-resolve-hard-bug): clarify required review evidence
docs: document public contribution safeguards
chore: add repository ignore rules
```

Allowed types include `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `build`, `ci`, and `perf`. Keep the summary concise and imperative. Add `!` only for a breaking change, and explain it in the commit body.

## Argo authoring rules

- Every Argo name uses the `argo-` prefix; member Skills must not.
- Organize an Argo around one **Destination**, never merely a broad domain.
- Keep member Skills independently reusable; do not duplicate their execution method into the root Argo contract.
- Prefer the smallest coherent capability set.
- `execution: hard` requires every `required: true` member to contribute materially; it does not require a fixed sequence.
- Keep progressive disclosure: load only selected member Skills and their needed resources.
- When `SKILL.md` and `argo.json` conflict, follow and repair `SKILL.md` first.

## `/init` / Notion source-of-truth map

At initialization, use these direct Notion identifiers before performing a workspace-wide search. They are the canonical entry points for the Argos project:

```text
Argos Project
  page ID: 3cfeba09-656f-8094-90c8-e2f63a93b2bb
  URL: https://app.notion.com/p/3cfeba09656f809490c8e2f63a93b2bb

Argos Documentation
  page ID: 3caeba09-656f-8002-91ac-faa0ce6a3524
  URL: https://app.notion.com/p/3caeba09656f800291acfaa0ce6a3524
```

Fetch `Argos Project` first for project status and linked artifacts. Fetch `Argos Documentation` directly for the full conceptual model, current decisions, experiments, and next steps. Search Notion only when these pages do not answer the question or when looking for newly created related records.

The Notion documentation is experimental, not a public standard. Do not present its hypotheses as settled specifications without clearly labeling them as proposed or validated by tests.
