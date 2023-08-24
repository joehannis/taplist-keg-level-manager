FROM node:18

WORKDIR /app/server
COPY ./package*.json ./
RUN npm install
COPY . ./
CMD ["node", "/app/server/bin/www.js"]
