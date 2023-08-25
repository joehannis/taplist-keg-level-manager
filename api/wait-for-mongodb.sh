#!/bin/bash

host="mongodb"
port=27017     
timeout=60  

echo "Waiting for MongoDB to become available..."


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