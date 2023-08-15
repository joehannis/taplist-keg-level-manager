#!/bin/bash

# Start the server
node ./api/bin/www.js &

# Build the frontend
cd ./frontend
npm run build

# Start the frontend (in the background)
npm run preview &

sleep 5
open http://localhost:4173
