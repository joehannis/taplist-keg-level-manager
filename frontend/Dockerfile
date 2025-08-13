ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-slim AS frontend-build


WORKDIR /app/client


COPY ./src ./
COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./vite.config.ts ./

EXPOSE 4173


RUN apt-get update && \
    apt-get install -y python3 python3-pip make g++ && \
    rm -rf /var/lib/apt/lists/* && \
    npm ci && npm run build && npm prune --omit=dev


CMD ["npm", "run", "preview"]