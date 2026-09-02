---
name: argo-write-article
description: Produce a publishable evidence-backed article from a topic, brief, notes, or source material. Use when the user wants an article, blog post, explainer, guide, thought-leadership piece, or editorial feature written end to end. Also use for article creator, redaction d article, brief plus draft plus edit plus QA. Do not use for standalone tweets, ads, landing-page conversion copy, content calendars, or social-only packs.
metadata:
  type: argo
  kind: argo
  version: "1"
  execution: hard
  binding: hybrid
  domain: [Writing, Editorial]
  source: local
---

# Destination

Produce a **publishable, evidence-backed article** that matches the requested audience, angle, length, and quality bar.

This Argo exists to ship one finished article, not a content system, not a social pack, and not a marketing site.

# Why these capabilities belong together

An article that can honestly be called publishable needs four contributions that no single Skill owns cleanly:

1. a usable editorial brief
2. evidence for factual claims
3. a drafted article
4. an editorial quality gate

Audience insight, strategy, long-form structure, copy editing, voice humanization, and SEO fit improve the same Destination when the current task needs them. They stay independently reusable Skills.

# Local semantics

This file is the local contract. A capable agent can interpret and execute this Argo from this package alone.

**Hard.** Every member marked `required: true` must materially participate before this Argo may claim successful completion. Optional members remain runtime-selectable. Hard constrains participation, not execution order.

A required capability may be satisfied by work already present in the current context when that work is accepted and sufficient. Example: user-supplied accepted evidence can satisfy `article-evidence`. Invented citations, unsourced statistics, and unreviewed drafts do not satisfy required members.

**Hybrid bindings.** `embedded` means the method ships in this package. `reference` means resolve a known Skill identity. `dynamic` means resolve any compatible implementation of the declared capability.

The runtime may select, skip optional members, combine members, or adapt order as long as required contributions happen and the Destination is honestly satisfied. Do not treat this Argo as a fixed workflow engine. Retries, loops, scheduling, and recovery stay with the runtime.

# Capability map

| Role | Skill identity | Binding | Required | Contributes |
|---|---|---|---|---|
| audience-insight | `audience-insight` wrapping `customer-research` | reference | optional | Who the article must serve and what language they use |
| editorial-brief | `editorial-brief` wrapping `content-brief-authoring` | reference | required | Angle, reader, promise, outline, constraints |
| article-evidence | `article-evidence` plus compatible research Skill | hybrid (reference + dynamic) | required | Sources, citations, claim support, gap disclosure |
| article-drafting | `article-drafting` wrapping `content-and-copy` | reference | required | The article body |
| long-form-structure | `long-form-structure` wrapping `long-form-content-frameworks` | reference | optional | Architecture for guides, reports, case studies, deep dives |
| copy-editing | `copy-editing` | reference | optional | Clarity, specificity, voice, tightness |
| editorial-qa | `editorial-qa` | reference | required | Pre-publish factual, structural, voice, and quality gate |
| voice-humanize | `voice-humanize` | dynamic | optional | Remove generic AI tells when the draft still sounds synthetic |
| seo-article-fit | `seo-article-fit` | dynamic | optional | Search intent, title/meta, heading fit when ranking is in scope |

# Resolution rules

Resolve members in this order:

1. A Skill already loaded in the current environment with the same identity or an equivalent capability.
2. The wrapper under `skills/<role>/` in this package, then its canonical source URL when reachable.
3. For `dynamic` members, any compatible Skill that implements the capability constraints below.
4. If a **required** member cannot be resolved and cannot be satisfied by accepted context, stop and report incomplete. Do not claim publishable success.
5. If an **optional** member cannot be resolved, continue when the Destination remains achievable.

Do not invent a third-party Skill identity that was not discovered.

## Dynamic capability constraints

`article-evidence` compatible Skill must:

- gather or inspect source material
- attach citations or explicit source notes to factual claims
- disclose unresolved gaps
- refuse fabricated quotes, studies, or URLs

`voice-humanize` compatible Skill must:

- remove generic AI cadence and stock phrasing
- preserve meaning, claims, and the requested voice
- not add new unsourced facts

`seo-article-fit` compatible Skill must:

- align title, slug/meta when asked, headings, and intro with one search intent
- not keyword-stuff or invent SERP data

Known good references discovered at authoring time are recorded in `references/skill-discovery.md`. They are resolution hints, not a mandatory install list.

# Participation

Default policy: **Hard**.

Activate only members that materially improve this article. Typical useful path when context is thin:

`audience-insight → editorial-brief → article-evidence → (long-form-structure) → article-drafting → copy-editing → voice-humanize → seo-article-fit → editorial-qa`

Skip the first hop when the audience is already known. Skip long-form structure for short explainers. Skip SEO when the piece is not meant to rank. Never skip drafting or editorial QA. Never skip evidence unless accepted evidence is already in context.

# Shared constraints

- One article per run unless the user explicitly asks for a series.
- Write in the user's language unless they specify another.
- Prefer the user's voice, brief, examples, and banned phrases over generic editorial style.
- Do not copy substantial copyrighted text. Summarize and cite.
- Mark uncertainty instead of inventing sources.
- Keep Skill methods inside member Skills. This Argo owns relationships, constraints, and success semantics only.
- Load member `SKILL.md` files only when that member is selected. Do not load every member by default.
- If `work-mode` or another user style Skill is active because the user invoked it, respect it for tone. Do not auto-invoke it.

# Artifact contracts

Use these names when passing work between members. They are data contracts, not a state machine.

- `audience-notes` — who the article is for, jobs, language, objections
- `editorial-brief` — purpose, reader, angle, promise, outline, length, voice, sources to use, sources to avoid
- `evidence-pack` — claims, sources, quotes, numbers, confidence, gaps
- `article-draft` — full draft
- `edited-draft` — draft after copy-editing and/or humanization
- `qa-report` — pass/fail notes, remaining risks, publish recommendation

A later member may consume an earlier artifact when present. Absence of an optional artifact is not failure.

# Failure and fallback

- Missing required Skill and no accepted substitute → incomplete, say which capability is missing.
- Evidence gaps remain after research → publish only if the article discloses the gaps and avoids unsourced hard claims. Otherwise incomplete.
- Editorial QA finds blocking issues → fix or report incomplete. Do not relabel a failing draft as publishable.
- Dynamic substitute used → name the substitute and the capability it covered.
- Do not silently replace a referenced exact-method Skill with a loosely similar one when the user pinned a method.

# Progressive disclosure

1. Argo name + description
2. This root `SKILL.md`
3. `argo.json` if a machine index is needed
4. Only the selected member `skills/*/SKILL.md`
5. Canonical upstream Skill body when the wrapper says the upstream file is authoritative
6. `references/` only when discovery, evals, or fallback resolution is needed

# Definition of Done

The Argo may claim success only when all of the following are true:

- A complete article exists, not just a plan, outline, or critique.
- The article matches the brief's reader, angle, and constraints, or an explicit change to those constraints is stated.
- Factual claims are backed by the evidence-pack or by accepted user-supplied evidence. Remaining gaps are disclosed.
- `editorial-qa` materially participated and did not leave blocking issues unaddressed.
- Only relevant members were loaded.
- Member Skills remain independently reusable outside this Argo.

# Out of scope

Do not route these requests here unless the user also wants a full article:

- social posts, threads, or carousels as the primary deliverable
- ads, landing pages, or conversion website copy
- editorial calendars or content strategy with no article to produce
- document conversion with no new editorial work
