# NaatuMithra 🇮🇳
### Your Local Friend for Food, Travel, and Culture.

NaatuMithra is a context-aware companion for navigating 10 major Indian cities. It uses a retrieval-augmented generation (RAG) pipeline powered by Bedrock and Gemini to translate slang, predict travel heuristics, and map local flavors.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- AWS Account (for Bedrock)
- Google AI Studio API Key (for Gemini)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-repo/naatu-mithra.git
cd naatu-mithra

# Install root dependencies
npm install

# Setup environment variables
cp .env.template .env
# Open .env and add your GEMINI_API_KEY and BEDROCK credentials.
```

### 3. Running Locally
```bash
# Start backend (Port 3001)
cd src/backend && npm install && npm start

# Start frontend (Vite)
cd src/frontend && npm install && npm run dev
```

## 🎨 Naatu Design System
NaatuMithra features a custom, premium design system built with **Tailwind CSS**:
- **Palette**: Earthy tones (Terracotta, Mustard, Sage Green).
- **Typography**: Playfair Display (Headings) + Nunito (Body).
- **Aesthetics**: Glassmorphism, Cinematic Hero sections, and mobile-first responsiveness.

## 📂 Project Structure
- `/.kiro/`: Multi-city knowledge base (Markdown).
- `/src/frontend/`: React + Vite frontend with Tailwind/Vanilla CSS.
- `/src/backend/`: Node.js + Express backend with MCP integration.
- `/scripts/`: Validation and ingestion pipelines.

## 🧠 AI Agents & MCP
NaatuMithra utilizes the **Model Context Protocol (MCP)** to route tasks:
- **Safety**: Gemini 1.5 Flash (Regional sensitivity).
- **Nuance**: Claude 3 (Context-aware paraphrasing).
- **Core Logic**: Strands Agent (Orchestration).

## ☁️ Deployment

### Frontend (Vercel)
1. Push your code to GitHub.
2. Link your repository in the Vercel Dashboard.
3. Configure the **Build Command**: `npm run build` and **Output Directory**: `dist`.
4. Add Environment Variables:
   - `VITE_API_URL`: URL of your deployed backend.
   - `VITE_MAPS_API_KEY`: Your Mapbox/Google Maps key.
5. Click **Deploy**.

### Backend
- Deploy the `/src/backend` to **AWS Lambda** (via Serverless) or **GCP Cloud Run**.

## 📄 License
MIT License.
