ARG NODE_VERSION=24
ARG NGINX_VERSION=nginx:latest

FROM node:${NODE_VERSION}-slim AS frontend-build


WORKDIR /app/client


COPY ./src ./src
COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./vite.config.ts ./

EXPOSE 4173


RUN apt-get update && \
    apt-get install -y python3 python3-pip make g++ && \
    rm -rf /var/lib/apt/lists/* && \
    npm ci && npm run build && npm prune --omit=dev
# ---- Runtime stage ----

FROM ${NGINX_VERSION} AS runtime

COPY --from=frontend-build /app/client/src/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]