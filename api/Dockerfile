ARG NODE_VERSION=24
FROM node:${NODE_VERSION} AS server-build

# Set the working directory
WORKDIR /app/server

# Copy only the necessary files for production
COPY ./package*.json ./
COPY ./tsconfig.prod.json ./tsconfig.json
COPY ./nodemon.prod.json ./nodemon.json
COPY ./shared ./shared
COPY ./bin ./bin
COPY ./controllers ./controllers
COPY ./routes ./routes

# Compile TypeScript to JavaScript
RUN npm install && npm run build && npm prune --omit=dev

# Set the command to run the compiled JavaScript file
CMD ["node", "/app/server/dist/bin/www.js"]