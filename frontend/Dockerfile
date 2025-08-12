ARG NODE_VERSION=24
FROM node:${NODE_VERSION} AS frontend-build

# Set the working directory
WORKDIR /app/client

# Copy package.json and package-lock.json for dependency installation
COPY ./ ./

EXPOSE 4173

# Build the Vite project
RUN npm ci && npm run build && npm prune --omit=dev

# Set the command to run the Vite preview server
CMD ["npm", "run", "preview"]