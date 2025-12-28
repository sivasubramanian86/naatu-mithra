# Agent Configurations

## Strands Agent (Routing & Logic)
- **Role**: Orchestrator.
- **Goal**: Routing requests between Slang, Travel, and Food modules.
- **Provider**: Internal / Bedrock Custom.

## Gemini Agent (Safety & Context)
- **Role**: Safety Filter & Multi-lingual expert.
- **Goal**: Ensure no toxic content and provide regional nuances.
- **Provider**: Google AI (Gemini 1.5 Pro).

## Token Efficiency
- Use `readme_kiro.md` for context-caching instructions.
- Prefetch common city schemas.

## Environment Setup
Required variables in `.env`:
- `GEMINI_API_KEY`
- `BEDROCK_ACCESS_KEY`
- `BEDROCK_SECRET_KEY`
- `STRANDS_ENDPOINT`
