ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-slim AS frontend-build


WORKDIR /app/client


COPY ./src ./

EXPOSE 4173


RUN npm ci && npm run build && npm prune --omit=dev


CMD ["npm", "run", "preview"]