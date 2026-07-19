# Deployment Guide

## Local development

```bash
# Backend
cd backend
cp .env.example .env
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8080

# Frontend (separate terminal)
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Visit `http://localhost:3000`. The frontend proxies `/api/backend/*` to
`NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8080`).

## Docker Compose (both services)

```bash
cd infra
docker compose up --build
```

## Google Cloud Run (production)

1. Enable APIs: Cloud Run, Cloud Build, Artifact Registry, Secret
   Manager, Firestore, BigQuery, Pub/Sub, Vertex AI.
2. Store secrets: `gcloud secrets create gemini-api-key`, `jwt-secret`.
3. Deploy backend: `infra/cloudrun/deploy-backend.sh`
4. Deploy frontend: `BACKEND_URL=<backend-url> infra/cloudrun/deploy-frontend.sh`
5. Set `DEMO_MODE=false` and a real `GOOGLE_API_KEY` (or migrate
   `gemini_service.py` to the Vertex AI SDK for enterprise auth) to
   switch every agent from mock to live Gemini reasoning -- no other
   code changes required.

## Going from demo mode to live Google services

Every Google integration in `backend/app/services/` is written against
the real SDK's shape and falls back to a mock only when credentials are
absent or `DEMO_MODE=true`. To go live:

| Service | What to set |
|---|---|
| Gemini | `GOOGLE_API_KEY`, `DEMO_MODE=false` |
| Maps Platform | `GOOGLE_MAPS_API_KEY` |
| Firestore | `GOOGLE_APPLICATION_CREDENTIALS`, `FIREBASE_PROJECT_ID` |
| BigQuery | `GOOGLE_CLOUD_PROJECT`, `BIGQUERY_DATASET` |
| Pub/Sub | `GOOGLE_CLOUD_PROJECT`, `PUBSUB_TOPIC_INCIDENTS` |
