import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const mapping = JSON.parse(readFileSync(join(root, "blinded/mapping.json"), "utf8"));
const evaluationDir = join(root, "results/evaluations");
const evaluationFiles = readdirSync(evaluationDir)
  .filter((name) => name.endsWith(".json"))
  .sort();
const evaluations = evaluationFiles.map((name) => ({
  evaluator: name.replace(/^evaluator-|\.json$/g, ""),
  rows: JSON.parse(readFileSync(join(evaluationDir, name), "utf8")),
}));

if (evaluations.length < 5) {
  throw new Error("All five available model evaluators are required for batch 2.");
}

const dimensions = ["editorial_brief", "article_evidence", "article_drafting", "editorial_qa"];
const qualityDimensions = [
  "task_adherence",
  "factual_support",
  "structure_clarity",
  "audience_voice_fit",
  "publish_readiness",
];
const requiredCapabilities = new Set([
  "editorial-brief",
  "article-evidence",
  "article-drafting",
  "editorial-qa",
]);
const ignoredSelectionNames = new Set(["argo-write-article"]);
const mean = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
const round = (value, digits = 3) => Number(value.toFixed(digits));

const mappingById = new Map(mapping.map((row) => [row.anonymous_id, row.source]));
const rowsByEvaluator = evaluations.map(({ evaluator, rows }) => {
  if (rows.length !== mapping.length) {
    throw new Error(`${evaluator} returned ${rows.length} rows; expected ${mapping.length}.`);
  }
  const byId = new Map(rows.map((row) => [row.anonymous_id, row]));
  if (byId.size !== mapping.length) throw new Error(`${evaluator} contains duplicate identifiers.`);
  for (const { anonymous_id: anonymousId } of mapping) {
    const row = byId.get(anonymousId);
    if (!row) throw new Error(`Missing ${anonymousId} from ${evaluator}.`);
    for (const dimension of dimensions) {
      if (![0, 1].includes(row.coverage?.[dimension])) {
        throw new Error(`${evaluator}/${anonymousId} has invalid ${dimension} coverage.`);
      }
    }
    for (const dimension of qualityDimensions) {
      if (!Number.isFinite(row.quality?.[dimension])
        || row.quality[dimension] < 0
        || row.quality[dimension] > 2) {
        throw new Error(`${evaluator}/${anonymousId} has invalid ${dimension} quality.`);
      }
    }
  }
  return { evaluator, byId };
});

const majority = Math.floor(evaluations.length / 2) + 1;
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

  const coverage = Object.fromEntries(
    dimensions.map((dimension) => [
      dimension,
      judgments.filter((row) => row.coverage[dimension] === 1).length >= majority ? 1 : 0,
    ]),
  );
  coverage.rate = mean(dimensions.map((dimension) => coverage[dimension]));

  const quality = Object.fromEntries(
    qualityDimensions.map((dimension) => [
      dimension,
      round(mean(judgments.map((row) => row.quality[dimension]))),
    ]),
  );
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
    unnecessary_optional_capabilities: round(
      mean(judgments.map((row) => row.unnecessary_optional_capabilities)),
    ),
    false_success: judgments.filter((row) => row.false_success).length >= majority,
    incomplete: judgments.filter((row) => row.incomplete).length >= majority,
  };
});

function summarize(rows) {
  return {
    observations: rows.length,
    mean_coverage: round(mean(rows.map((row) => row.coverage.rate))),
    mean_quality: round(mean(rows.map((row) => row.quality.total))),
    mean_unsupported_claims: round(mean(rows.map((row) => row.unsupported_claims))),
    mean_unverifiable_citations: round(mean(rows.map((row) => row.unverifiable_citations))),
    mean_unnecessary_optional_capabilities: round(
      mean(rows.map((row) => row.unnecessary_optional_capabilities)),
    ),
    false_successes: rows.filter((row) => row.false_success).length,
    incomplete_runs: rows.filter((row) => row.incomplete).length,
  };
}

