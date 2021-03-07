#!/usr/bin/env sh

# exit on error
set -e

# allow providing service account via env var (e.g. running outside of cloud-run)
if [ -n "$SERVICE_ACCOUNT_KEY_BASE64" ]; then
    export GOOGLE_APPLICATION_CREDENTIALS="/root/.config/gcloud/application_default_credentials.json"
    echo "$SERVICE_ACCOUNT_KEY_BASE64" | base64 -d > "$GOOGLE_APPLICATION_CREDENTIALS"
    gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
fi

# set project id
gcloud config set project "$PROJECT_ID"

# run api
NODE_ENV="PRODUCTION" node ./api/index.js