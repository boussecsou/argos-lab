---
name: audience-insight
description: Use to clarify the article reader, jobs to be done, language, objections, and proof they trust before briefing or drafting.
metadata:
  argo-role: audience-insight
  canonical-skill: customer-research
  canonical-provider: Corey Haines / Marketing Skills
  canonical-source: https://github.com/coreyhaines31/marketingskills/blob/main/skills/customer-research/SKILL.md
  binding: reference
---

# Purpose

Independently reusable audience-insight Skill. Inside `argo-write-article` it produces `audience-notes`.

# Canonical source

Provider: Corey Haines / Marketing Skills

Source: https://github.com/coreyhaines31/marketingskills/blob/main/skills/customer-research/SKILL.md

# Execution rule

The upstream published `SKILL.md` is authoritative when reachable.

1. Load the canonical instructions when the runtime can access them.
2. If a local `customer-research` Skill is already installed, use that implementation.
3. Produce `audience-notes` the later brief and draft can consume.
4. Do not turn this Skill into a content calendar or a full article.
