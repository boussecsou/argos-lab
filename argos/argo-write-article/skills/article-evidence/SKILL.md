---
name: article-evidence
description: Use to research, source, and package evidence for an article so factual claims can be cited and gaps disclosed.
metadata:
  argo-role: article-evidence
  canonical-skill: content-research-writer
  canonical-provider: ComposioHQ / awesome-claude-skills
  canonical-source: https://github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md
  binding: hybrid
---

# Purpose

Independently reusable evidence Skill for articles. Inside `argo-write-article` it produces `evidence-pack`.

This wrapper owns the local evidence contract. Drafting methods stay in the drafting Skill.

# Canonical source and substitutes

Preferred reference: `content-research-writer`

Source: https://github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md

Compatible dynamic substitutes: any research Skill that finds sources, attaches citations, and discloses gaps. Live web search in the current runtime may implement the capability when no dedicated Skill is installed.

# Capability contract

Produce an `evidence-pack` with:

- claims the article is likely to make
- sources with enough identity to verify (title, publisher, date, URL when available)
- quotes or figures kept in proportion and attributed
- confidence and unresolved gaps

Rules:

- Do not fabricate studies, quotes, dates, or URLs.
- Do not copy substantial copyrighted passages.
- User-supplied accepted sources already in context may satisfy this capability.
- Stop short of writing the full article unless the user only asked for research.

# Execution rule

1. Prefer an installed `content-research-writer` or reachable canonical source.
2. Otherwise use a compatible research Skill or current-runtime search tools.
3. Keep the pack usable by `article-drafting` and `editorial-qa`.
