---
name: voice-humanize
description: Use to remove generic AI cadence from an article draft while preserving meaning, claims, and the requested voice.
metadata:
  argo-role: voice-humanize
  binding: dynamic
---

# Purpose

Independently reusable voice-humanization capability. Inside `argo-write-article` it is optional and produces an updated `edited-draft`.

# Dynamic resolution

Resolve any compatible Skill. Known hints from discovery:

- avoid-ai-writing
- anti-ai-writing
- blog-humanizer
- voice-dna

If none is installed, apply a light local pass:

- cut stock transitions and empty emphasis
- vary sentence rhythm
- keep the author's terms and the evidence
- do not add new facts to sound more confident

# Constraints

- Preserve meaning and sourced claims.
- Do not introduce slang that breaks the briefed voice.
- Skip this member when the draft already matches the requested voice.
