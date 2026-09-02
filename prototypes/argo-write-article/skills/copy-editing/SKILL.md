---
name: copy-editing
description: Use to edit, tighten, and improve an existing article draft while preserving the core message and voice.
metadata:
  argo-role: copy-editing
  canonical-skill: copy-editing
  canonical-provider: Corey Haines / Marketing Skills
  canonical-source: https://github.com/coreyhaines31/marketingskills/blob/main/skills/copy-editing/SKILL.md
  binding: reference
---

# Purpose

Independently reusable copy-editing Skill. Inside `argo-write-article` it produces `edited-draft`.

# Canonical source

Provider: Corey Haines / Marketing Skills

Source: https://github.com/coreyhaines31/marketingskills/blob/main/skills/copy-editing/SKILL.md

# Execution rule

The upstream published `SKILL.md` is authoritative when reachable.

1. Load the canonical instructions when the runtime can access them.
2. If a local `copy-editing` Skill is already installed, use that implementation.
3. Edit the current draft. Do not replace it with a different article.
4. Preserve evidenced claims. Flag unsupported new claims instead of inventing proof.
5. Copy-editing is not the publish gate. `editorial-qa` still owns pre-publish QA.
