# Pin Versions If You Want Reproducible Experiments

Senior engineers usually do not need to be convinced that dependency changes can break software. The more subtle point is that reproducible experiments have a stricter requirement than general reliability. A system can be reliable enough for day-to-day use and still fail a rerun six weeks later because the dependency graph, action ref, or build image has drifted.

The reproducible-builds definition is precise: if the same source, build environment, and instructions are provided, any party should be able to recreate the same artifacts bit for bit. That is different from reliability. Reliability asks whether the system usually works in production. Reproducibility asks whether someone else, or your future self, can run the same experiment and get the same result from the same inputs. If dependency versions are floating, the answer is often no.

Package managers document this directly. Pip’s repeatable-install guidance says pinning versions protects you from bugs or incompatibilities in newly released packages, and it recommends pinning not only top-level dependencies but transitive ones as well. npm makes the same tradeoff explicit with `package-lock.json`: the lockfile records the exact dependency tree so teammates, CI, and deployments can install the same tree instead of recalculating versions against a looser manifest. In experiment-heavy codebases, that is not bureaucracy. It is part of the experimental method.

Mutable references are the trap many experienced teams still leave in place. GitHub’s Actions documentation is unusually blunt here: a full commit SHA is the only immutable release form for an action. Tags are easier to read, but GitHub notes that a tag can be moved or deleted; branches are even looser because they always resolve to the current tip. GitHub’s workflow docs warn that referencing a branch means future runs can pick up breaking changes. The same logic applies outside Actions. A dependency expressed as “main”, “latest”, or a movable tag is not really a version pin. It is a standing agreement to rerun the past with today’s code.

Strict pinning does have a cost. You give up some convenience, you have to schedule upgrade work, and you can lag on patches if nobody owns refresh cadence. Pip’s own docs note that exact pinning still trusts the package source unless you also verify hashes, and GitHub notes that SHA pinning will not automatically pull in fixes. So the right stance is not “pin everything forever.” It is “pin everything needed to replay the result, then automate review and refresh.”

Here is a practical checklist:

1. Pin top-level and transitive dependencies, not just the packages you typed into the manifest.
2. Commit lockfiles or equivalent environment descriptors so CI and colleagues resolve the same graph.
3. Replace mutable Git, workflow, or action references with immutable commit SHAs where reproducibility matters.
4. Record more than package versions: compiler image, OS base image, feature flags, and any build-time environment inputs that affect results.
5. Add a refresh loop with automation so pins are reviewed deliberately instead of drifting accidentally.

The payoff is not aesthetic neatness. It is that an experiment result can survive scrutiny. When someone asks why a benchmark moved, why a paper result cannot be recreated, or why a regression only appears on rerun, pinned versions turn guesswork into diffable evidence. That is the difference between software that merely works and experiments you can trust.

## Sources

- Reproducible Builds, "Definitions": https://reproducible-builds.org/docs/definition/
- pip documentation, "Repeatable Installs": https://pip.pypa.io/en/stable/topics/repeatable-installs/
- GitHub Docs, "Secure use reference": https://docs.github.com/en/actions/reference/security/secure-use
- GitHub Docs, "Using pre-written building blocks in your workflow": https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/find-and-customize-actions
