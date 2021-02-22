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

COPY ./api /usr/src/app/api/
COPY ./service_account.json /secret/
COPY ./entrypoint.sh /

# Get tagged copy of gcloudrig
RUN curl https://github.com/gcloudrig/gcloudrig/archive/v0.1.0-beta.3.tar.gz > /tmp/gcloudrig.tar.gz
    && tar -C /usr/src/app -xvf /tmp/gcloudrig.tar.gz \

# Build-time arg for project_id
ARG project_id 
ENV PROJECT_ID=$project_id

WORKDIR /usr/src/app/api
RUN npm ci --only=production

EXPOSE 5000/tcp
CMD [ "sh", "-c", "/entrypoint.sh" ]
