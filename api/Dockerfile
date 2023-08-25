FROM node:18
RUN apt-get update && apt-get install -y netcat-traditional net-tools
WORKDIR /app/server
COPY ./package*.json ./
RUN npm install
COPY . ./
COPY wait-for-mongodb.sh ./wait-for-mongodb.sh
RUN chmod +x ./wait-for-mongodb.sh
CMD ["bash", "./wait-for-mongodb.sh", "node", "/app/server/bin/www.js"]
