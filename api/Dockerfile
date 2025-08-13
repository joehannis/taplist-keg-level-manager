ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-slim AS server-build

WORKDIR /app/server


COPY ./bin ./bin
COPY ./controllers ./controllers
COPY ./routes ./routes
COPY ./package*.json ./
COPY ../shared ./shared
COPY ./tsconfig.prod.json ./


RUN apt-get update && \
    apt-get install -y python3 python3-pip make g++ && \
    rm -rf /var/lib/apt/lists/* && \
    npm ci && npm run build && npm prune --omit=dev


CMD ["node", "/app/server/dist/bin/www.js"]