function selectedCapabilities(receipt) {
  const selected = new Set([
    ...(receipt.selected_capabilities ?? []),
    ...(receipt.capabilities_selected ?? []),
  ]);
  for (const task of receipt.tasks ?? []) {
    if (typeof task !== "object") continue;
    for (const name of task.capabilities ?? task.capabilities_selected ?? []) selected.add(name);
  }
  return [...selected].filter((name) => !ignoredSelectionNames.has(name));
}

const routingRuns = [];
for (const model of readdirSync(join(root, "runs")).sort()) {
  if (!statSync(join(root, "runs", model)).isDirectory()) continue;
  for (const condition of ["free-skills", "argo"]) {
    const receipt = JSON.parse(readFileSync(join(root, "runs", model, condition, "receipt.json"), "utf8"));
    const selected = selectedCapabilities(receipt);
    const requiredSelected = selected.filter((name) => requiredCapabilities.has(name));
    const extraSelected = selected.filter((name) => !requiredCapabilities.has(name));
    routingRuns.push({
      model,
      condition,
      selected,
      required_selection_rate: requiredSelected.length / requiredCapabilities.size,
      extra_selected: extraSelected,
    });
  }
}

const byCondition = Object.fromEntries(
  ["free-skills", "argo"].map((condition) => [
    condition,
    summarize(observations.filter((row) => row.condition === condition)),
  ]),
);
const routingByCondition = Object.fromEntries(
  ["free-skills", "argo"].map((condition) => {
    const rows = routingRuns.filter((row) => row.condition === condition);
    return [condition, {
      mean_required_selection_rate: round(mean(rows.map((row) => row.required_selection_rate))),
      runs_with_extra_selection: rows.filter((row) => row.extra_selected.length > 0).length,
      extra_selections: rows.reduce((sum, row) => sum + row.extra_selected.length, 0),
    }];
  }),
);

