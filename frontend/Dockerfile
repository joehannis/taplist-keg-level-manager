ARG NODE_VERSION=24
FROM node:${NODE_VERSION} AS frontend-build

WORKDIR /app/client
COPY ./package*.json ./
RUN npm ci
COPY ./ ./
RUN npm run build

CMD ["npm", "run", "preview"]