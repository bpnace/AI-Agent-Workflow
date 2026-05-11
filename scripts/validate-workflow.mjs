import fs from 'node:fs';

const workflowPath = new URL('../workflows/ai-agent-workflow.sanitized.json', import.meta.url);
const raw = fs.readFileSync(workflowPath, 'utf8');
const workflow = JSON.parse(raw);

const failures = [];
const text = raw;

const bannedPatterns = [
  [/5920909215/, 'private Telegram chat id'],
  [/bpnace/i, 'private GitHub username'],
  [/bumpinace/i, 'private local username/email'],
  [/NetherPortal/i, 'private memory repository name'],
  [/codariq/i, 'private project identifier'],
  [/stackwerkhaus/i, 'private project identifier'],
  [/Tarik|Marshall/i, 'private personal name'],
  [/automation\.codariq\.de/i, 'private n8n host'],
  [/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/, 'JWT-like token'],
  [/[0-9]{8,10}:[A-Za-z0-9_-]{30,}/, 'Telegram bot token-like value'],
  [/sk-[A-Za-z0-9_-]{20,}/, 'OpenAI-style API key'],
  [/gh[pousr]_[A-Za-z0-9_]{20,}/, 'GitHub token-like value'],
  [/N8N_API_KEY\s*=/, 'n8n API key env assignment'],
];

for (const [pattern, label] of bannedPatterns) {
  if (pattern.test(text)) failures.push(`Found ${label}`);
}

function walk(value, path = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => walk(entry, [...path, String(index)]));
    return;
  }
  if (value && typeof value === 'object') {
    if (Object.prototype.hasOwnProperty.call(value, 'credentials')) {
      failures.push(`Found credentials block at ${path.join('.') || '<root>'}`);
    }
    for (const [key, child] of Object.entries(value)) {
      walk(child, [...path, key]);
    }
  }
}

walk(workflow);

const nodeTypes = new Set((workflow.nodes || []).map((node) => node.type));
const requiredTypes = [
  'n8n-nodes-base.telegramTrigger',
  '@n8n/n8n-nodes-langchain.chatTrigger',
  '@n8n/n8n-nodes-langchain.agent',
  'n8n-nodes-base.gmail',
  'n8n-nodes-base.googleCalendar',
  'n8n-nodes-base.notion',
  'n8n-nodes-base.httpRequest',
  'n8n-nodes-base.scheduleTrigger',
];

for (const type of requiredTypes) {
  if (!nodeTypes.has(type)) failures.push(`Missing expected node type: ${type}`);
}

if (!Array.isArray(workflow.nodes) || workflow.nodes.length < 50) {
  failures.push('Workflow has unexpectedly few nodes');
}

if (!workflow.connections || Object.keys(workflow.connections).length < 20) {
  failures.push('Workflow has unexpectedly few connections');
}

if (failures.length) {
  console.error('Validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'ok',
  workflow: workflow.name,
  nodes: workflow.nodes.length,
  nodeTypes: nodeTypes.size,
}, null, 2));
