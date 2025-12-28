# NaatuMithra Deployment Guide 🚀

This guide provides step-by-step instructions for deploying NaatuMithra to Vercel (Frontend), GCP (Backend), and AWS (AI Orchestration).

## 1. Frontend: Vercel

Vercel is the recommended platform for the React frontend.

### Steps
1. **GitHub Integration**: If you haven't already, push your code to GitHub.
2. **Import Project**: In the [Vercel Dashboard](https://vercel.com/new), import your `naatu-mithra` repository.
3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `src/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-backend-url.a.run.app`).
5. **Deploy**: Click **Deploy**.

---

## 2. Backend: GCP (Cloud Run)

The Node.js backend is optimized for Google Cloud Run using the root `Dockerfile`.

### Prerequisites
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed.
- Docker installed and authenticated (`gcloud auth configure-docker`).

### Steps
1. **Build and Tag**:
   ```bash
   # From the project root
   gcloud builds submit --tag gcr.io/[PROJECT_ID]/naatu-mithra-backend .
   ```
2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy naatu-mithra-backend \
     --image gcr.io/[PROJECT_ID]/naatu-mithra-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars AI_PROVIDER=google,GEMINI_API_KEY=[YOUR_API_KEY]
   ```

---

## 3. Backend & AI: AWS (App Runner & Bedrock)

### AWS App Runner (Backend)
App Runner is the easiest way to deploy the Dockerized backend on AWS.

1. **Dashboard**: Navigate to [AWS App Runner](https://console.aws.amazon.com/apprunner/).
2. **Source**: Select **Source code repository** or **Container registry**.
3. **Deployment**:
   - **Runtime**: Node.js 18 (or use the Dockerfile).
   - **Build Command**: `npm install && cd src/backend && npm install`
   - **Start Command**: `node src/backend/server.js`
4. **Environment**: Add `BEDROCK_REGION`, `BEDROCK_ACCESS_KEY`, and `BEDROCK_SECRET_KEY`.

### AWS Bedrock Agents (AI Orchestration)
Use the provided CloudFormation stack to provision the AI agents.

```bash
# Using AWS CLI
aws cloudformation create-stack \
  --stack-name NaatuMithraAgents \
  --template-body file://infra/aws-stack.yml \
  --capabilities CAPABILITY_IAM
```

---

## 🛠 Multi-Platform Strategy Recap

| Component | Platform | Configuration |
| :--- | :--- | :--- |
| **Frontend** | Vercel | `src/frontend/vercel.json` |
| **Backend** | GCP / AWS | `Dockerfile` |
| **AI Agents** | AWS Bedrock | `infra/aws-stack.yml` |

## 🧪 Post-Deployment Verification
Once deployed, verify the connection from the frontend to the backend by checking the "Slang Translator" or "Food Mood" features in the browser console.
