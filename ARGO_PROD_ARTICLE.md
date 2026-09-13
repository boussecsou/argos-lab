# argo-prod-article

This is a standalone, pure-Markdown rendering of the complete Embedded Argo package in `prototypes/argo-prod-article/`. It includes the composition, every member Skill, and the licenses carried by adapted third-party material.

## Package Tree

```text
argo-prod-article/
├── SKILL.md
└── skills/
    ├── brainstorming/SKILL.md
    ├── editing/
    │   ├── LICENSE
    │   └── SKILL.md
    ├── linkedin-adaptation/SKILL.md
    ├── research/SKILL.md
    ├── substack-adaptation/SKILL.md
    ├── writing/
    │   ├── LICENSE
    │   └── SKILL.md
    ├── x-adaptation/SKILL.md
    └── zero-ai-slop/
        ├── LICENSE
        └── SKILL.md
```

## `SKILL.md` — Composition

```markdown
---
name: argo-prod-article
description: Produce a complete, high-quality article ready for its intended use. Use for article-production tasks that may call for evidence, editorial development, drafting, review, publication-specific adaptation, or a more natural final voice, while retaining independent capabilities that can be selected for the concrete outcome.
---

# Destination

Produce a complete, high-quality article ready for its intended use.

The user's concrete task can specialize this Destination, for example by requesting evidence-backed, technical, scientific, audience-specific, or publication-specific work. Decide which member Skills are relevant to that task and how to use them; this package does not prescribe an execution order.

# Participation

Select only the member Skills that materially contribute to the concrete task and its working Destination. No member Skill is mandatory by default.

Skip Skills that are irrelevant, and skip work that is already sufficiently satisfied by the user's provided context. Use one or several Skills as needed.

Adapt the execution order to the task and evolving context. Do not interpret the order of the member list as an execution sequence.

Stop when the requested Destination is honestly satisfied. This package does not prescribe a fixed workflow.

`Flexible` is an experimental label for this participation model in this package; the behavior above is authoritative.

# Member Skills

## research

- Role: Gathers, verifies, and organizes information that can support the article.
- Path: `skills/research/SKILL.md`

## brainstorming

- Role: Develops and assesses distinct, evidence-sustainable editorial angles for an article.
- Path: `skills/brainstorming/SKILL.md`

## writing

- Role: Transforms the available information and user requirements into a complete article aligned with the requested outcome.
- Path: `skills/writing/SKILL.md`

## editing

- Role: Reviews and improves the article for clarity, coherence, quality, and readiness for its intended use.
- Path: `skills/editing/SKILL.md`

## x-adaptation

- Role: Adapts an article or its ideas for an X post or thread when X is the intended channel.
- Path: `skills/x-adaptation/SKILL.md`

## linkedin-adaptation

- Role: Adapts an article or its ideas for the requested LinkedIn format and professional audience.
- Path: `skills/linkedin-adaptation/SKILL.md`

## substack-adaptation

- Role: Adapts an article for Substack as an email-and-web publication experience.
- Path: `skills/substack-adaptation/SKILL.md`

## zero-ai-slop

- Role: Removes generic, synthetic-sounding writing patterns while preserving the article's meaning and voice.
- Path: `skills/zero-ai-slop/SKILL.md`
```

## `skills/research/SKILL.md`

```markdown
---
name: research
description: Gather, verify, and organize traceable information that supports an article or other written work.
---

# Capability

Develop reliable, usable research for an article or other written work, including technical, scientific, professional, and evidence-backed topics.

# Method

Use the practices that fit the request:

- Define the scope, central question, audience-relevant context, and information needed before gathering material.
- Prefer primary or authoritative sources for central claims; use strong secondary sources for explanation and context; treat tertiary material as leads rather than sufficient evidence.
- Check that time-sensitive information is current, and cross-check claims whose error would materially affect the article.
- Keep sources and citations traceable. Record what each useful source supports and any meaningful credibility or applicability limit.
- Separate directly supported facts from interpretations, inferences, contradictions, and unresolved uncertainty.
- Organize findings around the article's likely claims, questions, examples, counterarguments, and evidence gaps so they can be used without rediscovery.

Do not fill gaps with plausible-sounding assertions. State when further research, specialist review, or access to a primary source is needed.
```

## `skills/brainstorming/SKILL.md`

