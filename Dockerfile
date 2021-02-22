FROM node:10

RUN apt-get update -qqy && apt-get upgrade -qqy

# Downloading gcloud package
RUN curl https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz > /tmp/google-cloud-sdk.tar.gz

# Installing the package
RUN mkdir -p /usr/local/gcloud \
  && tar -C /usr/local/gcloud -xvf /tmp/google-cloud-sdk.tar.gz \
  && /usr/local/gcloud/google-cloud-sdk/install.sh

# Adding the package path to local
ENV PATH $PATH:/usr/local/gcloud/google-cloud-sdk/bin

# Working directory for gcloudrig-cloud-run
WORKDIR /usr/src/app

# Get tagged copy of gcloudrig
RUN curl https://github.com/gcloudrig/gcloudrig/archive/v0.1.0-beta.3.tar.gz > /tmp/gcloudrig.tar.gz
    && tar -C /usr/src/app -xvf /tmp/gcloudrig.tar.gz \

# Build-time arg for project_id
ARG project_id 
ENV PROJECT_ID=$project_id

# Hard-code service account key and set project (TEMPORARY SOLUTION)
RUN gcloud auth activate-service-account --key-file ./service_account.json
RUN gcloud config set project $PROJECT_ID

# npm setup
WORKDIR /usr/src/app/api
RUN npm ci --only=production

# make it so
EXPOSE 8080
CMD [ "node", "index.js" ]
