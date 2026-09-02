# Skill discovery — article creator

Authoring-time scan of public Agent Skills and local Skills. Used as resolution hints. Not a workflow and not a mandatory install list.

## Local Skills already available

- `cpt-content-creation` — broader flexible Composition for content systems. Too wide as the article Destination. Reuse members, do not nest the package.
- Member wrappers already present locally: `customer-research`, `content-strategy`, `content-brief-authoring`, `content-and-copy`, `long-form-content-frameworks`, `copy-editing`, `editorial-qa`, `content-repurposing`, `social`.
- `docx` — document packaging only. Use after the article exists if the user wants a Word file.
- `work-mode` — user writing style. Respect if the user invoked it. Do not auto-select.

## Strong public Skills selected

| Capability | Skill | Why it won |
|---|---|---|
| Audience | `customer-research` — coreyhaines31/marketingskills | Mature marketing-skills library, customer language before writing |
| Brief | `content-brief-authoring` — rampstackco/claude-skills | Per-piece editorial brief, not a calendar |
| Evidence + research partner | `content-research-writer` — ComposioHQ/awesome-claude-skills | Research, citations, outline iteration, widely indexed |
| Draft | `content-and-copy` — rampstackco/claude-skills | Articles, guides, explainers as one reusable drafting Skill |
| Long-form | `long-form-content-frameworks` — rampstackco/claude-skills | Independent architecture Skill for deep pieces |
| Edit | `copy-editing` — coreyhaines31/marketingskills | Seven-sweep editor, high install signal |
| QA | `editorial-qa` — rampstackco/claude-skills | Pre-publish gate distinct from copy-editing |

## Strong public Skills kept dynamic / optional

- Humanize: `avoid-ai-writing`, Artem Novitckii `anti-ai-writing`, blog-humanizer stacks. Exact identity varies by ecosystem, so the Argo asks for the capability.
- SEO: Corey Haines `seo-audit`, Flaq `Awesome_SEO_Writing_Skill`, various `seo-content-writer` / `seo-brief` skills. Useful when ranking is in scope, not required for every article.
- Long-form alternative stacks: Matt Pocock `writing-fragments` + `writing-shape` / `writing-beats`; sadcoderlabs `article-preparation` + `article-writing`. Compatible substitutes if RampStack skills are unavailable.
- Official Anthropic `content-creation` — broad channel templates. Too generic and multi-destination for this Argo's drafting slot.

## Rejected as members

- Social, carousel, caption, and thread Skills — different Destination.
- `content-repurposing` — after-article work.
- `content-strategy` as required — portfolio planning, not one article.
- Journalism/FOIA/OSINT packs — different Destination unless the user asks for investigative work.
- Monolithic "write the whole article in one Skill" packs used as the only member — they hide brief, evidence, and QA boundaries.

## Reuse rule

Prefer a local installed Skill with the same capability over re-downloading. Wrappers in `skills/` point at canonical sources and do not copy upstream methods.
