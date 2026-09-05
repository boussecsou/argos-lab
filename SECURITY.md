# Security Policy

## Reporting a Vulnerability

This repository hosts experimental documentation, Argo packages, and
experiment artifacts — it does not ship a running service, so most security
concerns will relate to supply-chain issues (e.g. a malicious dependency in a
checked-in script) or accidental exposure of sensitive data.

If you discover a security vulnerability or find sensitive data (credentials,
private URLs, personal data) committed to this public repository, please
**do not open a public issue**. Instead, report it privately using
[GitHub's private vulnerability reporting](../../security/advisories/new) for
this repository, or contact the maintainer directly through their GitHub
profile (@boussecsou).

Please include:

- A description of the issue and its potential impact.
- Steps to reproduce, or the file/commit where sensitive data was found.
- Any suggested remediation, if known.

## Response

This is a small, experimental, community-maintained project without a formal
SLA. Reports will be acknowledged and addressed on a best-effort basis.

## Scope

Out of scope: findings that only affect forks, or issues in third-party
services referenced from documentation (report those upstream instead).
