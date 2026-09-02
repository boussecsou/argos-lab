---
name: seo-article-fit
description: Use when an article must also fit one search intent through title, headings, intro, and optional meta without keyword stuffing.
metadata:
  argo-role: seo-article-fit
  binding: dynamic
---

# Purpose

Independently reusable SEO-fit capability for articles. Inside `argo-write-article` it is optional.

# Dynamic resolution

Resolve any compatible Skill. Known hints from discovery:

- seo-audit
- seo-content-writer
- seo-brief
- Awesome SEO Writing Skill

If none is installed and the user asked for SEO, apply a light local pass:

- one primary intent
- title and H1 aligned
- headings that answer real sub-questions
- optional title/meta suggestions
- no invented keyword volumes or SERP screenshots

# Constraints

- SEO must not override accuracy or the briefed reader.
- Skip this member when ranking is out of scope.
