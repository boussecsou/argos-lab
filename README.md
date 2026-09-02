# ArgoLab

Public experiments and reference packages for **Argos**: reusable packages of independently executable Skills organized around one concrete Destination.

An Argo is not a domain catalogue and not a rigid workflow. Its root contract describes the result to reach, the capabilities that belong together, participation rules, and resolution semantics; the runtime retains control over execution order and mechanics.

## Repository layout

```text
prototypes/
  argo-write-article/       # Produce a publishable, evidence-backed article
  argo-resolve-hard-bug/    # Diagnose, fix, test, and review a difficult defect
```

Each package centers on:

- `SKILL.md` — normative local contract for human and agent use.
- `argo.json` — machine-readable manifest that must agree with `SKILL.md`.
- `skills/` — embedded member Skills when a package ships them.
- `references/` — supporting material loaded only when useful.

## Status

This repository and the Argo model are experimental. They are intended to be tested across tasks and runtimes before being represented as a mature standard.

## Contributing

Read [AGENTS.md](AGENTS.md) before changing the repository. It covers public-repository safety, Argo authoring constraints, Conventional Commits, and direct Notion source-of-truth links.
