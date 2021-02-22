FROM gitpod/workspace-full

# Install custom tools, runtimes, etc.
# For example "bastet", a command-line tetris clone:
# RUN brew install bastet
#
# More information: https://www.gitpod.io/docs/config-docker/

# be root
USER root

# update all the things
RUN apt-get update -qqy && apt-get upgrade -qqy

# install google-cloud-sdk
ENV PATH "$PATH:/opt/google-cloud-sdk/bin/"
RUN apt-get -qqy update && apt-get -qqy install \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg && \
    echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" \
      | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg \
      | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get -qqy update && apt-get -qqy install \
      google-cloud-sdk

# and now stop being root
USER gitpod

# install angular-cli
RUN npm install -g \
    @angular/cli