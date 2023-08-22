FROM --platform=${BUILDPLATFORM} node:18 AS client-build
WORKDIR /app/client
COPY ./package*.json ./
RUN npm install
COPY ./ /app/client/
CMD ["npm", "run", "dev"]