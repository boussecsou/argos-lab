# E1.1 Results — Batch 1

## Outcome

**Verdict: Inconclusive.** The first batch did not demonstrate that the Argo condition improves required-capability coverage. Both conditions reached the rubric ceiling, so this is a null result under an under-discriminating design, not strong evidence that Argo has no effect.

## Aggregate results

| Measure | Free Skills | Argo | Delta |
| --- | ---: | ---: | ---: |
| Mean required-capability coverage | 1.000 | 1.000 | 0.000 |
| Mean blind quality score / 10 | 9.73 | 9.60 | -0.13 |
| False-success claims | 1 | 1 | — |
| Incomplete runs | 0 | 0 | — |

## Results by model

| Model | Free coverage | Argo coverage | Free quality | Argo quality |
| --- | ---: | ---: | ---: | ---: |
| gpt-5.4 | 1.000 | 1.000 | 9.11 | 9.67 |
| gpt-5.5 | 1.000 | 1.000 | 10.00 | 9.56 |
| gpt-5.6-luna | 1.000 | 1.000 | 10.00 | 9.11 |
| gpt-5.6-sol | 1.000 | 1.000 | 10.00 | 10.00 |
| gpt-5.6-terra | 1.000 | 1.000 | 9.56 | 9.67 |

Paired coverage comparisons: Argo wins 0, Free Skills wins 0, ties 5.

## Interpretation

The condition setup exposed only the four correct required Skills, and every wrapper explicitly described its output contract. This made omission unlikely in the Free-Skills condition and produced a ceiling effect. Batch 1 therefore validates that the harness can produce and blindly score complete artifacts across five models, but it does not yet isolate the routing value of the Argo layer.

The next E1.1 batch should keep the same tasks and scoring contract while introducing a realistically larger registry with irrelevant distractor Skills, fresh context per task, and repeated runs within each model. It should not move to E1.2 until E1.1 has a discriminating baseline.

## Protocol deviations and limitations

- The `gpt-5.6-terra` Argo runner inspected optional wrappers during setup but did not activate them.
- Upstream Skill references were mutable branch URLs, and runs used live web evidence.
- Task observations within one model-condition runner shared a context.
- Three blind evaluators scored every output; derived coverage rates were recomputed from binary capability judgments because one evaluator encoded a full score as `4` instead of `1`.

## Reproducibility

- Raw run commit: `d6ec7c8`
- Blinded-set commit: `8ab1f47`
- Machine-readable aggregate: `results/summary.json`
