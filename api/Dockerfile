FROM node AS server-build
WORKDIR /app/server
COPY ./package*.json ./
RUN npm ci
COPY . ./
CMD ["node", "/app/server/bin/www.js"]
