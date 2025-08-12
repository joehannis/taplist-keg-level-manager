ARG NODE_VERSION=24
FROM node:${NODE_VERSION} AS server-build
WORKDIR /app/server
COPY ./package*.json ./
RUN npm ci
RUN apt-get update
RUN apt-get --assume-yes install udev
COPY . ./
CMD ["node", "/app/server/bin/www.js"]
