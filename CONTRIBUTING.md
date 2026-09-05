# Contributing to ArgoLab

Thanks for your interest in contributing. This repository hosts experimental
work on the **argo** model — reusable, modular packages of Skills organized
around a shared outcome — plus the controlled experiments used to evaluate it.
The project is explicitly experimental / pre-specification: see
[README.md](README.md) and [AGENTS.md](AGENTS.md) before contributing.

## Before you start

- Read [AGENTS.md](AGENTS.md). It is the normative guide for this repository:
  project structure, coding style, testing expectations, commit conventions,
  and public-repository safety rules. It applies to human contributors and AI
  agents alike.
- This is a **public repository**. Never commit secrets, private URLs,
  personal data, unredacted logs, or material with unclear redistribution
  rights.
- Check open [issues](../../issues) and [pull requests](../../pulls) to avoid
  duplicate work.

## How to contribute

1. **Fork** the repository and create a branch from `main`.
2. Make focused changes. Prefer small, reviewable pull requests over large
   ones that mix unrelated concerns.
3. Follow the structure and naming conventions in [AGENTS.md](AGENTS.md)
   (e.g. `argo-<destination>/` prefix for Argo packages, kebab-case paths,
   two-space indentation for JSON/JS).
4. Run the relevant checks before opening a PR:
   ```bash
   git diff --check
   node --check <any/changed/*.mjs file>
   ```
5. Write commit messages using [Conventional Commits](https://www.conventionalcommits.org/),
   for example:
   - `feat(argo-write-article): add QA fallback`
   - `test(experiment): record E1.1 runs`
   - `docs(readme): clarify package layout`
6. Open a pull request against `main` using the PR template. Explain intent,
   list validation performed, and note any deviations from an experiment's
   preregistered protocol.

## Types of contributions

- **Argo packages** (`prototypes/`): new or improved Argo packages. Each
  package needs a normative `SKILL.md` and a machine-readable `argo.json`
  that agree with each other; treat `SKILL.md` as authoritative on conflict.
- **Experiments** (`experiments/`): controlled studies comparing approaches.
  Preserve condition isolation, anonymize outputs before evaluation, and
  validate every receipt/result as JSON.
- **Documentation**: fixes and clarifications to `README.md`, `AGENTS.md`, or
  package-level docs.
- **Bug reports and questions**: open an issue using the appropriate template.

## Reporting security issues

Do not open a public issue for security vulnerabilities. See
[SECURITY.md](SECURITY.md) for how to report them responsibly.

## Code of Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). By
participating, you are expected to uphold it.
