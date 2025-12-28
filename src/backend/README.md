# NaatuMithra Backend 🧠

The backend for NaatuMithra is a Node.js/Express server that orchestrates AI responses and provides regional context via MCP.

## 🛠 Tech Stack
- **Node.js**: Runtime environment.
- **Express**: Web framework for the API.
- **Model Context Protocol (MCP)**: For integrating various AI tools and resources.
- **Gemini & Bedrock**: Powering the RAG and creative generation.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in the root directory based on `.env.template`.

### 3. Start Server
```bash
npm start
```
The server runs on port 3001 by default.

## 📂 Structure
- `/handlers`: Express route handlers.
- `/mcp`: MCP-specific configurations and tools.
- `/lib`: Common utility functions.
