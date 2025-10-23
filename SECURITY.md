```markdown
# Security Policy

We take security seriously. This document outlines how to report vulnerabilities and explains how we handle secrets.

Reporting a vulnerability
- If you discover a security issue, please do NOT open a public issue.
- Instead, contact the project lead privately: Wiper15 (use the repo contact or DM on Discord).
- Provide:
  - A clear summary of the issue
  - Steps to reproduce
  - Any PoC (proof-of-concept) code or screenshots
  - Suggested mitigation (if you have one)

What we will do
- Acknowledge your report within 48 hours.
- Triage and respond with planned remediation steps.
- Public disclosure will be coordinated with the reporter.

Secrets & keys
- Never commit secrets, API keys, or credentials to the repository.
- Use Cloudflare Worker secrets, Replit secrets, or GitHub Actions secrets for CI/deploy.
- If a secret is accidentally committed, rotate it immediately and notify maintainers.

Dependencies and supply chain
- We will periodically review third-party dependencies and apply updates for critical security issues.
- If you find a vulnerable dependency, open an issue and mention `security`.

Data & privacy
- This project uses Arc testnet and Circle testnet only — no real funds by default.
- Do not store or expose sensitive personal data in logs or demo content.

Contact
- Report security issues privately to: Wiper15 (via Discord or repo contact).
```
