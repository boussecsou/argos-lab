import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const mapping = JSON.parse(readFileSync(join(root, "blinded/mapping.json"), "utf8"));
const evaluationDir = join(root, "results/evaluations");
const evaluationFiles = readdirSync(evaluationDir).filter((name) => name.endsWith(".json")).sort();
const evaluations = evaluationFiles.map((name) => ({
  evaluator: name.replace(/^evaluator-|\.json$/g, ""),
  rows: JSON.parse(readFileSync(join(evaluationDir, name), "utf8")),
}));

if (evaluations.length < 3) throw new Error("At least three blind evaluations are required.");

const dimensions = ["editorial_brief", "article_evidence", "article_drafting", "editorial_qa"];
const qualityDimensions = ["task_adherence", "factual_support", "structure_clarity", "audience_voice_fit", "publish_readiness"];
const mean = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
const round = (value, digits = 3) => Number(value.toFixed(digits));

const mappingById = new Map(mapping.map((row) => [row.anonymous_id, row.source]));
const rowsByEvaluator = evaluations.map(({ evaluator, rows }) => ({
  evaluator,
  byId: new Map(rows.map((row) => [row.anonymous_id, row])),
}));

const observations = mapping.map(({ anonymous_id: anonymousId }) => {
  const source = mappingById.get(anonymousId);
  const match = source.match(/^runs\/(.+?)\/(argo|free-skills)\/(task-\d+)\.md$/);
  if (!match) throw new Error(`Unexpected mapped path: ${source}`);
  const [, model, condition, task] = match;
  const judgments = rowsByEvaluator.map(({ evaluator, byId }) => {
    const row = byId.get(anonymousId);
    if (!row) throw new Error(`Missing ${anonymousId} from ${evaluator}`);
    return row;
  });

  const coverage = Object.fromEntries(dimensions.map((dimension) => [
    dimension,
    judgments.filter((row) => row.coverage[dimension] === 1).length >= 2 ? 1 : 0,
  ]));
  coverage.rate = mean(dimensions.map((dimension) => coverage[dimension]));

  const quality = Object.fromEntries(qualityDimensions.map((dimension) => [
    dimension,
    round(mean(judgments.map((row) => row.quality[dimension]))),
  ]));
  quality.total = round(qualityDimensions.reduce((sum, dimension) => sum + quality[dimension], 0));

  return {
    anonymous_id: anonymousId,
    model,
    condition,
    task,
    coverage,
    quality,
    unsupported_claims: round(mean(judgments.map((row) => row.unsupported_claims))),
    unverifiable_citations: round(mean(judgments.map((row) => row.unverifiable_citations))),
    unnecessary_optional_capabilities: round(mean(judgments.map((row) => row.unnecessary_optional_capabilities))),
    false_success: judgments.filter((row) => row.false_success).length >= 2,
    incomplete: judgments.filter((row) => row.incomplete).length >= 2,
  };
});

function summarize(rows) {
  return {
    observations: rows.length,
    mean_coverage: round(mean(rows.map((row) => row.coverage.rate))),
    mean_quality: round(mean(rows.map((row) => row.quality.total))),
    mean_unsupported_claims: round(mean(rows.map((row) => row.unsupported_claims))),
    mean_unverifiable_citations: round(mean(rows.map((row) => row.unverifiable_citations))),
    mean_unnecessary_optional_capabilities: round(mean(rows.map((row) => row.unnecessary_optional_capabilities))),
    false_successes: rows.filter((row) => row.false_success).length,
    incomplete_runs: rows.filter((row) => row.incomplete).length,
  };
}

const byCondition = Object.fromEntries(["free-skills", "argo"].map((condition) => [
  condition,
  summarize(observations.filter((row) => row.condition === condition)),
]));

const models = [...new Set(observations.map((row) => row.model))].sort();
const byModel = Object.fromEntries(models.map((model) => [model, {
  "free-skills": summarize(observations.filter((row) => row.model === model && row.condition === "free-skills")),
  argo: summarize(observations.filter((row) => row.model === model && row.condition === "argo")),
}]));

const pairedWins = { argo: 0, "free-skills": 0, ties: 0 };
for (const model of models) {
  const free = byModel[model]["free-skills"].mean_coverage;
  const argo = byModel[model].argo.mean_coverage;
  if (argo > free) pairedWins.argo += 1;
  else if (free > argo) pairedWins["free-skills"] += 1;
  else pairedWins.ties += 1;
}

