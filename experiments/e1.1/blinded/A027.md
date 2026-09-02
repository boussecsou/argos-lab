# Task 01 — Dependency Pinning

## Editorial brief

- **Reader:** Senior software engineers who run experiments in CI, notebooks, containers, or shared research environments.
- **Angle:** Reproducibility is an identity problem: a future run must receive the same inputs, including dependency artifacts, rather than merely pass today’s tests.
- **Promise:** Explain what pinning does and give a practical boundary for using it without confusing repeatability with reliability.
- **Outline:** Define reproducibility; explain mutable branch references; show lockfiles and immutable identifiers; provide a five-item checklist; state the operational cost and a balanced policy.
- **Length:** 500–700 words for the article body.
- **Voice:** Clear, pragmatic, technically precise, aimed at experienced practitioners.
- **Constraints:** Prefer primary technical sources; distinguish reproducibility from reliability; include a five-item checklist and at least one cost of strict pinning.

## Evidence pack

1. Git defines branches as references to a commit that are expected to change, while tags are normally not changed after creation. Source: *Git Data Model*, Git documentation, https://git-scm.com/docs/gitdatamodel.html. **Confidence: high.**
2. Git’s object names are content-derived identifiers, and the Git documentation describes commits as identifiable by SHA-1 object names. Source: *Git documentation*, https://git-scm.com/docs/git. **Confidence: high.**
3. npm says `package-lock.json` describes the exact dependency tree so later installs can generate identical trees, and recommends committing it. Source: *package-lock.json*, npm Docs, https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json/?v=true. **Confidence: high.**
4. `npm ci` requires an existing lockfile, fails when it disagrees with `package.json`, and does not write either manifest or lockfile. Source: *npm-ci*, npm Docs, https://docs.npmjs.com/cli/commands/npm-ci/. **Confidence: high.**
5. SemVer warns that overly tight specifications can cause version lock and overly loose ones can cause “version promiscuity.” Source: *Semantic Versioning 2.0.0*, https://semver.org/. **Confidence: high.**

**Gap disclosure:** The sources document Git and npm behavior; they do not prove that pinning alone makes an experiment reproducible. The article treats environment, data, code, and random seeds as additional inputs and labels the checklist as editorial guidance.

## Article

# Pin dependencies when the experiment must be repeatable

An experiment is reproducible when another run can use the same inputs and obtain a comparable result. That is narrower than general reliability. Reliability asks whether a system behaves acceptably and consistently in operation. Reproducibility asks whether the run can be reconstructed: same code, data, configuration, toolchain, and dependency artifacts. A service can be reliable while two experiments silently use different library versions.

Dependencies are an easy place for identity to drift. A manifest such as `requests>=2.0` describes an allowed range, not one artifact. Even a familiar label such as `main` is a moving pointer. Git documents branches as references to a commit that are expected to change; tags are normally left in place after creation. If a benchmark records only `origin/main`, a later fetch can resolve that name to a different commit. The command still looks identical, but the experiment’s input is not.

Use immutable identifiers at the experiment boundary. Record the full commit ID (or a signed, immutable release tag whose target you verify), not only a branch name. For package managers, commit the lockfile that resolves the complete dependency graph. npm describes `package-lock.json` as an exact tree intended to let subsequent installs generate identical trees, and its `npm ci` command installs from that lockfile without rewriting it. Equivalent lockfile-and-clean-install mechanisms exist in other ecosystems; the principle is the same: resolve once, review the result, and replay that resolution. This matters when a result is challenged months later: a reviewer can inspect the same graph before asking whether the algorithm changed.

Pinning does not freeze everything. Operating-system images, compilers, native libraries, environment variables, data snapshots, hardware, and random-number generators can also affect a result. Capture those inputs in the run manifest. If a dependency is fetched from a URL or a private registry, record its digest or an artifact identifier as well. A lockfile is evidence of a dependency graph, not proof that the whole environment is identical.

### A five-item experiment checklist

1. **Identify code:** record the full Git commit ID and repository revision.
2. **Lock the graph:** commit the ecosystem lockfile and install with its frozen or CI mode.
3. **Verify artifacts:** retain package checksums or registry provenance where the tool supports them.
4. **Capture the environment:** record image digest, OS and tool versions, configuration, data snapshot, and seed.
5. **Test the replay:** run a clean reconstruction and attach logs, outputs, and any differences.

Strict pinning has a cost. It creates upgrade work: someone must review new versions, refresh lockfiles, rebuild images, and rerun the experiment. SemVer’s own discussion calls out this trade-off as version lock when constraints become too tight. An abandoned lockfile can therefore preserve an old vulnerability or block a necessary fix.

The practical policy is to pin for published results, regulated analyses, and regression baselines; use controlled ranges during exploratory work; and schedule deliberate refreshes. Reproducibility is not a promise that nature will produce the same number forever. It is a disciplined record of which inputs produced this number, plus a credible path for another engineer to rerun the work.

## Editorial QA report

- **Status:** PASS — publishable after QA.
- **Blocking issues:** None. The article is complete, within the requested length, includes the required distinction, mutable-reference risk, five-item checklist, and pinning cost.
- **Factual checks:** Git and npm behavior is tied to the cited primary documentation. Broader environment guidance is explicitly framed as principle or editorial guidance, not as a sourced guarantee.
- **Structural/voice checks:** Clear headings, pragmatic senior-engineer voice, and no invented citations or quotations.
- **Required capabilities evidenced:** editorial-brief, article-evidence, article-drafting, editorial-qa.
