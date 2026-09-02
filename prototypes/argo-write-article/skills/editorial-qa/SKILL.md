---
name: editorial-qa
description: Use for pre-publish editorial QA of an article including factual, voice, structure, and quality review.
metadata:
  argo-role: editorial-qa
  canonical-skill: editorial-qa
  canonical-provider: Andy Dunn / RampStack
  canonical-source: https://github.com/rampstackco/claude-skills/blob/main/skills/editorial-qa/SKILL.md
  binding: reference
---

# Purpose

Independently reusable editorial QA Skill. Inside `argo-write-article` it produces `qa-report` and is required before claiming the article is publishable.

# Canonical source

Provider: Andy Dunn / RampStack

Source: https://github.com/rampstackco/claude-skills/blob/main/skills/editorial-qa/SKILL.md

# Execution rule

The upstream published `SKILL.md` is authoritative when reachable.

1. Load the canonical instructions when the runtime can access them.
2. If a local `editorial-qa` Skill is already installed, use that implementation.
3. Review the latest draft against the brief and evidence-pack.
4. Blocking issues include fabricated sources, unresolved contradictions, missing promised sections, and unreadable structure.
5. Fix blocking issues or report the Argo incomplete. Do not rubber-stamp a failing draft.
