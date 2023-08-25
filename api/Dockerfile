FROM node:18

WORKDIR /app/server
COPY ./package*.json ./
RUN npm install
COPY . ./
COPY wait-for-mongodb.sh /usr/src/app/wait-for-mongodb.sh
RUN chmod +x /usr/src/app/wait-for-mongodb.sh
CMD ["./wait-for-mongodb.sh","node", "/app/server/bin/www.js"]
