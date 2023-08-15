#!/bin/bash

# Start the server
cd api
npm install
node ./bin/www.js &

# Build the frontend
cd ../frontend
npm install
npm run build

# Start the frontend (in the background)
npm run preview &

sleep 5
open http://localhost:4173
