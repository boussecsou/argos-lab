# Argos Documentation

This folder is the planned home for the normative Argo specification
documentation, mirrored from the project's internal documentation source of
truth (see [AGENTS.md](../AGENTS.md) for the canonical Notion path). It is
currently a placeholder: most sections below have not been written yet.

The documentation is organized progressively:

1. **Overview & Status** — entry point; current experimental status and
   what E1.1 (see [experiments/e1.1/](../experiments/e1.1/)) established vs.
   left open.
2. **Foundations & Concepts** — the core argo model: an argo groups
   independent Skills around a shared, reusable class of outcome, without
   absorbing their internal methods.
3. **Argo `SKILL.md` Specification** — normative structure of the root
   `SKILL.md` file.
4. **Package Architecture & Distribution** — the two package forms:
   *embedded* (member Skills included in the package) and *referential*
   (Skills referenced from outside it).
5. **Members, Resolution & Runtime** — how member Skills are declared and
   how a runtime is expected to use them.
6. **Authoring Guide** — practical guidance for building a new Argo package;
   see also [prototypes/](../prototypes/) for worked examples.
7. **Examples, Patterns & Anti-patterns**.
8. **Compatibility & Interoperability** — how Argo packages relate to other
   Skill/agent systems.
9. **Evaluation & Evidence** — claims kept strictly tied to experimental
   results (starting with E1.1).
10. **Evolution & Governance** — how the specification changes over time,
    accepted decisions, and open questions.

## Status

The argo model is experimental and pre-specification. Claims about quality,
routing, portability, or efficiency must stay tied to evidence produced in
[experiments/](../experiments/). See [README.md](../README.md) for the
current repository-level summary.