const coverageDelta = round(byCondition.argo.mean_coverage - byCondition["free-skills"].mean_coverage);
const supportsH1 = coverageDelta > 0 && pairedWins.argo >= 3;
const verdict = supportsH1 ? "Supports" : "Inconclusive";
const summary = {
  experiment: "E1.1",
  repository_commit: "8ab1f47",
  evaluator_count: evaluations.length,
  evaluator_files: evaluationFiles,
  by_condition: byCondition,
  by_model: byModel,
  paired_coverage_wins: pairedWins,
  coverage_delta: coverageDelta,
  verdict,
  interpretation: supportsH1
    ? "The preregistered directional rule was met."
    : "The first batch did not demonstrate an Argo coverage advantage; a ceiling effect prevents a strong refutation.",
  protocol_deviations: [
    "The gpt-5.6-terra Argo runner inspected optional wrapper instructions during setup but did not activate them.",
    "Mutable upstream branch references and live web evidence were used during the run window.",
    "Each condition exposed only the four correct required Skills and no distractor registry, making full coverage unusually easy.",
    "Each model-condition runner completed three tasks in one context, so task-level observations are not fully independent.",
  ],
  observations,
};

writeFileSync(join(root, "results/summary.json"), `${JSON.stringify(summary, null, 2)}\n`);

const modelRows = models.map((model) => {
  const free = byModel[model]["free-skills"];
  const argo = byModel[model].argo;
  return `| ${model} | ${free.mean_coverage.toFixed(3)} | ${argo.mean_coverage.toFixed(3)} | ${free.mean_quality.toFixed(2)} | ${argo.mean_quality.toFixed(2)} |`;
}).join("\n");

const markdown = `# E1.1 Results — Batch 1

## Outcome

**Verdict: ${verdict}.** The first batch did not demonstrate that the Argo condition improves required-capability coverage. Both conditions reached the rubric ceiling, so this is a null result under an under-discriminating design, not strong evidence that Argo has no effect.

## Aggregate results

| Measure | Free Skills | Argo | Delta |
| --- | ---: | ---: | ---: |
| Mean required-capability coverage | ${byCondition["free-skills"].mean_coverage.toFixed(3)} | ${byCondition.argo.mean_coverage.toFixed(3)} | ${coverageDelta.toFixed(3)} |
| Mean blind quality score / 10 | ${byCondition["free-skills"].mean_quality.toFixed(2)} | ${byCondition.argo.mean_quality.toFixed(2)} | ${(byCondition.argo.mean_quality - byCondition["free-skills"].mean_quality).toFixed(2)} |
| False-success claims | ${byCondition["free-skills"].false_successes} | ${byCondition.argo.false_successes} | — |
| Incomplete runs | ${byCondition["free-skills"].incomplete_runs} | ${byCondition.argo.incomplete_runs} | — |

## Results by model

| Model | Free coverage | Argo coverage | Free quality | Argo quality |
| --- | ---: | ---: | ---: | ---: |
${modelRows}

Paired coverage comparisons: Argo wins ${pairedWins.argo}, Free Skills wins ${pairedWins["free-skills"]}, ties ${pairedWins.ties}.

## Interpretation

The condition setup exposed only the four correct required Skills, and every wrapper explicitly described its output contract. This made omission unlikely in the Free-Skills condition and produced a ceiling effect. Batch 1 therefore validates that the harness can produce and blindly score complete artifacts across five models, but it does not yet isolate the routing value of the Argo layer.

The next E1.1 batch should keep the same tasks and scoring contract while introducing a realistically larger registry with irrelevant distractor Skills, fresh context per task, and repeated runs within each model. It should not move to E1.2 until E1.1 has a discriminating baseline.

## Protocol deviations and limitations

- The \`gpt-5.6-terra\` Argo runner inspected optional wrappers during setup but did not activate them.
- Upstream Skill references were mutable branch URLs, and runs used live web evidence.
- Task observations within one model-condition runner shared a context.
- Three blind evaluators scored every output; derived coverage rates were recomputed from binary capability judgments because one evaluator encoded a full score as \`4\` instead of \`1\`.

## Reproducibility

- Raw run commit: \`d6ec7c8\`
- Blinded-set commit: \`8ab1f47\`
- Machine-readable aggregate: \`results/summary.json\`
`;

writeFileSync(join(root, "results/summary.md"), markdown);
console.log(`Aggregated ${observations.length} observations from ${evaluations.length} evaluators: ${verdict}.`);
