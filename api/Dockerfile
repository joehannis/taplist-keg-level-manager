ARG NODE_VERSION=24
FROM node:${NODE_VERSION} AS server-build

# Set the working directory
WORKDIR /app/server
COPY ./package*.json ./
RUN npm ci --only=production

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the application code
COPY . ./

# Compile TypeScript to JavaScript
RUN npm run build

# Set the command to run the compiled JavaScript file
CMD ["node", "/app/server/dist/api/bin/www.js"]
