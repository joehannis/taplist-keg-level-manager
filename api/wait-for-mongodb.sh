#!/bin/bash

host="mongodb"  # The hostname of your MongoDB service
port=27017      # The port your MongoDB service is running on
timeout=60      # Adjust the timeout value as needed

echo "Waiting for MongoDB to become available..."

# Wait for MongoDB to be reachable
while ! nc -z $host $port; do
  sleep 1
  timeout=$((timeout - 1))

  if [ $timeout -eq 0 ]; then
    echo "Timed out waiting for MongoDB to start."
    exit 1
  fi
done

echo "MongoDB is available. Starting your API service..."
exec "$@"