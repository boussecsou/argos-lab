---
name: article-drafting
description: Use to write or rewrite an article, blog post, explainer, or editorial feature from a brief, notes, or evidence pack.
metadata:
  argo-role: article-drafting
  canonical-skill: content-and-copy
  canonical-provider: Andy Dunn / RampStack
  canonical-source: https://github.com/rampstackco/claude-skills/blob/main/skills/content-and-copy/SKILL.md
  binding: reference
---

# Purpose

Independently reusable article-drafting Skill. Inside `argo-write-article` it produces `article-draft`.

# Canonical source

Provider: Andy Dunn / RampStack

Source: https://github.com/rampstackco/claude-skills/blob/main/skills/content-and-copy/SKILL.md

# Execution rule

The upstream published `SKILL.md` is authoritative when reachable.

1. Load the canonical instructions when the runtime can access them.
2. If a local `content-and-copy` Skill is already installed, use that implementation.
3. Consume `editorial-brief` and `evidence-pack` when present.
4. Draft the article in the requested language and voice.
5. Do not introduce unsourced hard facts. Point back to the evidence-pack or mark uncertainty.
6. For deep guides, reports, or case studies, pair with `long-form-structure` rather than inventing a second drafting method here.
