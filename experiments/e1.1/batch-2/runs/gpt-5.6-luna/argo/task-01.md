# Pin the Input: Why Reproducible Experiments Need Pinned Dependencies

Senior engineers often use “reliable” and “reproducible” as if they were synonyms. They are related, but they answer different questions. Reliability asks whether a system behaves acceptably across the conditions it is expected to handle. Reproducibility asks whether another run, by another person or pipeline, can obtain the same result from the same declared inputs. An experiment can be reliable in production and still be impossible to reproduce if its dependency graph changes between runs.

Dependencies are part of an experiment’s input, not incidental setup. A version range such as `^4.2`, an unqualified package name, or a container tag like `latest` gives a resolver permission to choose something newer later. That choice can alter defaults, numerical behavior, generated output, or even whether the experiment starts. A Git branch is similarly a moving name: Git’s data model describes branches as references whose tips change as commits are added. A dependency on `main` therefore does not identify one source tree; a commit ID does. [Git’s reference model](https://git-scm.com/docs/gitdatamodel) makes this distinction explicit.

The same problem appears in registries. npm documents that a lockfile records the exact dependency tree and that `npm ci` performs a frozen install from it. pip’s repeatable-install guidance recommends exact versions and, for stronger guarantees, hashes for downloaded artifacts. For containerized experiments, Docker documents digests as immutable content identifiers, unlike tags that can be reused or changed. These mechanisms turn “whatever the resolver serves today” into a recorded input. ([npm install](https://docs.npmjs.com/cli/install/), [npm ci](https://docs.npmjs.com/cli/commands/npm-ci/), [pip repeatable installs](https://pip.pypa.io/en/stable/topics/repeatable-installs/), [Docker image digests](https://docs.docker.com/dhi/explore/security-concepts/digests/))

Pinning is not a claim that every run will be identical. Operating-system libraries, compilers, CPU features, GPU drivers, environment variables, network services, and random seeds can remain uncontrolled. Pinning narrows the space of explanations when results differ; it does not replace recording the rest of the execution environment. That distinction is useful in review: a failed replication should reveal which input changed instead of turning into a debate about an invisible dependency update.

Use this five-item checklist before treating an experiment as reproducible:

1. **Lock the whole graph.** Commit the package manager’s lockfile or a fully resolved requirements file, including transitive dependencies.
2. **Remove moving references.** Replace branches, floating tags, and open-ended ranges with commit IDs, exact versions, or immutable image digests.
3. **Verify artifacts.** Record hashes where the ecosystem supports them; pip’s `--hash` mode is a practical example.
4. **Record the execution context.** Capture runtime and tool versions, OS and architecture, hardware, configuration, data identifiers, and random seeds.
5. **Rebuild cleanly.** Have CI install from the manifest in a clean environment, rerun a small smoke experiment, and fail when the lockfile drifts.

Strict pinning has a cost. Someone must review updates, regenerate lockfiles, resolve conflicts, and test security patches rather than accepting them automatically. Very strict artifact pinning can also reduce portability: pip notes that a wheelhouse may contain compiled packages tied to a particular operating system or architecture. The answer is not to abandon pins; it is to make updates routine and visible. Dependabot-style update pull requests, scheduled rebuilds, and an explicit process for emergency upgrades preserve the experiment’s baseline while keeping it maintainable.

Reproducibility is an engineering property of the record around a result. Pin the dependencies, record the remaining environment, and make changing the baseline an intentional, reviewable event.

## Sources

- [Git data model](https://git-scm.com/docs/gitdatamodel), Git project documentation.
- [npm install](https://docs.npmjs.com/cli/install/) and [npm ci](https://docs.npmjs.com/cli/commands/npm-ci/), npm documentation.
- [Repeatable installs](https://pip.pypa.io/en/stable/topics/repeatable-installs/), pip documentation.
- [Image digests](https://docs.docker.com/dhi/explore/security-concepts/digests/), Docker documentation.
