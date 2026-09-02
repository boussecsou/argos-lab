# Reproducible Experiments Start With Pinned Dependencies

An experiment is not reproducible merely because its code is in Git and its tests pass twice. Another engineer must be able to reconstruct the material inputs and obtain the same result. The [Reproducible Builds project](https://reproducible-builds.org/docs/definition/) uses a demanding version of that idea: given the same source, build environment, and instructions, another party can recreate bit-for-bit identical artifacts. Experimental results may use a different equality test, but the principle is the same: inputs must be identifiable.

Dependency versions are part of those inputs. If an experiment records `library>=2`, `tool:main`, or `action@v4`, it describes a moving target rather than the software that actually ran. A rerun next month may resolve to new code without any change in the experiment repository. When the result changes, investigators can no longer tell whether the hypothesis failed, the environment drifted, or a transitive dependency behaved differently.

## Reproducibility is narrower than reliability

Reliability asks whether a system behaves acceptably across failures, updates, workloads, or environments. Reproducibility asks whether a specified computation can be repeated from the same identified inputs. A service may be reliable while its deployment is not reproducible: every build works, but each silently selects the newest compatible packages. Conversely, a perfectly reproduced experiment can consistently expose an unreliable system.

Pinning supports the second property. It does not prove the code is correct, portable, secure, or operationally resilient. It simply removes dependency selection as an uncontrolled variable. That narrower guarantee is valuable because causal interpretation depends on knowing what changed.

Package-manager guidance makes the mechanism concrete. The official [pip repeatable-installs documentation](https://pip.pypa.io/en/stable/topics/repeatable-installs/) recommends exact versions and explains that `pip freeze` captures both direct and transitive dependencies. It also notes that versions alone still trust the package index; hashes can verify the exact distributions downloaded. Pinning is therefore a baseline, not the end of environment capture.

## A branch name is not a version

Git makes the risk of mutable references explicit: the official Git book defines a branch as a [“lightweight movable pointer” to a commit](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell.html). A dependency on `main` identifies whatever commit that pointer reaches at resolution time. Tags can also move in ordinary repository configurations.

For the same reason, GitHub says a full commit SHA is the only way to consume a GitHub Action as an immutable release and warns that tags can be moved or deleted if a repository is compromised ([GitHub secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use)). Record a full commit identifier for Git dependencies, ideally with a readable release comment, and verify that it belongs to the expected repository.

## Five-item experiment checklist

1. **Pin direct and transitive packages.** Commit the resolved lockfile or exact requirements file, not only broad top-level constraints.
2. **Pin source dependencies immutably.** Replace branch and mutable tag references with full commit identifiers or genuinely immutable release references.
3. **Verify artifacts.** Store supported hashes, checksums, or signatures so a stable version label cannot conceal changed bytes.
4. **Capture the surrounding environment.** Record the runtime, operating-system or container image digest, architecture, build flags, and relevant environment variables.
5. **Test reconstruction.** Rebuild in a clean environment and compare the defined outputs before treating the experiment as reproducible.

## Strict pins have a maintenance cost

Pins deliberately stop automatic change, including useful security fixes and compatibility updates. They create review work, can make lockfiles platform-specific, and may leave an experiment dependent on artifacts that later disappear. GitHub’s action documentation states the tradeoff plainly: SHA users do not receive later updates ([managing custom actions](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/manage-custom-actions)).

The practical answer is controlled renewal: keep the recorded experiment environment immutable, while using automated update proposals and periodic reruns to qualify a successor environment. Reproducibility is not refusing change. It is making every change explicit enough to explain the result.
