ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-slim AS server-build

WORKDIR /app/server


COPY ./ ./
COPY ../shared ./shared


RUN npm install && npm run build && npm prune --omit=dev


CMD ["node", "/app/server/dist/bin/www.js"]
