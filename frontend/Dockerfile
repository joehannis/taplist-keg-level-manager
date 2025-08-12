ARG NODE_VERSION=24
FROM node:${NODE_VERSION} AS frontend-build

# Set the working directory
WORKDIR /app/client

# Copy package.json and package-lock.json for dependency installation
COPY ./package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY ./ ./

# Build the Vite project
RUN npm run build

# Expose the port for the Vite preview server
EXPOSE 4173

# Set the command to run the Vite preview server
CMD ["npm", "run", "preview"]