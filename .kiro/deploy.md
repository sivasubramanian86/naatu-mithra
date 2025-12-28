# Multi-Cloud Deployment

## Primary: Vercel (Frontend & Serverless)
- Root: `/src/frontend`
- Backend Functions: `/src/backend` (mapped via `vercel.json`)
- Environment: Add all secrets to Vercel Project Settings.

## Secondary: AWS Amplify (Global scale)
- Build command: `npm run build`
- Deploy via `.github/workflows/deploy-aws.yml`.

## Tertiary: GCP Cloud Run (Backend container)
- Dockerize `/src/backend`.
- Push to Artifact Registry.
- Deploy via Cloud Run.
