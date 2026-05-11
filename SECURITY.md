# Security

This repository is intentionally sanitized for public sharing.

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
