---
name: long-form-structure
description: Use for deep dives, definitive guides, research reports, whitepapers, case studies, and long tutorials that need a stronger architecture than a standard article.
metadata:
  argo-role: long-form-structure
  canonical-skill: long-form-content-frameworks
  canonical-provider: Andy Dunn / RampStack
  canonical-source: https://github.com/rampstackco/claude-skills/blob/main/skills/long-form-content-frameworks/SKILL.md
  binding: reference
---

# Purpose

Independently reusable long-form structure Skill. Inside `argo-write-article` it shapes the brief or draft architecture when the piece is substantial.

# Canonical source

Provider: Andy Dunn / RampStack

Source: https://github.com/rampstackco/claude-skills/blob/main/skills/long-form-content-frameworks/SKILL.md

# Execution rule

The upstream published `SKILL.md` is authoritative when reachable.

1. Load the canonical instructions when the runtime can access them.
2. If a local `long-form-content-frameworks` Skill is already installed, use that implementation.
3. Skip this member for short explainers and standard blog posts.
4. Do not replace `article-drafting`. Structure first, then draft with the drafting Skill.
