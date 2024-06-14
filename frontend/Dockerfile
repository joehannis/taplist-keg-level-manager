FROM node:21 AS frontend-build
WORKDIR /app/client
COPY ./package*.json ./
RUN npm ci
RUN npm install react-toggle-slider
COPY ./ ./
RUN npm run build
CMD ["npm", "run", "preview"]
