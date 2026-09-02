# Task 03 — AI Editorial Quality Gates

## Editorial brief

- **Reader:** Technical content leads who oversee AI-assisted drafting for engineering audiences.
- **Angle:** AI assistance can accelerate drafting, but publication is a separate risk decision that needs a visible human-owned quality gate.
- **Promise:** Give leaders a concrete gate covering factual verification, source traceability, structural completeness, and false-confidence risk.
- **Outline:** Explain why fluent output is not approval; cover four checks; distinguish sourced claims from recommendations; provide a pre-publication checklist and decision rule.
- **Length:** 500–700 words for the article body.
- **Voice:** Sober, decision-oriented, and operational.
- **Constraints:** Prefer authoritative sources; include a practical checklist; clearly label sourced claims versus editorial recommendations; avoid claiming that any model or process guarantees accuracy.

## Evidence pack

1. NIST defines “confabulation” as generative-AI systems confidently presenting erroneous or false content, including fabricated citations, and notes the risk is relevant to open-ended long-form responses. Source: *AI RMF: Generative AI Profile*, NIST, https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf. **Confidence: high.**
2. NIST’s profile recommends documenting model details, assumptions, limitations, data provenance, data quality, and evaluation data. Source: *AI RMF: Generative AI Profile*, NIST, https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=958388. **Confidence: high.**
3. UNESCO’s guidance for generative AI in education and research says outputs require human input and critical evaluation before use. Source: *Guidance for generative AI in education and research*, UNESCO, https://unesdoc.unesco.org/in/rest/annotationSVC/DownloadWatermarkedAttachment/attach_import_d4cbd94b-e183-448f-90a9-ea9bb3b74db2?_=386693eng.pdf&from=1&to=48. **Confidence: high.**
4. Google’s developer documentation guidance recommends descriptive headings, logical hierarchy, clear language, and scannable structure. Source: *Headings and titles*, Google for Developers, https://developers.google.com/style/headings. **Confidence: high.**

**Gap disclosure:** These sources establish risks and guidance, not a universal editorial scoring system or a guarantee that human review catches every error. The checklist and publication rule below are editorial recommendations.

## Article

# AI-assisted drafts still need a publication gate

AI can turn a brief into a polished technical article in minutes. That speed changes the bottleneck; it does not remove it. Publication is a decision about whether readers can safely rely on the piece. Fluency is evidence that text is readable, not evidence that its claims are true, traceable, complete, or appropriate for the audience.

**Sourced claim:** NIST’s Generative AI Profile calls confident false output “confabulation.” It includes fabricated citations and contradictions, and NIST notes that the risk is especially relevant to open-ended, long-form responses. **Editorial implication:** a confident paragraph must enter a review queue, even when it sounds like a familiar expert.

The first gate is factual verification. Break the draft into checkable claims: version numbers, dates, performance figures, quotations, causal statements, and instructions. Verify each against the primary source or a source appropriate to the claim. Test commands where practical. Record whether a claim is confirmed, narrowed, or removed. Do not let a plausible detail survive merely because it would be inconvenient to rewrite.

The second gate is source traceability. A link at the end of an article is not a map. Every material factual claim should point to an identifiable source, with enough context for a reviewer to locate the support. Distinguish what the source says from the article’s interpretation. If evidence is missing, disclose the gap or turn the sentence into a bounded recommendation. NIST separately recommends documenting assumptions, limitations, data provenance, data quality, and evaluation data; the same discipline makes an article’s provenance inspectable.

The third gate is structural completeness. Compare the draft with its brief: audience, promise, required sections, examples, length, and constraints. Check that the introduction establishes scope and that headings lead readers through a logical argument. Google’s documentation guidance recommends descriptive headings and a proper hierarchy, while its accessibility guidance favors clear, direct, scannable writing. These are not cosmetic checks: a missing caveat or a buried limitation can change how a technical reader acts.

The fourth gate is false-confidence control. Look for absolute language, unsupported precision, invented quotations, and citations that do not actually support the sentence. Ask a subject-matter reviewer to challenge the strongest claim, not merely proofread the prose. UNESCO’s guidance says generative-AI output needs human input and critical evaluation before use. Treat that as an accountability boundary: the content lead owns the publication decision, regardless of who or what produced the first draft.

### Pre-publication checklist

- List every material factual claim and mark its source, status, and reviewer.
- Open each citation; confirm that it supports the exact nearby claim.
- Remove or label unsupported numbers, quotes, dates, and causal language.
- Compare the draft with the brief and check required sections, examples, scope, and length.
- Read headings and transitions for a logical, scannable structure.
- Run technical instructions in a safe environment or label them untested.
- Obtain an accountable human sign-off and record unresolved risks.

**Editorial recommendation:** publish only when no blocking factual or structural issue remains, and disclose material uncertainty. A quality gate should be short enough to run every time, explicit enough to audit, and empowered to stop publication. AI assistance earns its place by reducing drafting effort; the gate protects the reader from mistaking that efficiency for editorial judgment.

## Editorial QA report

- **Status:** PASS — publishable after QA.
- **Blocking issues:** None. The article covers factual verification, source traceability, structural completeness, and false-confidence risk, includes a practical checklist, and labels sourced claims versus editorial recommendations.
- **Factual checks:** NIST, UNESCO, and Google guidance are cited directly. The article does not claim that the checklist guarantees accuracy.
- **Structural/voice checks:** Decision-oriented structure, complete requested scope, and sober tone; no invented studies, quotations, or citations.
- **Required capabilities evidenced:** editorial-brief, article-evidence, article-drafting, editorial-qa.
