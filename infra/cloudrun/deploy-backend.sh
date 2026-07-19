#!/usr/bin/env bash
# Deploys the backend to Cloud Run. Requires gcloud CLI auth + a project
# with Cloud Run, Artifact Registry, and Secret Manager enabled.
set -euo pipefail

PROJECT_ID="${GOOGLE_CLOUD_PROJECT:?Set GOOGLE_CLOUD_PROJECT}"
REGION="${REGION:-us-central1}"
SERVICE="fifa-ai-backend"

gcloud builds submit ../backend --tag "gcr.io/${PROJECT_ID}/${SERVICE}"

gcloud run deploy "${SERVICE}" \
  --image "gcr.io/${PROJECT_ID}/${SERVICE}" \
  --platform managed \
  --region "${REGION}" \
  --allow-unauthenticated \
  --set-env-vars "ENVIRONMENT=production,DEMO_MODE=false" \
  --set-secrets "GOOGLE_API_KEY=gemini-api-key:latest,JWT_SECRET_KEY=jwt-secret:latest"
