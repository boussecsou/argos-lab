# Reproducible Experiments Need Pinned Dependencies

Senior engineers usually know the difference between “works on my machine” and “works in production.” Reproducible experiments ask for something narrower: if another runner repeats the same procedure, they should be able to reconstruct the same software inputs closely enough that a changed result means something. General reliability is about whether the system behaves acceptably under expected operating conditions. Reproducibility is about attribution. It protects the experiment from a quieter failure: drawing a conclusion from software that changed between runs.

Dependency pinning is the boring control that makes that attribution possible. In Python, pip’s repeatable-installs guidance describes pinning with `==` and notes that a frozen requirements file can include both direct and transitive dependencies ([pip documentation](https://pip.pypa.io/en/stable/topics/repeatable-installs/)). In Node projects, npm says `npm ci` is designed for automated environments, requires an existing lockfile, errors when the lock and `package.json` disagree, and installs without writing to the manifest or lockfile ([npm ci docs](https://docs.npmjs.com/cli/commands/npm-ci/)). Docker makes the same point at the image layer: tags are mutable, while digest references identify a specific image version ([Docker build best practices](https://docs.docker.com/build/building/best-practices/)).

The riskiest version specifier is often not an obvious range like `^1.4.0`; it is a mutable branch reference. Git branches are movable pointers to commits, and Git’s own book explains that branch pointers move as commits are made ([Git Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)). A dependency declared as `github:org/tool#main` may resolve to one commit today and another tomorrow. Even if both commits are “good,” the experiment no longer has the same treatment. A model evaluation, benchmark, or build-performance test can drift because a transitive helper changed, a base image tag advanced, or a branch dependency absorbed an unrelated fix.

This is not the same as claiming pinned environments are reliable. A perfectly pinned dependency can contain a bug, a vulnerable library, or a platform-specific behavior. Pinning simply stops the input from moving while you measure. Reliability work asks whether the chosen input is robust; reproducibility work asks whether everyone is using the same input.

That distinction is especially important when results are close. A two percent benchmark movement is not interpretable if the resolver was free to choose a different patch release between trial A and trial B.

A practical checklist:

1. Pin application dependencies with exact versions or lockfiles, and commit the lockfile.
2. Pin runtime and build images by digest when the experiment result depends on image contents.
3. Replace branch references with immutable commit SHAs or released version tags.
4. Record package-manager versions and install flags, because resolver behavior is part of the input.
5. Re-run the experiment only after dependency updates land through reviewed, auditable changes.

Strict pinning has costs. It slows security uptake when teams forget to update, creates review overhead, and can make cross-platform testing more explicit than convenient. Docker’s guidance calls out this tradeoff directly: digest pinning gives control and an audit trail, but opts out of automatic image updates unless paired with update automation such as Dependabot ([Docker build best practices](https://docs.docker.com/build/building/best-practices/)). That is the right framing. Pins should not freeze a project forever; they should turn dependency change from background weather into a deliberate experimental event.