```markdown
---
name: brainstorming
description: Develop and assess distinct editorial angles for an article before or alongside drafting.
---

# Capability

Develop evidence-sustainable article ideas, angles, and thesis options without requiring a complete draft.

# Method

Use the questions that clarify the task:

- What subject, problem, or change matters here? What central question should the article help a reader answer?
- Who is the audience, what do they already know, and what should they understand, decide, or do differently afterwards?
- What claim, tension, assumption, evidence, counterargument, or uncertainty could sustain a useful article?
- Which angles are obvious, which are underexplored, and which can be supported responsibly with available or attainable evidence?

Generate genuinely distinct angles rather than alternate phrasings of one idea. Assess each against relevance to the intended use, originality, audience usefulness, availability of supporting evidence, counterarguments, and its ability to sustain a full article.

When useful, express an angle as a working question, a provisional thesis, the evidence it would need, competing explanations, and unresolved uncertainty. Deliver a short set of viable options with their trade-offs; it can stand alone or be used as input to a writer.
```

## `skills/writing/SKILL.md`

```markdown
---
name: writing
description: Develop a complete article from a brief, research materials, or source notes while serving its intended reader and purpose.
---

# Capability

Write a complete article that serves the requested reader, purpose, and context.

# Method

Use the relevant practices below to develop the piece:

- Establish the brief: intended reader, outcome, format, publication context, point of view, and constraints.
- Choose a central claim or through-line that the available material can support. Give the reader a reason to continue early, without overstating the article's promise.
- Shape a structure that lets each section earn its place: introduce the question or tension, develop the argument or explanation, use evidence and examples where they clarify, and end with an appropriate conclusion or next step.
- Build ideas rather than merely listing them. Make the relationship between claims, evidence, examples, and implications understandable to the intended reader.
- Match the voice, terminology, sentence complexity, and level of detail to the audience and intended use.
- Treat research materials faithfully. Do not invent facts, citations, quotations, expertise, or certainty; make material uncertainty visible when it matters.

This Skill creates and develops the draft. Use a dedicated editing capability when the task calls for a fuller quality review or revision pass.

## Provenance

- Upstream: `content-and-copy`
- Source: https://github.com/rampstackco/claude-skills/blob/main/skills/content-and-copy/SKILL.md
- License: MIT
- Modified: yes
- Adaptation: Distilled the upstream content-development guidance into a reusable article-drafting Skill; removed its fixed workflow, pre-publish checklist, and editing responsibilities.
```

## `skills/writing/LICENSE`

```text
MIT License

Copyright (c) 2026 RampStack Co.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## `skills/editing/SKILL.md`

```markdown
---
name: editing
description: Review and improve an article for clarity, coherence, precision, and readiness for its intended use.
---

# Capability

Improve an existing article so it is clear, coherent, and appropriate for its intended use.

# Method

Review the article against its purpose, audience, format, and available evidence. Apply the checks that are relevant:

- Improve the argument, explanatory order, section purpose, and transitions when they obstruct comprehension.
- Remove ambiguity, repetition, unsupported precision, and unnecessary jargon; make terms and claims as clear as the audience needs.
- Strengthen coherence at paragraph and sentence level, including rhythm, emphasis, readability, and a tone suited to the publication context.
- Preserve the author's intended meaning, substantiated claims, citations, quotations, and recognizable voice unless a change is requested or clearly necessary.
- Flag factual, contextual, or evidentiary issues that cannot be resolved from the material. Do not silently replace uncertainty with invented certainty.

This Skill performs general editorial review. A separate voice-focused Skill can be used when the specific task is to remove generic or synthetic-sounding patterns.

## Provenance

- Upstream: `copy-editing`
- Source: https://github.com/coreyhaines31/marketingskills/blob/main/skills/copy-editing/SKILL.md
- License: MIT
- Modified: yes
- Adaptation: Reframed the upstream marketing copy sweeps as general article editing; removed conversion, CTA, and persona-specific requirements.
```

## `skills/editing/LICENSE`

```text
MIT License

Copyright (c) 2025 Corey Haines

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## `skills/x-adaptation/SKILL.md`

