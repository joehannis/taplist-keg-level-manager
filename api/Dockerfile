ARG NODE_VERSION=24
FROM node:${NODE_VERSION} AS server-build

# Set the working directory
WORKDIR /app/server

# Copy only the necessary files for production
COPY ./ ./
COPY ../shared ./shared

# Compile TypeScript to JavaScript
RUN npm install && npm run build && npm prune --omit=dev

# Set the command to run the compiled JavaScript file
CMD ["node", "/app/server/dist/bin/www.js"]
