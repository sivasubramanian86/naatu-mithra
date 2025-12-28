# Kiro IDE Integration

## Token Efficient Ingestion
To minimize token usage while maintaining high accuracy:
1. Only ingest the `schema.md` and the specific city section relevant to the user query.
2. Use `.kiro/.mcp.md` to determine which model to call before sending the full context.

## Local Development
- Run `npm run watch:kiro` to validate changes to `.md` files real-time.
- Use the built-in RAG visualizer to see chunking performance.
