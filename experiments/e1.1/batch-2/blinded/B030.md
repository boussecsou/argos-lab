# Pin Dependencies to Make Experiments Reproducible

An experiment is only useful if someone else can rerun it and get a meaningfully comparable result. That requires more than preserving the repository: it requires preserving the inputs that turn the repository into an executable environment. Dependency versions are among those inputs, which is why pinning them should be a default practice for experiments that inform engineering decisions.

Reproducibility is not the same as general reliability. A reliable service is expected to keep working correctly under its intended conditions. A reproducible experiment is expected to recreate the same result from the same declared inputs. Pinning will not make a flawed benchmark valid, eliminate a production outage, or prove that a result generalizes. It does make one source of accidental variation visible and controllable. The Reproducible Builds project defines a reproducible build as one that can recreate identical artifacts from the same source, build environment, and instructions; it explicitly includes dependency versions among relevant environment attributes. [Reproducible Builds definition](https://reproducible-builds.org/docs/definition/)

Unpinned dependencies quietly change the experiment after it has started. A version range can resolve to a newly published library, whose changed default, bug fix, or transitive dependency changes performance or behavior. The same problem appears when a script, action, or package source is referenced by a branch such as `main`. Git documents that branches are expected to change over time: a branch is a reference to the latest commit, and new commits update it. [Git data model](https://git-scm.com/docs/gitdatamodel.html) A branch reference therefore records an intention to follow a moving target, not the exact implementation that a prior run used.

The practical remedy is to capture exact, reviewable identities. For libraries, commit a lockfile or an equivalent fully resolved dependency manifest. For source dependencies, use an immutable commit identifier rather than a branch. For container images, record an immutable digest when the runtime supports it. For ecosystems that provide it, record artifact hashes as well as versions. pip’s documentation makes the distinction concrete: exact versions support repeatable installs, while hash checking also verifies the downloaded archives. [pip: Repeatable Installs](https://pip.pypa.io/en/stable/topics/repeatable-installs/)

Use this five-item checklist before recording an experimental result:

1. Commit the lockfile or fully resolved dependency manifest, including transitive dependencies.
2. Replace branch and floating-tag references with full commit IDs or immutable digests.
3. Record the language runtime, operating system or container base, and build-tool version.
4. Enable artifact hashes or an approved internal registry where the ecosystem supports them.
5. In CI, rebuild or rerun from a clean environment and retain the manifest with the result.

Strict pinning has a cost: somebody must regularly review and deliberately update the pins. It can also delay security fixes if teams mistake a lockfile for a permanent freeze. That is a governance problem, not an argument for ambiguity. Establish a scheduled update path, test the update, and record why a result changed. The value of pinning is not that every run stays identical forever; it is that a specific reported run can be reconstructed, inspected, and compared when the environment eventually changes.
