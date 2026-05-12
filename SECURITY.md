# Security Policy

This repository is intentionally sanitized for public sharing and public
portfolio review. Please do not open public issues for sensitive vulnerabilities,
leaked secrets, private account identifiers, or abuse paths.

## Supported Branch

| Branch | Status |
| --- | --- |
| `main` | Actively maintained for public showcase hygiene |

## Reporting

Send a private report to `info@stackwerkhaus.de` with:

- affected workflow node, script, file, or configuration
- reproduction steps
- expected impact
- safe evidence that does not include secrets

Do not include live credentials, tokens, personal data, production payloads,
private account identifiers, or private infrastructure details in public issues,
forks, screenshots, or pull requests.

## Sanitized Workflow Guardrails

Do not commit:

- n8n credential exports
- Telegram bot tokens or chat IDs
- API keys
- private GitHub repository names
- private Obsidian or local filesystem paths
- real webhook secrets
- exported executions with payload data

Run the validator before committing:

```bash
npm test
```

## Baseline

Dependabot alerts, automated security updates, and GitHub code scanning default
setup are enabled for this public repository. The repository also includes a
Dependabot configuration for dependency and GitHub Actions update checks.
