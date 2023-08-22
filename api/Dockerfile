FROM --platform=${BUILDPLATFORM} node:18 AS server-build
WORKDIR /app/server
COPY ./package*.json ./
RUN npm install
COPY . ./
CMD ["node", "/app/server/bin/www.js"]