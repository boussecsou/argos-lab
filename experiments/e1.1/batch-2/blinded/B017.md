# Pin the Environment, Not Just the Idea

An experiment is reproducible when another engineer can use the same inputs, computational steps, methods, and analysis conditions to obtain consistent results. That is narrower than general reliability. A reliable system may survive failures, produce acceptable answers across many environments, or behave consistently in production. A reproducible experiment asks a stricter historical question: can we reconstruct the particular environment that produced this result?

Dependency versions are part of that environment. If an experiment records its code and data but leaves libraries as `>=2.0`, `latest`, or an unqualified Git branch, a later run is not actually receiving the same inputs. It is sampling whatever the resolver and upstream repositories happen to provide that day. The [National Academies’ definition of computational reproducibility](https://nap.nationalacademies.org/resource/25303/R%26R.pdf) explicitly includes the same computational steps and conditions; dependency resolution is one of those conditions, even when it is hidden behind an installer.

Lockfiles and exact requirements turn an implicit, moving input into a reviewable artifact. [npm’s lockfile documentation](https://docs.npmjs.com/files/package-lock.json/) says `package-lock.json` records the exact generated dependency tree so later installs can reproduce it despite intermediate updates. [pip’s repeatable-install guidance](https://pip.pypa.io/en/stable/topics/repeatable-installs/) likewise recommends pinning both direct and transitive dependencies, and explains that hashes add protection against a package changing without a version change. Pinning is therefore necessary, although not sufficient: operating system packages, compiler versions, hardware, random seeds, locale, and external data may also affect the result.

## Why a branch is not a version

A reference such as `main`, `develop`, or even a floating release branch names a pointer, not immutable content. Its target can advance between runs without any change to the experiment repository. Two engineers can execute identical setup commands and silently receive different code. The resulting disagreement is hard to diagnose because the declared configuration appears unchanged.

Prefer a content-addressed identifier: a full Git commit SHA, an artifact digest, or a package version plus a verified hash. GitHub documents that a commit SHA is unique and immutable, whereas a tag may be moved or deleted; its [Actions guidance](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/manage-custom-actions) therefore requires the full SHA when selecting a commit. Docker makes the same distinction for images: a digest is immutable, while a tag can be updated, so its [build-policy example](https://docs.docker.com/build/policies/examples/) recommends digest references for reproducible builds.

## A five-item checklist

1. **Pin the complete graph.** Lock direct and transitive dependencies, not only the packages imported by your own code.
2. **Replace mutable references.** Resolve branches, floating tags, container tags, and download URLs to commits, digests, or hashed artifacts.
3. **Record the toolchain.** Capture the package manager, runtime, compiler, operating-system image, and relevant build flags.
4. **Verify from a clean environment.** Recreate the experiment in fresh CI or a container, without relying on a developer cache.
5. **Automate controlled refreshes.** Let a bot or scheduled job propose lock updates, then rerun tests and record the resulting evidence before merging.

Strict pinning has a real cost. Updates become explicit maintenance work, lockfiles create review noise, and old pins can retain security defects. Content hashes can also vary across platforms when artifacts are rebuilt. The answer is not to float dependencies in the experiment path; it is to separate reproduction from renewal. Preserve the known-good environment for historical runs, while regularly testing proposed upgrades in a controlled branch. That gives future engineers a stable baseline and current maintainers a deliberate route forward.
