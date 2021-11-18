#!/bin/bash

cd /home/ec2-user/auth-server
CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
touch $CONTAINER_ALREADY_STARTED
  echo "-- First container startup --"
  sudo yum update -y
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  . /home/ec2-user/.nvm/nvm.sh
  nvm install node
  chmod -R 774 /home/ec2-user/auth-server
  sudo npm ci
  npm start
else
  echo "-- Not first container startup --"
  sudo yum update -y
  sudo npm ci
  npm start
fi
