# AI Agent Workflow

<p>
  <img alt="n8n" src="https://img.shields.io/badge/n8n-workflow-EA4B71?style=flat-square&logo=n8n&logoColor=white" />
  <img alt="AI Agent" src="https://img.shields.io/badge/AI%20Agent-tool%20router-111827?style=flat-square" />
  <img alt="Telegram" src="https://img.shields.io/badge/Telegram-bot-26A5E4?style=flat-square&logo=telegram&logoColor=white" />
  <img alt="GitHub Memory" src="https://img.shields.io/badge/GitHub-memory-181717?style=flat-square&logo=github&logoColor=white" />
  <img alt="Sanitized" src="https://img.shields.io/badge/Sanitized-public%20safe-2ea043?style=flat-square" />
</p>

Sanitized n8n workflow for a personal AI operations agent.

This repo is a public, recruiter-friendly version of a real automation workflow. It keeps the architecture and implementation shape visible while removing private credentials, personal account IDs, private repository names, webhook secrets, and local paths.

## What this shows

- Telegram and n8n chat input for a personal assistant workflow
- Voice transcription and photo analysis branches
- AI agent loop with tool routing
- Gmail search/read/draft actions
- Google Calendar read/create actions
- Notion CRM search/read/create/update actions
- GitHub-backed markdown memory as a portable memory store
- Scheduled morning, pre-meeting, midday, evening, and weekly heartbeat prompts
- Validation script that blocks leaked credentials before publishing

## Architecture

```text
Telegram / Chat / Schedule
        |
Normalize input and route by source
        |
AI Agent
        |
Tool router
        |
Gmail | Calendar | Notion | GitHub memory
        |
Final response back to chat or Telegram
```

## Repo structure

```text
workflows/ai-agent-workflow.sanitized.json  Sanitized n8n export
scripts/validate-workflow.mjs              JSON and secret-leak validation
.env.example                               Example environment variables
SECURITY.md                                Handling rules for secrets
```

## Import

1. Import `workflows/ai-agent-workflow.sanitized.json` into n8n.
2. Reconnect credentials for Telegram, OpenAI, DeepSeek, Gmail, Google Calendar, Notion, and GitHub.
3. Replace placeholder values such as `YOUR_TELEGRAM_CHAT_ID`, `YOUR_GITHUB_USER/YOUR_MEMORY_REPO`, `work@example.com`, and `personal@example.com`.
4. Run a dry test with chat input before enabling schedules or Telegram triggers.

## Validate before publishing

```bash
npm test
```

The validator fails if the workflow contains n8n credential references, private identifiers from the original workflow, common token formats, or real secret-like values.

## Notes

This is a showcase workflow, not a drop-in production bundle. The original private deployment used real credentials and personal memory paths. Those have intentionally been replaced with placeholders.
