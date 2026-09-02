---
name: editorial-brief
description: Use to create or audit a per-piece editorial brief before writing an article.
metadata:
  argo-role: editorial-brief
  canonical-skill: content-brief-authoring
  canonical-provider: Andy Dunn / RampStack
  canonical-source: https://github.com/rampstackco/claude-skills/blob/main/skills/content-brief-authoring/SKILL.md
  binding: reference
---

# Purpose

Independently reusable editorial-brief Skill. Inside `argo-write-article` it produces `editorial-brief`.

# Canonical source

Provider: Andy Dunn / RampStack

Source: https://github.com/rampstackco/claude-skills/blob/main/skills/content-brief-authoring/SKILL.md

# Execution rule

The upstream published `SKILL.md` is authoritative when reachable.

1. Load the canonical instructions when the runtime can access them.
2. If a local `content-brief-authoring` Skill is already installed, use that implementation.
3. Capture purpose, reader, angle, promise, outline, length, voice, and constraints.
4. Consume `audience-notes` and existing source material when present.
5. A user-supplied brief that already contains those fields may satisfy this capability without a rewrite.
