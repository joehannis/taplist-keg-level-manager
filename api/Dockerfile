ARG NODE_VERSION=24
FROM node:${NODE_VERSION} AS server-build

# Set the working directory
WORKDIR /app/server

# Copy only the necessary files for production
COPY ./package*.json ./
COPY ./tsconfig.prod.json ./tsconfig.json
COPY ./nodemon.prod.json ./nodemon.json

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY ./bin ./bin
COPY ./controllers ./controllers
COPY ./routes ./routes

# Compile TypeScript to JavaScript
RUN npm run build

# Set the command to run the compiled JavaScript file
CMD ["node", "/app/server/dist/api/bin/www.js"]