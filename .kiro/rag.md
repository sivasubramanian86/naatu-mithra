# Retrieval-Augmented Generation (RAG)

## Ingestion Pipeline
1. **Parse**: Extract content from `/.kiro/*.md`.
2. **Chunk**: Paragraph-level chunking with overlap.
3. **Embed**: Use `amazon.titan-embed-text-v1`.
4. **Upsert**: Push to OpenSearch / Pinecone.

## Vector Mapping
- **Index**: `naatu-mithra-kb`
- **Fields**: `text`, `city_id`, `category`, `embedding`.

## Retrieval
- k=5 nearest neighbors.
- Filter by `city_id` if provided in query.
