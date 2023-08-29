FROM node AS frontend-build
WORKDIR /app/client
COPY ./package*.json ./
RUN npm install
COPY ./ /app/client/
CMD ["npm", "run", "dev"]
