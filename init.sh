#!/bin/bash

CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
touch $CONTAINER_ALREADY_STARTED
  echo "-- First container startup --"
  yum update -y
  cd /home/ec2-user/auth-server
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install 16
  mkdir /home/ec2-user/auth-server/node_modules
  npm ci
  screen -S node -dm npm start
else
  echo "-- Not first container startup --"
  yum update -y
  npm ci
  screen -S node -dm npm start
fi
