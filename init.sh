#!/bin/bash

CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
touch $CONTAINER_ALREADY_STARTED
  echo "-- First container startup --"
  sudo apk update
  sudo apk upgrade
  sudo apk add --no-cache \
    bash \
    nodejs \
    npm
  sudo addgroup -S node
  sudo adduser -S -D -G node node
  chown -R :node .
  chmod -R 774 .
  sudo su -s /bin/bash -c 'npm ci && npm start' node
else
  echo "-- Not first container startup --"
  sudo su -s /bin/bash -c 'npm ci && npm start' node
fi
