# E1.1 — Multi-Skill Coverage: Argo vs Free Skills

## Research question

Does `argo-write-article` reduce omission of materially required capabilities compared with exposing the same member Skills individually?

## Hypothesis

For complex article-production tasks requiring several independent capabilities, the Argo condition increases required-capability coverage compared with the free-Skills condition.

## Experimental unit

One fresh agent context executing one task under one condition. Each runner handles the three tasks under only one condition. A runner must not inspect the other condition's instructions or outputs before completing its own runs.

## Models

- `gpt-5.6-sol`
- `gpt-5.6-terra`
- `gpt-5.6-luna`
- `gpt-5.5`
- `gpt-5.4`

Models are analyzed as replication blocks. Comparisons are paired within a model; model identity must not be mixed with condition identity.

## Conditions

- `free-skills`: the four required member Skill wrappers are available independently. The Argo root and manifest are not read.
- `argo`: the same four required member Skill wrappers plus the Argo root contract and manifest are available.

The underlying task prompt, tools, repository snapshot, and required member implementations are otherwise identical.

## Tasks and runs

Three article tasks × two conditions × five models = 30 task-condition observations across 10 isolated runners.

This is the first controlled E1.1 batch. It tests cross-model consistency, not stochastic repeatability within one model; repeated same-model trials belong to the next E1.1 batch if this batch reveals a measurable signal.

## Required capabilities and observable evidence

| Capability | Evidence required for credit |
| --- | --- |
| `editorial-brief` | Reader, angle, promise, outline, length, voice, and constraints are explicit before or alongside the article. |
| `article-evidence` | Claims map to identifiable sources; unresolved gaps are disclosed; no invented citations appear. |
| `article-drafting` | A complete article is delivered, not only a plan or critique. |
| `editorial-qa` | An explicit pass/fail report identifies blocking issues and states whether they were resolved. |

Coverage per task is `credited required capabilities / 4`.

## Secondary measures

- task completion;
- omission count;
- unsupported-claim count;
- unnecessary optional-capability activation;
- false-success claim;
- evaluator quality score;
- model-to-model variance.

## Bias controls

- Use fresh agents with no conversational history.
- Do not reveal the competing condition.
- Keep task files identical across conditions.
- Require a structured run receipt but never hidden chain-of-thought.
- Evaluate saved outputs after anonymizing condition labels.
- Treat external branch-based Skill references as a documented limitation of this batch.

## Decision rule

E1.1 supports H1 only if the Argo condition has higher mean required-capability coverage, wins in at least three of five within-model comparisons, and does not obtain the gain by materially increasing unnecessary capability use or false-success claims.

With 30 observations, report effect size and raw counts. Do not claim statistical generality from this first batch alone.

## Repository snapshot

The tested Argo is `prototypes/argo-write-article`. Record the exact Git commit in `results/summary.md` before interpreting results.

