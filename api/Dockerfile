FROM node:22-slim AS server-build

WORKDIR /app/server


COPY ./bin ./bin
COPY ./controllers ./controllers
COPY ./routes ./routes
COPY ./zod ./zod
COPY ./package*.json ./
COPY ../shared ./shared
COPY ./tsconfig.prod.json ./


RUN apt-get update && \
    apt-get install -y python3 python3-pip make g++ && \
    rm -rf /var/lib/apt/lists/* && \
    npm ci && npm run build && npm prune --omit=dev


FROM node:${NODE_VERSION}-slim AS runtime

WORKDIR /app/server
COPY --from=server-build /app/server/package*.json ./
COPY --from=server-build /app/server/dist ./dist
COPY --from=server-build /app/server/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/bin/www.js"]