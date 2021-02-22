#!/usr/bin/env bash

# ensure we're logged in to gcloud
LOGGED_IN_USER=$(gcloud auth list --quiet --filter 'status=ACTIVE' --format 'value(account)' 2>/dev/null)
if [ -z "$LOGGED_IN_USER" ]; then
    echo "ERROR: Not logged in to gcloud; please run 'gcloud auth login'"
    exit 1
fi

# ensure we have a project set (either through env var or via 'gcloudrig config set project')
if [ -z "$GOOGLE_CLOUD_PROJECT" ]; then
    gcloud_config_project=$(gcloud config get-value project --format 'value(.)')
    if [ -z "$gcloud_config_project" ]; then
        echo "ERROR: \$GOOGLE_CLOUD_PROJECT environment variable is not set!"
        exit 1
    else
        GOOGLE_CLOUD_PROJECT="$gcloud_config_project"
    fi
else
    GOOGLE_CLOUD_PROJECT="$gcloud_config_project"
fi

# Create a new IAM service account
gcloud iam service-accounts create gcloudrigkey \
    --project="$GOOGLE_CLOUD_PROJECT" \
    --description="gcloudrigkey for cloud run" \
    --display-name="gcloudrigkey"

# Assign it the "roles/editor" role
gcloud projects add-iam-policy-binding "$GOOGLE_CLOUD_PROJECT" \
    --project="$GOOGLE_CLOUD_PROJECT" \
    --member="serviceAccount:gcloudrigkey@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com" \
    --role="roles/editor"

# Get a key for it and save it as "service_account.json"
gcloud iam service-accounts keys create service_account.json \
    --project="$GOOGLE_CLOUD_PROJECT" \
    --iam-account "gcloudrigkey@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com"