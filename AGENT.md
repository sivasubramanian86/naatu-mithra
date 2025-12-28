# NaatuMithra AI Agents Guide

This document outlines the agents integrated into NaatuMithra and how they work together under the Model Context Protocol (MCP).

## Multi-Provider E2E Solutions

NaatuMithra supports three distinct end-to-end provider paths. The choice of provider determines the model, orchestration, and scaling infrastructure used.

### 1. AWS Path (Primary)
- **Orchestration**: Strands Agents.
- **Components**: Amazon Bedrock, Bedrock Agent Core.
- **Scaling**: AWS Fargate / Bedrock Serverless Agents.
- **Selection**: Set `AI_PROVIDER=aws` in `.env`.

### 2. GCP Path
- **Orchestration**: Vertex AI SDK.
- **Components**: Gemini 1.5 Pro/Flash, Vertex AI Agent Builder.
- **Scaling**: GCP Cloud Run.
- **Selection**: Set `AI_PROVIDER=gcp` in `.env`.

### 3. Open Source Path (Fallback)
- **Orchestration**: LangGraph / Provider-Agnostic logic.
- **Components**: Llama 3 / Mistral (via local/self-hosted endpoints).
- **Scaling**: Kubernetes / Standalone Docker.
- **Selection**: Set `AI_PROVIDER=opensource` in `.env`.

## Agent Inventory (Functional Roles)

### Strands Agent (AWS Path Exclusive)
- **Role**: Provider-specific Orchestrator.
- **Goal**: Routing requests between Slang, Travel, and Food modules within the AWS ecosystem.

### Gemini Agent (Global Safety)
- **Role**: Safety Filter (Cross-Provider).
- **Goal**: Ensure no toxic content across ALL provider paths before they reach the specific E2E model.

## Operational Flow (Multi-Agent Architecture)

1. **User Query** -> Backend API (includes optional `choice`).
2. **MCP Controller** -> Calls **Gemini** (Global Safety Filter).
3. **Provider Factory** -> Routes to specific E2E Solution (**AWS**, **GCP**, or **OS**).
4. **Agent Orchestrator** -> Processes task using provider-specific logic and Knowledge Base (.kiro).
5. **Scaling Layer** -> Bedrock Agent Core or Cloud Run ensures reliability.

## Configuration & Security

### Environment Variables
All agent secrets MUST be stored in a `.env` file at the root. Use `.env.template` as a starting point.

```bash
# Example .env configuration
GEMINI_API_KEY=AIzaSy...
BEDROCK_ACCESS_KEY=AKIA...
BEDROCK_SECRET_KEY=wJalrX...
```

### Protection of Secrets
- **.gitignore**: The `.env` file is explicitly ignored to prevent accidental leaks.
- **Validation**: Root scripts check for the presence of keys before starting the server.
