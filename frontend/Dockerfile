FROM node:18 AS server-build
WORKDIR /app/client
COPY ./package*.json ./
RUN npm install
COPY ./ /app/client/
CMD ["npm", "run", "dev"]
