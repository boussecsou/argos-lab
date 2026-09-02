# Why Reproducible Experiments Need Pinned Dependencies

Senior engineers usually talk about reliability and reproducibility as if they point to the same problem. They do not. A reliable system keeps behaving acceptably under expected operating conditions. A reproducible experiment is narrower: it should produce the same result when someone reruns the same analysis with the same code, inputs, and declared conditions. The National Academies' 2019 report on reproducibility in science frames computational reproducibility that way, and that framing matters because dependency policy sits directly inside those "declared conditions."

That is why pinned dependency versions are not a cleanup detail. They are part of the experiment definition. The pip documentation is explicit that pinning versions in a requirements file protects you from bugs or incompatibilities in newly released versions, and it notes that `pip freeze` can pin both top-level and transitive dependencies. Rust's Cargo makes the same point from another angle: its FAQ says a `Cargo.lock` file describes the state of the world at the time of a successful build so later builds can use the exact same dependency set on different systems. In both ecosystems, the message is the same: if the dependency graph can drift, the experiment can drift with it.

This is where mutable branch references become dangerous. Git's glossary defines a ref as a name that points to an object name or another ref. The `git checkout` documentation then shows what that means operationally: a branch refers to a commit, and each new commit updates the branch to point somewhere else. So if an experiment depends on "whatever is currently on `main`," the dependency is not really pinned at all. It is a moving label. Two engineers can run the "same" experiment a week apart and silently test different code.

That difference is not theoretical. A mutable ref can change because someone merged a bug fix, rewrote history on a branch, or retagged an integration branch. Those may be valid maintenance actions, but they break the assumption that your experimental environment is identical. If your conclusion depends on performance regressions, numerical tolerances, or model output shifts, a branch move can make the comparison meaningless. In practice, immutable commit SHAs, lockfiles, and, where supported, package hashes are much better anchors than branch names.

Pinned versions do have a cost. The pip docs note that stricter repeatability strategies can add maintenance overhead and may trade off portability or availability benefits depending on how you bundle artifacts. Cargo documents another tradeoff plainly: using `--locked` helps deterministic builds, but it also means you will not automatically receive dependency fixes. Strict pinning buys experimental control by turning upgrades into an explicit engineering task.

Here is a pragmatic checklist:

1. Pin direct and transitive dependencies with exact versions or a committed lockfile.
2. Replace mutable Git branch references with immutable commit SHAs or published release tags you control.
3. Add integrity checks where your ecosystem supports them, such as pip hashes or Cargo's locked mode in CI.
4. Record the toolchain and install path used to resolve dependencies, not just the application code.
5. Upgrade on a schedule and rerun the experiment as a conscious new baseline, not as an accidental side effect.

If the goal is general service resilience, dependency ranges and fast patch uptake may be the right trade. But if the goal is a reproducible experiment, version drift is part of the experiment surface. Pinning is not bureaucracy. It is how you keep "same code, same inputs, same result" from quietly becoming a slogan instead of a property.

## Sources

- National Academies of Sciences, Engineering, and Medicine, *Reproducibility and Replicability in Science* (2019): https://www.nationalacademies.org/read/25303/chapter/3
- pip documentation, *Repeatable Installs* (accessed September 2, 2026): https://pip.pypa.io/en/stable/topics/repeatable-installs/
- The Cargo Book, *FAQ: Why have `Cargo.lock` in version control?* (accessed September 2, 2026): https://doc.rust-lang.org/cargo/faq.html
- Git documentation, *gitglossary* and *git-checkout* (accessed September 2, 2026): https://git-scm.com/docs/gitglossary and https://git-scm.com/docs/git-checkout
