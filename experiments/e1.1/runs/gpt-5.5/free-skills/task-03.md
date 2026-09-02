# Task 03 Output - AI Editorial Quality Gates

## Editorial Brief

- Purpose: Explain why AI-assisted article workflows need explicit editorial quality gates.
- Reader: Technical content leads responsible for publishing accurate, sourced technical material.
- Angle: AI can accelerate drafting, but publication risk concentrates at the handoff from plausible draft to verified article.
- Promise: The reader will get a sober case for factual verification, source traceability, structural completeness, false-confidence control, and a practical checklist.
- Outline: Separate sourced claims from editorial recommendations; describe factual and provenance risks; define the gate; checklist; decision-oriented close.
- Length: 500-700 words.
- Voice: Sober, decision-oriented.
- Constraints: Include practical pre-publication checklist; clearly separate sourced claims from recommendations; use identifiable sources; disclose gaps.

## Evidence Pack

Likely claims and sources:

- NIST's AI RMF is intended to help organizations manage AI risks and improve trustworthy use of AI systems. Source: NIST, "AI Risk Management Framework," https://www.nist.gov/itl/ai-risk-management-framework
- NIST's Generative AI Profile is a companion resource for applying the AI RMF to generative AI risks. Source: NIST, "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile," https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence
- W3C PROV describes provenance as information about entities, activities, and people involved in producing data or things, useful for judging quality, reliability, and trustworthiness. Source: W3C, "PROV Model Primer," https://www.w3.org/TR/prov-primer/
- OpenAI Help states ChatGPT can produce incorrect or misleading outputs, including fabricated citations, and recommends verifying important information from reliable sources. Source: OpenAI Help Center, "Does ChatGPT tell the truth?", https://help.openai.com/en/articles/8313428
- OpenAI research describes hallucinations as plausible but false statements and notes that confident errors remain a challenge for language models. Source: OpenAI, "Why language models hallucinate," https://openai.com/index/why-language-models-hallucinate/

Unresolved gaps: The sources support the need for verification, provenance, and risk management. The specific gate design below is an editorial recommendation, not a quoted standard.

## Article

# AI Drafts Still Need an Editorial Quality Gate

## What the sources support

AI-assisted writing changes the speed of technical publishing, not the responsibility for what gets published. NIST's AI Risk Management Framework is intended to help organizations manage AI risks and improve trustworthy use of AI systems. Its Generative AI Profile extends that risk-management lens to generative systems. OpenAI's own user guidance says ChatGPT can produce incorrect or misleading outputs, including fabricated citations, and that important information should be verified against reliable sources. OpenAI research also describes hallucinations as plausible but false statements, including confident errors. W3C's provenance work gives content teams a useful vocabulary for another requirement: readers and reviewers need enough information about the entities, activities, and people behind an output to judge its trustworthiness.

Those source-backed points are enough to justify a gate between "AI-assisted draft" and "publishable article." The risk is not that AI is uniquely unusable. The risk is that a fluent draft can look finished before the factual, structural, and attribution work is finished.

Factual verification is the first gate function. Technical articles often contain version behavior, API constraints, benchmark claims, compatibility statements, security recommendations, and quotes from documentation. A model may summarize those well, but it may also blend old behavior with new behavior or invent a source-shaped sentence. Editors need to verify the claims that would change a reader's decision.

Source traceability is the second function. A draft with links is not automatically sourced. Each material claim should map to an identifiable source, preferably primary documentation, specifications, release notes, standards, or maintainer statements. If the source only supports a narrower claim, the article should narrow the sentence. If no source exists, the article should label the point as experience-based opinion or remove it.

Structural completeness is the third function. AI drafts can satisfy the visible topic while missing the promised job. A guide may explain a concept but omit prerequisites. A comparison may list tradeoffs without giving a decision rule. A post written for engineering leaders may drift into beginner definitions. The gate should compare the draft against the brief, not merely check grammar.

False-confidence risk is the fourth function. The dangerous article is not the visibly rough one; it is the confident one with unsupported specifics. A sober gate rewards uncertainty where uncertainty is warranted. "This varies by provider" may be more publishable than a crisp but false universal rule.

## Editorial recommendations

Use this pre-publication checklist before any AI-assisted technical article ships:

1. Identify every claim that affects a reader's technical decision.
2. Attach a primary source to each material factual claim, or mark it as editorial judgment.
3. Verify citations manually: title, publisher, date or version where available, and URL.
4. Compare the draft with the brief for audience, promise, required sections, and exclusions.
5. Test code, commands, calculations, and configuration snippets in an appropriate environment, or disclose that they are illustrative.
6. Remove fabricated, inaccessible, or weakly related sources.
7. Add uncertainty language where the evidence is partial or ecosystem-specific.
8. Require a pass/fail editorial QA note before publication, including unresolved issues.

The quality gate should be explicit, short, and mandatory. It does not need a committee. It needs an owner, a checklist, and the authority to stop publication. AI can help produce a better first draft. The editorial gate decides whether that draft has earned a reader's trust.

## QA Report

Status: Pass.

Checks:

- Editorial brief complete: Pass. Reader, angle, promise, outline, length, voice, purpose, and constraints are explicit.
- Evidence traceability: Pass. Claims map to NIST, W3C, and OpenAI sources; recommendations are separated from sourced claims.
- Article completeness: Pass. Complete 500-700 word article delivered with factual verification, source traceability, structural completeness, false-confidence risk, and checklist.
- Blocking issues: None found.
- Resolved issues: No blocking issues required repair.

## Execution Receipt

- Artifacts produced: editorial brief, evidence pack, article draft, QA report.
- Required capabilities used: editorial-brief, article-evidence, article-drafting, editorial-qa.
- Optional capabilities used: none.
- Article word count: 563.
