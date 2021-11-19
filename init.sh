#!/bin/bash

cd /home/ec2-user/auth-server
CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
touch $CONTAINER_ALREADY_STARTED
  echo "-- First container startup --"
  sudo yum update -y
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install node
  sudo chown -R ec2-user /home/ec2-user/auth-server
  npm ci
  screen -S node -dm npm start
else
  echo "-- Not first container startup --"
  sudo yum update -y
  npm ci
  screen -S node -dm npm start
fi
