#
#  Instructions to build vsnthdev/alpa-api docker image.
#  Created On 18 February 2022
#

# This image only contains the API, an image of the
# frontend can be found at vsnthdev/alpa-app.

# small & updated base image
FROM node:17-alpine3.13

# run Node.js in production so the API
# can take the necessary security measures
ENV NODE_ENV=production

# where the API source code will be
WORKDIR /opt/alpa

# copy this directory to the image
COPY . /opt/alpa

# install dependencies
RUN npm install --prod && \
    rm -rf /var/cache/apk/*

# run @alpa/api on contianer boot
CMD ["node", "api/dist/index.js", "--verbose"]
