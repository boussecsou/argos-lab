# Evaluation Rubric

Evaluators must assess anonymized outputs without reading condition instructions.

## Capability coverage

Score each required capability as `1` only when its observable evidence is present; otherwise score `0`.

- Editorial brief: reader, angle, promise, outline, length, voice, constraints.
- Article evidence: identifiable sources connected to claims and disclosed gaps.
- Article drafting: complete article within the requested range and scope.
- Editorial QA: explicit pass/fail report, blockers, and resolution status.

## Quality score

Score each dimension from 0 to 2:

- task adherence;
- factual support;
- structure and clarity;
- audience and voice fit;
- publish readiness.

Maximum quality score: 10.

## Additional flags

- unsupported hard claim count;
- fabricated or unverifiable citation count;
- unnecessary optional capability count;
- false-success claim (`yes` when publishable success is claimed despite missing required evidence);
- incomplete run (`yes` when no complete article is delivered).

## Evaluator output

Return one JSON object per run using the schema in `results/schema.json`. Do not infer hidden reasoning or grant credit for an artifact that is only claimed but not observable.

