#!/usr/bin/env sh

# exit on error
set -e

# activate service account and set project id
gcloud auth activate-service-account --key-file=/secret/service_account.json
gcloud config set project "$PROJECT_ID"

# run node app
NODE_ENV="PRODUCTION" node ./index.js