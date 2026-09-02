# Task 03 — AI Editorial Quality Gates

## Editorial brief

- **Reader:** Technical content leads responsible for AI-assisted production.
- **Angle:** A quality gate converts generated prose into an accountable publication decision.
- **Promise:** Define what the gate must check and provide a concise, operational checklist.
- **Outline:** State the risk; separate verification from fluency; cover traceability and structure; propose a gate.
- **Length:** 500–700 words for the article body.
- **Voice:** Sober, decision-oriented.
- **Constraints:** Cover factual verification, source traceability, structural completeness, and false confidence; separate sourced claims from editorial recommendations.

## Evidence pack

| Claim | Source | Confidence | Gap / use |
| --- | --- | --- | --- |
| NIST describes generative-AI confabulation as confidently presenting erroneous or false content, including citations that can mislead people. | [NIST AI 600-1, *Generative AI Profile*](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | High | Supports the false-confidence risk; it is not a measurement of any specific model or workflow. |
| NIST’s AI RMF calls for documented, repeatable test, evaluation, verification, and validation processes, and for human-oversight processes to be defined and documented. | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | High | A risk-management framework, not an editorial standard. |
| Documentation can support transparency, human review, and accountability. | [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | High | Supports provenance and decision recording. |

## Article draft

# AI-Assisted Articles Still Need an Editorial Quality Gate

AI can shorten the path from notes to readable prose. It cannot, by itself, make a publication decision. A polished draft can have a logical outline, confident citations, and an authoritative tone while remaining wrong, incomplete, or untraceable. For a technical content lead, that is the reason to put an explicit editorial quality gate between generation and publication.

The central risk is false confidence. NIST’s Generative AI Profile uses the term “confabulation” for systems that generate and confidently present erroneous or false content. It specifically notes that generated citations or explanations can further mislead people into trusting an incorrect answer. Fluency is therefore not a verification signal. It is a presentation property.

An editorial gate makes the publication decision inspectable. It names the reviewer, the checks performed, the sources accepted, the exceptions allowed, and the outcome: publish, revise, or stop. This is compatible with NIST’s broader AI risk-management guidance, which calls for documented, repeatable test, evaluation, verification, and validation processes, as well as defined human-oversight processes. Those documents are not an editorial playbook; the following controls are editorial recommendations derived for content operations.

## What the gate should test

**Factual verification.** Separate externally checkable statements from analysis and recommendations. For each consequential factual claim, a reviewer should open the cited primary source, confirm that it supports the wording, and check the source’s date and scope. Claims that cannot be verified should be removed, narrowed, or plainly labeled as uncertain. A link that resolves is not enough: it may point to a summary, a different version, or a source that never made the asserted claim.

**Source traceability.** Keep a compact evidence record: claim, source title, publisher, date, URL or identifier, and reviewer status. This enables a later editor to answer “where did this come from?” without reverse-engineering the model’s draft. NIST notes that documentation can enhance transparency, improve human review, and bolster accountability—an operational reason to preserve the evidence record rather than leave citations as decoration.

**Structural completeness.** Review the draft against its brief, not only its sentences. Does it answer the promised question? Are required sections, caveats, examples, and the intended audience present? Does the conclusion match the evidence rather than introduce a new claim? A source-correct article can still fail because it omits the decision criteria a reader needed.

**False-confidence signals.** Escalate unusually precise figures, untraceable quotations, sweeping comparisons, and citations the reviewer cannot locate. Also flag prose that sounds certain while the evidence pack records ambiguity. The correct repair may be a smaller claim, not a more persuasive paragraph.

## Pre-publication checklist

1. The article has an approved brief and every promised section is present.
2. Each material factual claim maps to a reviewed, identifiable source.
3. Sources support the exact wording, date range, and context used.
4. Unsupported claims, quotations, and statistics are removed or disclosed as uncertainty.
5. A named editor records pass, revision, or stop, with remaining risks.

The gate need not turn every post into a compliance exercise. Its depth should reflect consequence: product documentation, regulated topics, and executive thought leadership merit stricter review than a low-risk internal update. But it should always exist. AI can draft; accountable people must decide whether the result deserves publication.

## QA report

**Result: PASS.**

- The body is a complete article of approximately 627 words and uses the requested sober, decision-oriented voice.
- NIST factual claims are traceable to the cited profile and RMF Core in the evidence pack. The article expressly labels the workflow controls as editorial recommendations rather than claims mandated by NIST.
- Factual verification, source traceability, structural completeness, false-confidence risk, and a practical checklist are all present.
- Blocking issues found: none. No performance statistics, fabricated citations, or claims about a particular model were introduced.
