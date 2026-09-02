# The Missing Step in AI-Assisted Publishing: An Editorial Quality Gate

AI can turn a brief into fluent prose quickly. That speed changes where editorial work is spent; it does not remove the work. A quality gate is the explicit decision point between “the model produced a draft” and “this article is safe and useful to publish.” It should be owned by a person who can stop release, request evidence, and identify which requirements remain unmet. Spellcheck and a pleasant tone are not a gate.

## What the evidence says

**Factual verification comes first.** Break the draft into checkable claims: dates, numbers, definitions, causal explanations, product behavior, quotations, and comparisons. Check each claim against the source rather than asking another model whether the paragraph “sounds right.” Verify the source’s scope and date, and downgrade or remove claims that the source does not support. A model may write a plausible synthesis that is broader than its evidence. That is an editorial defect even when every individual sentence is grammatical.

**Source traceability makes checking repeatable.** Keep an evidence ledger alongside the draft. For every consequential claim, record the source title, publisher or author, publication date, URL or document identifier, and the relevant page or section. Store the exact figure or a short attributed excerpt when needed; otherwise record a paraphrase in your own words. Do not accept citations merely because they look scholarly. NIST’s Generative AI Profile warns that systems can produce confident errors and even citations that appear to justify an answer. A reviewer must be able to open the source and retrace the claim.

**Structural completeness is separate from factuality.** Compare the draft with the approved brief: intended reader, promise, required sections, examples, length, tone, and exclusions. Check that the introduction makes the promised argument, headings form a useful progression, and the conclusion answers the reader’s decision. A factually correct article can still fail because it omitted the limitation or checklist that made the piece worth commissioning. This check is a contract test against the brief, not a model preference about style.

**Fluency creates false confidence.** NIST defines “confabulation” as generated content that is false or erroneous yet presented confidently, and notes that open-ended, long-form responses are especially exposed. In a 2024 NAACL study, Guan and colleagues found substantial factuality problems in their human evaluation and argued for dedicated verification. Their result is evidence about that study and setup, not a universal error rate for every model or prompt. The practical implication is narrower and more useful: confidence, polish, and a citation-shaped footnote are not evidence.

## Editorial recommendation

Use this pre-publication checklist:

1. **Brief:** Is the audience, promise, length, voice, and required structure still visible in the draft?
2. **Claims:** Has every nontrivial factual claim been checked against an authoritative source?
3. **Traceability:** Can a second editor locate each source and the exact passage supporting the claim?
4. **Labels:** Are sourced facts, reasoned synthesis, open questions, and editorial recommendations clearly distinguished?
5. **Structure:** Are all promised sections present, internally consistent, and in an order that serves the reader?
6. **Risk:** Have unsupported precision, invented quotations, stale information, and confident uncertainty been removed or qualified?
7. **Decision:** Did a named editor record pass, revise-and-recheck, or do-not-publish—and why?

The risk statements above summarize the cited evidence; the checklist, review ownership, and release decision are editorial recommendations. Keeping that distinction visible prevents a policy from masquerading as a research finding. AI can accelerate drafting; the gate is how an organization decides that acceleration has not lowered its standard.

## Sources

- [NIST AI 600-1: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), National Institute of Standards and Technology, section 2.2.
- [Language Models Hallucinate, but May Excel at Fact Verification](https://aclanthology.org/2024.naacl-long.62/), Guan et al., NAACL 2024.
