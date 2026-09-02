# Task 03 — AI Editorial Quality Gates

## Editorial brief

- **Reader:** Technical content leads.
- **Purpose and angle:** Make an operational case for an explicit human editorial gate after AI-assisted drafting, centered on verifiability and release decisions.
- **Promise:** Provide a decision-oriented quality gate that catches factual, sourcing, structural, and confidence failures before publication.
- **Outline:** Separate sourced claims from recommendations; explain four failure modes; define a gate; provide a pre-publication checklist; set a disposition policy.
- **Length:** 500–700 words for the article.
- **Voice:** Sober, decision-oriented, precise.
- **Constraints:** Use identifiable primary sources; avoid claims that AI systems are universally inaccurate; label recommendations as editorial policy.

## Evidence pack

1. NIST AI RMF 1.0 defines trustworthy AI characteristics including validity and reliability, accountability and transparency, and explainability and interpretability; it calls for documentation and human intervention when systems cannot detect or correct errors: <https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf>.
2. NIST’s AI RMF Core says documentation supports transparency, human review, and accountability; it also calls for documented knowledge limits and human oversight: <https://airc.nist.gov/airmf-resources/airmf/5-sec-core/>.
3. NIST AI RMF 1.0 states that accuracy measurements should use realistic, representative test sets and document test methodology, and that deployed systems’ validity and reliability are assessed through ongoing testing or monitoring: <https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf>.

**Confidence and gaps:** High confidence for NIST’s framework recommendations. NIST does not prescribe an editorial workflow or claim that every AI-generated sentence is false; the gate and checklist below are editorial recommendations derived from those documentation, measurement, and oversight principles.

## Article

# The Draft Is Not the Publication: Put a Quality Gate Between AI and Readers

AI can turn an outline into a polished technical article quickly. That speed changes the bottleneck; it does not remove the editor’s obligation to decide whether the piece is ready for public use. A fluent draft can contain a wrong version number, an unsupported causal claim, a citation that does not say what the sentence implies, or a promised section that never arrived. Fluency is evidence of readable language, not evidence of truth.

The case for a gate is consistent with NIST’s AI Risk Management Framework, which treats validity and reliability, accountability and transparency, and explainability as characteristics of trustworthy AI. NIST also emphasizes documenting system knowledge limits, defining human oversight, using realistic test sets, and monitoring performance. Those are framework principles, not a claim that NIST has approved a particular content workflow. For a content team, the practical translation is simple: an AI draft must have a named reviewer and an explicit go/no-go decision.

Start with factual verification. Identify every material statement that could be checked: an API behavior, security recommendation, date, performance figure, or comparison. Test it against the cited primary documentation or a reproducible artifact. If the evidence is incomplete, narrow the wording or mark the gap. Do not let a confident tone convert an inference into a fact.

Next, verify source traceability. Each important claim should point to an identifiable source—a stable URL, document title, publisher, and relevant section or version. Read the source in context. A link that merely mentions a topic is not support for a specific number or conclusion. Keep an evidence ledger so another editor can repeat the check, and record unresolved disagreements rather than silently choosing the convenient interpretation.

Then check structural completeness. Compare the draft with its brief: intended reader, angle, promise, required sections, length, voice, examples, and constraints. A technically correct paragraph cannot compensate for a missing limitation or an article that never answers its stated question. Structural review is a separate test because factual accuracy does not guarantee editorial usefulness.

Finally, test for false confidence. Look for absolute language, invented quotations, precise figures without provenance, citations that do not resolve, and hedges that conceal a major gap. Treat “no issue found” as a review result only when the reviewer can show what was checked. If a claim cannot be verified, the correct disposition is revise, qualify, or hold—not publish because the prose sounds finished.

### Pre-publication gate

- Brief: Are reader, promise, scope, voice, and required sections explicit?
- Facts: Has each material claim been checked against an appropriate source or test?
- Sources: Can a second reviewer locate and understand the evidence for each key claim?
- Structure: Are all promised sections present, coherent, and within the requested length?
- Confidence: Are uncertainty, limitations, and editorial recommendations clearly labeled?
- Decision: Did a named editor record pass, required revisions, or hold, with blockers and their disposition?

This gate is an editorial recommendation, not a guarantee of perfect copy. It makes residual risk visible and gives the team a repeatable stopping rule. AI can accelerate drafting; accountability still belongs to the publication process.

## Editorial QA

- **Status:** PASS.
- **Blocking issues:** None. The article covers factual verification, source traceability, structural completeness, false-confidence risk, and a practical checklist.
- **Sourced claims vs recommendations:** NIST claims are identified as framework principles; the gate, evidence ledger, and checklist are explicitly labeled editorial recommendations.
- **Resolved issues:** No fabricated citations, unsupported universal claims about AI, or unresolved contradictions found.

## Observable execution receipt

- Artifacts: editorial brief, evidence pack, complete article, QA report.
- Article word count target: 500–700 words (excluding brief, evidence, and QA sections).
- Required capabilities evidenced: editorial-brief, article-evidence, article-drafting, editorial-qa.