```markdown
---
name: x-adaptation
description: Adapt an article or its ideas into an X post or thread that is clear, concise, and appropriate to the requested audience.
---

# Capability

Adapt source material into an X post or thread without treating the platform as a substitute for the original article.

# Method

Determine whether one post, a thread, or a short set of variants best serves the request. Preserve the source's central claim and important qualifications while adapting:

- the opening so the subject and reader value are apparent quickly;
- information density, length, and segmentation so each post can stand on its own and the sequence remains easy to follow;
- wording, rhythm, and readability for the intended audience;
- any conclusion, link, prompt, or call to action to the user's actual purpose.

Do not invent evidence or convert a qualified claim into a stronger one for attention. Platform features and distribution behavior change: verify any format-specific or algorithmic claim against current official X guidance or the native interface before relying on it.

# Current Platform Guidance

- https://help.x.com/en/using-x
```

## `skills/linkedin-adaptation/SKILL.md`

```markdown
---
name: linkedin-adaptation
description: Adapt an article or its ideas for a LinkedIn post, article, or newsletter and its professional audience.
---

# Capability

Adapt source material to the requested LinkedIn format while preserving its substance, evidence, and professional relevance.

# Method

First establish whether the user needs a post, article, newsletter, or more than one format. Adapt the material for that format through:

- an opening that makes the professional relevance and reader value clear;
- a structure, sectioning, and paragraph length that support mobile reading and the intended depth;
- a credible, audience-appropriate tone that avoids empty authority or overclaiming;
- a conclusion and, when useful, a prompt or call to action aligned with the article's real purpose.

Retain relevant context, caveats, and source attribution rather than turning an article into unsupported thought leadership. Verify feature-specific recommendations against current official LinkedIn guidance when they matter to the result.

# Current Platform Guidance

- https://www.linkedin.com/help/linkedin/answer/a517940/linkedin-newsletters-best-practices?lang=en
- https://www.linkedin.com/help/linkedin/answer/a517914/newsletters-on-linkedin-faq?lang=en
```

## `skills/substack-adaptation/SKILL.md`

```markdown
---
name: substack-adaptation
description: Adapt an article for Substack as a coherent email-and-web publication experience.
---

# Capability

Adapt an article for a Substack publication while accounting for both inbox reading and web reading.

# Method

Preserve the article's purpose and voice while adapting the elements that matter to the requested publication:

- the relationship between title, subject line when applicable, and opening;
- the article's long-form structure, sectioning, and reading rhythm;
- context for readers who encounter the issue without prior knowledge;
- the author-reader relationship, publication framing, and any invitation to continue, reply, subscribe, or share.

Keep the experience useful whether read as an email or on the web. Do not make unsupported assumptions about Substack features, delivery, or discovery; verify time-sensitive product behavior in current official guidance when it affects the draft.

# Current Platform Guidance

- https://substack.com/resources
- https://substack.com/get-started
- https://support.substack.com/hc/en-us/articles/360037825111-How-do-I-create-a-publication-on-Substack
```

## `skills/zero-ai-slop/SKILL.md`

```markdown
---
name: zero-ai-slop
description: Remove generic, synthetic-sounding writing patterns while preserving the article's facts, meaning, voice, and intended effect.
---

# Capability

Make an existing article read more specifically, naturally, and humanly without rewriting its substance or simulating a particular person.

# Method

Review the draft for patterns that flatten its voice or make it feel mechanically generated, such as generic framing, vague abstractions, repetitive transitions, inflated significance, formulaic conclusions, needless headings, excessive parentheticals, or predictable rhetorical templates.

Replace only what needs changing. Favor concrete language, varied but purposeful sentence rhythm, transitions that reflect the actual logic, and details already supported by the source material. Preserve facts, figures, citations, quotations, names, technical terminology, meaningful uncertainty, and the author's recognizable voice.

Flag text whose correction would require new facts, a different editorial position, or an imitation of a living writer. Do not fabricate personal experience, specificity, or evidence merely to make prose seem more human.

This Skill targets synthetic-sounding patterns. Use general editing when the task also requires structural, argumentative, or publication-readiness review.

## Provenance

- Upstream: `humanize-text`
- Source: https://github.com/smyrick/skills/blob/main/skills/humanize-text/SKILL.md
- License: MIT
- Modified: yes
- Adaptation: Recast the upstream humanization guidance as a concise, article-focused Skill and removed its optional pattern reference to keep this first experimental package small.
```

## `skills/zero-ai-slop/LICENSE`

```text
MIT License

Copyright (c) 2026 Shane Myrick

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
