#!/bin/bash

# Kill the server process
pkill -f "node ./api/bin/www.js"

# Get the process ID using the specified port number
PORT_NUMBER=4173
PID=$(lsof -i :$PORT_NUMBER -t)

if [ -n "$PID" ]; then
  echo "Killing process with PID $PID"
  kill $PID
else
  echo "No process found using port $PORT_NUMBER"
fi

