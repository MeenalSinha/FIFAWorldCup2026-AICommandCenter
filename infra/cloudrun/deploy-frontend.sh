#!/usr/bin/env bash
# Deploys the frontend to Cloud Run, pointed at the deployed backend URL.
set -euo pipefail

PROJECT_ID="${GOOGLE_CLOUD_PROJECT:?Set GOOGLE_CLOUD_PROJECT}"
REGION="${REGION:-us-central1}"
SERVICE="fifa-ai-frontend"
BACKEND_URL="${BACKEND_URL:?Set BACKEND_URL to the deployed backend Cloud Run URL}"

gcloud builds submit ../frontend --tag "gcr.io/${PROJECT_ID}/${SERVICE}"

gcloud run deploy "${SERVICE}" \
  --image "gcr.io/${PROJECT_ID}/${SERVICE}" \
  --platform managed \
  --region "${REGION}" \
  --allow-unauthenticated \
  --set-env-vars "NEXT_PUBLIC_API_URL=${BACKEND_URL}"
