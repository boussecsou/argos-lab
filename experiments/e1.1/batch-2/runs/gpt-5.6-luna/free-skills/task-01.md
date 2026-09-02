---
title: "Pin Dependencies Before You Trust an Experiment"
description: "Why exact dependency inputs make software experiments reproducible, and how to pin them without freezing useful change."
slug: pin-dependencies-reproducible-experiments
author: ""
date: 2026-09-02
tags: [reproducibility, dependencies, software-engineering]
category: engineering
---

# Pin Dependencies Before You Trust an Experiment

An experiment that cannot be rerun with the same inputs is not a dependable basis for a decision. “It passed in CI” says something about one execution; it does not prove that another engineer can recreate the result next week. Pinning dependencies turns an implicit, moving input into an inspectable part of the experiment.

## Reproducibility is narrower than reliability

Reliability asks whether a system performs its intended function consistently over time and under expected conditions. Reproducibility asks a different question: given the same source, build environment, and instructions, can another party recreate the specified artifacts byte for byte? That is the definition used by the Reproducible Builds project ([definition](https://reproducible-builds.org/docs/definition/)).

The distinction matters in an experiment. A reliable test runner can execute the same command successfully while silently resolving a newer transitive package. The service may remain healthy, yet the measured latency, model output, or failure rate can change. Reproducibility makes the cause of a changed result diagnosable; it does not, by itself, make the software reliable.

## Why branch references are a weak input

Git’s data model says branches are expected to change: making a commit moves the current branch to the new commit ([Git data model](https://git-scm.com/docs/gitdatamodel)). A dependency declared as a repository plus `main`, `master`, or another branch therefore names a moving target. The code reviewed today may not be the code fetched by tomorrow’s job.

Use a commit ID when a VCS dependency is unavoidable, and record the repository URL. For release artifacts, verify checksums or use an immutable digest. Docker’s guidance makes the same point for images: tags can be overwritten, while a digest resolves to immutable content ([Compose trust model](https://docs.docker.com/compose/trust-model/)). A tag remains useful as a human-facing update channel; it is a poor experiment input unless the resolved digest is captured.

## Pin the complete graph, not just the headline package

A top-level version constraint is not a complete experiment specification. Resolve and review the transitive graph, then commit the resolver’s lockfile. npm documents that `package-lock.json` records an exact dependency tree and that `npm ci` performs a frozen install, failing when the lockfile and manifest disagree ([npm `ci`](https://docs.npmjs.com/cli/commands/npm-ci/)). Python projects can add hashes to requirements; pip’s repeatable-install guidance explains that hashes verify the downloaded distributions, not merely their version labels ([pip repeatable installs](https://pip.pypa.io/en/stable/topics/repeatable-installs/)).

Pin the runtime and build tools that can alter results as well: compiler, interpreter, OS image, feature flags, locale, and relevant environment variables. Keep the experiment command and expected artifact checks beside those declarations. A lockfile without a documented installer or runtime still leaves room for divergent runs.

## A five-item pinning checklist

1. **Identify inputs.** List direct and transitive packages, VCS references, images, runtimes, tools, flags, and environment assumptions.
2. **Resolve once.** Generate the lockfile or requirements file with exact versions and, where supported, hashes.
3. **Replace moving names.** Use commit IDs, immutable image digests, and fixed toolchain versions for the experiment path.
4. **Install cleanly.** Make CI fail on lockfile drift and start from an empty environment.
5. **Update deliberately.** Review upgrades as experiment changes, rerun the baseline, and record the resulting artifact identifiers.

## The cost is real—and manageable

Strict pinning adds maintenance. Security fixes and compatible improvements do not arrive automatically; someone must refresh the lockfile, review the diff, and rerun the baseline. Old pins can also preserve a bug or block a platform update. Treat that cost as a scheduled control: update on a cadence, automate vulnerability alerts, and maintain a separate “latest” lane for exploratory work.

The practical rule is simple: exploratory code can follow ranges, but a result used to make a technical decision should name its complete, immutable input set. Pinning does not guarantee a useful experiment. It guarantees that disagreement about the result starts from the same evidence.

