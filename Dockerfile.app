#
#  Instructions to build vsnthdev/alpa-app docker image.
#  Created On 18 February 2022
#

# This image only contains the frontend app, an image of the
# API can be found at vsnthdev/alpa-api.

# small & updated base image
FROM node:17-alpine3.13

# run Node.js in production
ENV NODE_ENV=production

# where the API source code will be
WORKDIR /opt/alpa

# copy this directory to the image
COPY . /opt/alpa

# install sirv static file server
RUN npm install --global sirv-cli && \
    rm -rf /var/cache/apk/*

# run @alpa/app using sirv on contianer boot
CMD cd app/dist && sirv . --port 3000 --host "0.0.0.0" --single
