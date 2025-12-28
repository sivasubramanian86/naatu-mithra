# NaatuMithra 🇮🇳
### Your Local Friend for Food, Travel, and Culture.

NaatuMithra is a context-aware companion for navigating **30 major Indian cities**. It uses a retrieval-augmented generation (RAG) pipeline powered by Google Gemini and AWS Bedrock to translate slang, predict travel heuristics, and map local flavors.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- Google AI Studio API Key (for Gemini)
- AWS Account (for Bedrock, optional fallback)

### 2. Environment Setup
Create a `.env` file in the root based on [.env.template](.env.template):
```env
# AI Providers
GEMINI_API_KEY=your_key
AI_PROVIDER=google # or 'aws'

# Server Config
PORT=3001
CORS_ORIGIN=http://localhost:5173

# Frontend (for local dev)
VITE_API_URL=http://localhost:3001
```

### 3. Installation & Running
```bash
# Install and start all components
npm install
npm start # Starts the backend on 3001
cd src/frontend && npm run dev # Starts Vite on 5173
```

## 🛠️ Features & Standardized Naming
1. **Slang Translator**: Real-time regional linguistic paraphrasing.
2. **Food Mood Mapper**: Connecting emotional states to local gastronomic delights.
3. **Heritage Cards**: Storytelling engine for architectural and historical legends.
4. **Travel Chaos Oracle**: Predictive "Road Karma" and transit efficiency modeling.
5. **Flavor Mapper**: Global mental model mapping for regional dishes.
6. **Soundboard**: 80+ city-specific atmospheric audio clips.

## 🧠 Technical Architecture

### Model Context Protocol (MCP)
NaatuMithra uses a centralized **Provider Factory** to route tasks:
- **Provider Broker**: Located in `src/backend/mcp/controller.js`.
- **Factory Logic**: Dynamically switches between `gcpSolution.js` (Vertex/Gemini) and `awsSolution.js` (Bedrock).
- **Prompt Library**: `src/backend/lib/aiPrompts.js` ensures personality consistency.

### Frontend Component Hierarchy
- `src/frontend/src/pages/`: Main feature modules (Heritage, Food, Slang, etc.)
- `src/frontend/src/components/`: Reusable UI elements (Navigation, Layout).
- `src/frontend/src/services/aiService.js`: Secure backend proxy for all AI requests.

## 📡 API Reference

### `POST /api/translate-slang`
- **Body**: `{ city, text, choice }`
- **Returns**: Slang breakdown and paraphrased text.

### `POST /api/food-mood`
- **Body**: `{ city, mood, choice }`
- **Returns**: Local dish suggestion with AI-generated reasoning.

### `POST /api/heritage/:city`
- **Body**: `{ site }`
- **Returns**: "Neural Legend" deep-dive for the specific site.

### `POST /api/predict-travel`
- **Body**: `{ origin, destination, mission, city }`
- **Returns**: Witty "Road Karma" forecast.

### `POST /api/mindmap`
- **Body**: `{ local_dish, city }`
- **Returns**: Nodes and edges for the Flavor Mindmap.

## ☁️ Deployment

### Backend (GCP Cloud Run)
Deployed as a secure container using the root [Dockerfile](Dockerfile).
- **Service**: `naatu-mithra-backend`
- **Config**: Ensure `GEMINI_API_KEY` is set in Cloud Run env vars.

### Frontend (Vercel / GCP)
- **Vercel**: Link repository, set `VITE_API_URL` to the backend endpoint.
- **GCP**: Use [Dockerfile.frontend](Dockerfile.frontend) and `cloudbuild-ui.yaml`.

## 📂 Data Models Specification

NaatuMithra uses a structured schema for regional artifacts:

- **City Profile**: `id`, `name`, `nickname`, `slang[]`, `foods[]`, `transit[]`.
- **Heritage Artifact**: `id`, `city`, `title`, `fact`, `image_url`.
- **Food Mental Model**: `local_dish`, `global_equivalent`, `flavor_notes`.
- **Road Karma**: `city`, `mode`, `health_score`, `carbon_score`.

## 🧪 Testing & Verification
### Manual Verification Plan
1. **Linguistic Audit**: Enter "Maga" for Bengaluru in the Slang Translator; verify the AI explains it as "Friend/Bro" in both English and Kannada script.
2. **Heritage Storytelling**: Generate a "Neural Legend" for Charminar (Hyderabad); check for historical accurate "Naatu" storytelling.
3. **Food Mood Logic**: Select "Nostalgic" in Kolkata; check if "Puchka" or "Mishti" is suggested with a culturally relevant note.
4. **Cloud Connectivity**: Verify that frontend requests are hitting `${VITE_API_URL}/api/*` and returning valid JSON.

## 📄 License
MIT License.