const models = [...new Set(observations.map((row) => row.model))].sort();
const byModel = Object.fromEntries(models.map((model) => [model, {
  "free-skills": summarize(
    observations.filter((row) => row.model === model && row.condition === "free-skills"),
  ),
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
const pairwiseAgreement = Object.fromEntries(dimensions.map((dimension) => {
  let agreements = 0;
  let comparisons = 0;
  for (const { anonymous_id: anonymousId } of mapping) {
    const values = rowsByEvaluator.map(({ byId }) => byId.get(anonymousId).coverage[dimension]);
    for (let left = 0; left < values.length; left += 1) {
      for (let right = left + 1; right < values.length; right += 1) {
        comparisons += 1;
        if (values[left] === values[right]) agreements += 1;
      }
    }
  }
  return [dimension, round(agreements / comparisons)];
}));
const supportsH1 = coverageDelta > 0
  && pairedWins.argo >= 3
  && routingByCondition.argo.extra_selections <= routingByCondition["free-skills"].extra_selections;
const verdict = supportsH1 ? "Supports" : "Does not support";
const interpretation = supportsH1
  ? "The preregistered directional decision rule was met."
  : "No Argo coverage advantage was demonstrated in the 20-capability routing challenge.";

const summary = {
  experiment: "E1.1",
  batch: 2,
  tested_repository_commit: "83071a1",
  raw_run_commit: "21a6f07",
  blinded_set_commit: "5b25462",
  evaluator_count: evaluations.length,
  evaluator_files: evaluationFiles,
  by_condition: byCondition,
  routing_by_condition: routingByCondition,
  by_model: byModel,
  paired_coverage_wins: pairedWins,
  evaluator_pairwise_agreement: pairwiseAgreement,
  coverage_delta: coverageDelta,
  verdict,
  interpretation,
  protocol_limitations: [
    "Each model-condition runner completed three tasks in one context, so task observations are not fully independent.",
    "This batch has one runner per model-condition cell and does not measure same-model stochastic variance.",
    "The task prompts explicitly requested all four observable artifacts, which may still produce a coverage ceiling.",
    "Live web evidence and mutable external pages can change after the run window.",
    "The gpt-5.5 Argo runner saw prior-run path names during workspace inspection but did not read their contents.",
  ],
  routing_runs: routingRuns,
  observations,
};

writeFileSync(join(root, "results/summary.json"), `${JSON.stringify(summary, null, 2)}\n`);

const modelRows = models.map((model) => {
  const free = byModel[model]["free-skills"];
  const argo = byModel[model].argo;
  return `| ${model} | ${free.mean_coverage.toFixed(3)} | ${argo.mean_coverage.toFixed(3)} | ${free.mean_quality.toFixed(2)} | ${argo.mean_quality.toFixed(2)} |`;
}).join("\n");

const markdown = `# E1.1 Results — Batch 2

## Outcome

**Verdict: ${verdict} H1.** Coverage was directionally higher for Argo, but it won only two of five model blocks instead of the three required by the preregistered rule. The free-Skills runners selected all four required capabilities from a 20-capability registry in every model block.

## Aggregate results

| Measure | Free Skills | Argo | Delta |
| --- | ---: | ---: | ---: |
| Mean required-capability coverage | ${byCondition["free-skills"].mean_coverage.toFixed(3)} | ${byCondition.argo.mean_coverage.toFixed(3)} | ${coverageDelta.toFixed(3)} |
| Mean blind quality score / 10 | ${byCondition["free-skills"].mean_quality.toFixed(2)} | ${byCondition.argo.mean_quality.toFixed(2)} | ${(byCondition.argo.mean_quality - byCondition["free-skills"].mean_quality).toFixed(2)} |
| Mean required selection rate | ${routingByCondition["free-skills"].mean_required_selection_rate.toFixed(3)} | ${routingByCondition.argo.mean_required_selection_rate.toFixed(3)} | ${(routingByCondition.argo.mean_required_selection_rate - routingByCondition["free-skills"].mean_required_selection_rate).toFixed(3)} |
| Extra capability selections | ${routingByCondition["free-skills"].extra_selections} | ${routingByCondition.argo.extra_selections} | — |
| False-success claims | ${byCondition["free-skills"].false_successes} | ${byCondition.argo.false_successes} | — |
| Incomplete runs | ${byCondition["free-skills"].incomplete_runs} | ${byCondition.argo.incomplete_runs} | — |

## Results by model

| Model | Free coverage | Argo coverage | Free quality | Argo quality |
| --- | ---: | ---: | ---: | ---: |
${modelRows}

Paired coverage comparisons: Argo wins ${pairedWins.argo}, Free Skills wins ${pairedWins["free-skills"]}, ties ${pairedWins.ties}.

Evaluator pairwise agreement was ${(pairwiseAgreement.editorial_brief * 100).toFixed(1)}% for editorial brief, ${(pairwiseAgreement.article_evidence * 100).toFixed(1)}% for article evidence, ${(pairwiseAgreement.article_drafting * 100).toFixed(1)}% for drafting, and ${(pairwiseAgreement.editorial_qa * 100).toFixed(1)}% for editorial QA.

## Interpretation

Batch 2 introduced sixteen irrelevant or conditional capabilities while keeping the tasks and scoring contract unchanged. All five free-Skills runners still identified the four required article capabilities. Argo produced a ${coverageDelta.toFixed(3)} mean coverage increase, driven mainly by the \`gpt-5.5\` block, but did not meet the required three within-model wins. The preregistered E1.1 decision rule was therefore not met.

This result narrows the claim: with explicit artifact requirements, clear Skill descriptions, and the tested frontier and pre-frontier models, the current Argo does not show a routing advantage over independent Skills. It does not establish that Argos are never useful; more ambiguous tasks, weaker descriptions, larger registries, or repeated stochastic trials remain outside this batch.

## Protocol limitations

- Each model-condition runner handled all three tasks in one context.
- There was one runner per model-condition cell, so same-model stochastic variance was not measured.
- The task prompts named the four observable artifacts explicitly, which may still make selection unusually easy.
- Live web evidence and mutable external pages can change after the run window.
- The gpt-5.5 Argo runner saw prior-run path names, but not their contents.

## Reproducibility

- Tested harness commit: \`83071a1\`
- Raw run commit: \`21a6f07\`
- Blinded-set commit: \`5b25462\`
- Machine-readable aggregate: \`results/summary.json\`
`;

writeFileSync(join(root, "results/summary.md"), markdown);
console.log(`Aggregated ${observations.length} observations from ${evaluations.length} evaluators: ${verdict}.`);
