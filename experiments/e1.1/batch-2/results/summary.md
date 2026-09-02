# E1.1 Results — Batch 2

## Outcome

**Verdict: Does not support H1.** Coverage was directionally higher for Argo, but it won only two of five model blocks instead of the three required by the preregistered rule. The free-Skills runners selected all four required capabilities from a 20-capability registry in every model block.

## Aggregate results

| Measure | Free Skills | Argo | Delta |
| --- | ---: | ---: | ---: |
| Mean required-capability coverage | 0.483 | 0.600 | 0.117 |
| Mean blind quality score / 10 | 9.29 | 9.40 | 0.11 |
| Mean required selection rate | 1.000 | 1.000 | 0.000 |
| Extra capability selections | 0 | 1 | — |
| False-success claims | 0 | 0 | — |
| Incomplete runs | 0 | 0 | — |

## Results by model

| Model | Free coverage | Argo coverage | Free quality | Argo quality |
| --- | ---: | ---: | ---: | ---: |
| gpt-5.4 | 0.417 | 0.500 | 9.20 | 9.27 |
| gpt-5.5 | 0.500 | 1.000 | 8.93 | 9.60 |
| gpt-5.6-luna | 0.500 | 0.500 | 9.47 | 9.53 |
| gpt-5.6-sol | 0.500 | 0.500 | 9.53 | 9.47 |
| gpt-5.6-terra | 0.500 | 0.500 | 9.33 | 9.13 |

Paired coverage comparisons: Argo wins 2, Free Skills wins 0, ties 3.

Evaluator pairwise agreement was 100.0% for editorial brief, 62.7% for article evidence, 100.0% for drafting, and 94.0% for editorial QA.

## Interpretation

Batch 2 introduced sixteen irrelevant or conditional capabilities while keeping the tasks and scoring contract unchanged. All five free-Skills runners still identified the four required article capabilities. Argo produced a 0.117 mean coverage increase, driven mainly by the `gpt-5.5` block, but did not meet the required three within-model wins. The preregistered E1.1 decision rule was therefore not met.

This result narrows the claim: with explicit artifact requirements, clear Skill descriptions, and the tested frontier and pre-frontier models, the current Argo does not show a routing advantage over independent Skills. It does not establish that Argos are never useful; more ambiguous tasks, weaker descriptions, larger registries, or repeated stochastic trials remain outside this batch.

## Protocol limitations

- Each model-condition runner handled all three tasks in one context.
- There was one runner per model-condition cell, so same-model stochastic variance was not measured.
- The task prompts named the four observable artifacts explicitly, which may still make selection unusually easy.
- Live web evidence and mutable external pages can change after the run window.
- The gpt-5.5 Argo runner saw prior-run path names, but not their contents.

## Reproducibility

- Tested harness commit: `83071a1`
- Raw run commit: `21a6f07`
- Blinded-set commit: `5b25462`
- Machine-readable aggregate: `results/summary.json`
