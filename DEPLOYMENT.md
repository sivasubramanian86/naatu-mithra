# NaatuMithra Deployment Guide 🚀

This guide provides step-by-step instructions for deploying NaatuMithra to Vercel (Frontend) and GCP (Frontend/Backend).

## 🌍 Live Deployments
- **Frontend (Vercel)**: [https://naatu-mithra-frontend-h58rkyn32.vercel.app](https://naatu-mithra-frontend-h58rkyn32.vercel.app)
- **Frontend (GCP)**: [https://naatu-mithra-ui-193019616300.us-central1.run.app](https://naatu-mithra-ui-193019616300.us-central1.run.app)
- **Backend (GCP)**: [https://naatu-mithra-backend-193019616300.us-central1.run.app](https://naatu-mithra-backend-193019616300.us-central1.run.app)

## 1. Backend: GCP Cloud Run

The Node.js backend is containerized using the root [Dockerfile](Dockerfile).

### Steps
1. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy naatu-mithra-backend \
     --source . \
     --region us-central1 \
     --project naatu-mithra-405338011 \
     --set-env-vars AI_PROVIDER=google,GEMINI_API_KEY=[YOUR_KEY]
   ```

## 2. Frontend: Vercel & GCP

### Vercel (Production)
1. Link your repository in the Vercel Dashboard.
2. Set `VITE_API_URL` to your Backend URL.
3. Deploy.

### GCP (Internal/Fallback)
1. **Build UI Image**:
   ```bash
   gcloud builds submit --config cloudbuild-ui.yaml --project naatu-mithra-405338011 .
   ```
2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy naatu-mithra-ui \
     --image gcr.io/naatu-mithra-405338011/naatu-mithra-ui \
     --region us-central1 \
     --project naatu-mithra-405338011
   ```

## 🛠 Multi-Platform Strategy Recap

| Component | Platform | Configuration |
| :--- | :--- | :--- |
| **Frontend** | Vercel | `VITE_API_URL` env var |
| **Backend** | GCP Cloud Run | `Dockerfile` (Root) |
| **UI Image** | GCP Build | `cloudbuild-ui.yaml` |

## 🧪 Post-Deployment Verification
Verify the following modules are functional:
- **Slang Translator**: Test with "Bantai" (Mumbai).
- **Heritage Cards**: Generate a "Neural Legend" for Vidhana Soudha.
- **Flavor Mapper**: Check if "Dosa" maps to "Savory Crepe".
