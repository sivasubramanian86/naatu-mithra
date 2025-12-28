# Model Context Protocol (MCP)

## Configuration
Tasks are mapped to specific AI models based on complexity and cost.

| Task | Model Provider | Model ID |
| :--- | :--- | :--- |
| Slang Paraphrase | Bedrock | anthropic.claude-3-haiku |
| Mindmap Gen | Bedrock | anthropic.claude-3-sonnet |
| Heritage Legend | Bedrock | amazon.titan-text-express |
| Safety Filtering | Gemini | gemini-1.5-flash |

## Safety Policy
- Never output offensive or derogatory slang.
- Validate travel coordinates before ranking.
- Anonymize user IDs in audit logs.

## Audit Logging
All calls are logged to `logs/bedrock_audit.log` via `controller.js`.
