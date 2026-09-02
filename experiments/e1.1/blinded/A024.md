# Task 03 Run Output — AI Editorial Quality Gates

## Editorial brief

- **Purpose:** Make the operational case for a named pre-publication gate in AI-assisted article production.
- **Reader:** Technical content leads accountable for accuracy, process design, and publication risk.
- **Angle:** AI can accelerate drafting, but fluent output is not evidence of factual or editorial completeness; a release decision needs traceable checks and an owner.
- **Promise:** The reader will get a decision model covering facts, sources, structure, confidence risk, and a practical checklist.
- **Outline:** State sourced risk; define what a gate controls; separate evidence-backed claims from recommended practice; provide checklist; define pass/fail ownership.
- **Length:** 500–700 words for the article body.
- **Voice:** Sober, concise, decision-oriented.
- **Constraints:** Clearly label sourced claims versus editorial recommendations; avoid claiming that human review is infallible.

## Evidence pack

| Claim | Source | Confidence |
| --- | --- | --- |
| Generative AI can confidently present false or internally inconsistent content and can fabricate supporting citations. | NIST, [AI RMF Generative AI Profile, NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), July 2024, §2.2. | High |
| NIST recommends documented fact-checking and review and verification of sources and citations in GAI outputs. | NIST AI 600-1, actions MP-2.3-003 and MS-2.5-003. | High |
| NIST says GAI use may warrant additional human review, tracking, documentation, and management oversight. | NIST AI 600-1, Appendix A.1.2. | High |
| Provenance practices can trace content origins and modifications; provenance metadata can include sources, timestamps, and changes. | NIST AI 600-1, actions GV-6.1-008 and MS-1.1-001; Appendix A.1.6. | High |

**Gaps:** NIST provides risk-management guidance, not an editorial workflow standard or proof that a particular checklist prevents every error. Structural completeness, gate ownership, severity levels, and the checklist below are editorial recommendations derived for article production. Human review can also fail and should be calibrated with incident data.

## Article

# AI Drafting Still Needs a Named Editorial Release Gate

AI can produce a polished technical article before a reviewer has finished opening the source tabs. That speed is useful, but it creates a dangerous visual shortcut: fluency looks like completion. A publication workflow needs a point where someone tests that appearance against evidence, the brief, and an explicit release standard.

Call that point the editorial quality gate. It is not a general request to “take a look.” It is a pass-or-fail decision with recorded checks, an owner, and a rule that blocking defects stop publication.

## What the sources establish

NIST defines generative-AI “confabulation” as confidently presented false or erroneous content, including outputs that contradict the prompt or earlier output. Its Generative AI Profile also warns that generated logic and citations can themselves be fabricated, increasing the chance that people trust a false answer ([NIST AI 600-1, §2.2](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)). Confidence of presentation is therefore not a factual signal.

The same profile recommends deploying and documenting fact-checking techniques when AI-generated information may draw from multiple or unknown sources (action MP-2.3-003). It separately calls for reviewing and verifying sources and citations in generated outputs (MS-2.5-003). For governance, NIST notes that generative-AI use may warrant additional human review, tracking, documentation, and management oversight (Appendix A.1.2).

Traceability is distinct from correctness. NIST describes provenance mechanisms as ways to trace the origin and history of content, and recommends records of changes that include sources, timestamps, and metadata. A source trail makes a claim auditable; the editor must still decide whether the source actually supports it.

Those are sourced risk-management claims. The gate design below is an editorial recommendation for technical publishing, not a requirement stated by NIST.

## Recommended gate design

First, verify facts at claim level. Extract names, numbers, dates, quotations, product behavior, and causal assertions. Open the cited source, confirm that it exists, prefer the primary record, and check that its scope and date match the prose. Remove or qualify claims that cannot be supported. “The model supplied a link” is not verification.

Second, preserve source traceability. Maintain a compact claim-to-source ledger through drafting, including unresolved gaps and the origin of any figures or quotations. The final article need not expose internal workflow metadata, but every material factual claim should be recoverable by the reviewer.

Third, test structural completeness against the approved brief. Check the promised reader, angle, sections, constraints, counterpoints, and action. AI drafts often have grammatical transitions between sections that never actually answer a required question. Smooth flow cannot compensate for a missing argument.

Finally, counter false confidence with explicit outcomes. Use **pass**, **pass with non-blocking edits**, or **fail**. Record the reason. A reviewer who cannot establish support for a consequential claim should fail the piece, not average that defect against strong style.

## Pre-publication checklist

- **Facts:** Have all names, numbers, dates, quotations, and product claims been checked against authoritative sources?
- **Support:** Does each citation support the exact sentence, without overstating population, timeframe, or causality?
- **Traceability:** Can the reviewer move from every material claim to a stable source and identify remaining gaps?
- **Structure:** Does the draft deliver every promise and required section in the brief, with a useful opening and decisive close?
- **Confidence:** Were fluent but unsupported assertions, fabricated references, and hidden uncertainty removed or labeled?
- **Decision:** Are blocking issues listed, assigned, resolved, and rechecked by a named gate owner?

The gate does not make editors infallible. It makes the publication decision inspectable. For technical content leads, that is the minimum control needed when drafting speed exceeds verification speed.

## QA report

**Verdict: PASS — publishable.**

| Gate | Result | Notes |
| --- | --- | --- |
| Brief adherence | Pass | Factual verification, traceability, structural completeness, false confidence, checklist, audience, and voice are present. |
| Factual and citation review | Pass | Sourced claims are confined to NIST guidance and separated explicitly from editorial recommendations. |
| Structure and clarity | Pass | Evidence precedes the recommended operating model; the checklist implements the four requested risk areas. |
| AI-content audit and voice | Pass | No invented metrics, quotes, organizations, or universal effectiveness claims; uncertainty is stated. |

**Blocking issue found:** The first provenance formulation risked suggesting that traceability proves a claim true. **Resolution:** The article now says provenance makes a claim auditable while correctness still requires editorial judgment. **Remaining blocking issues:** None.
