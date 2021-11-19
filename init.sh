#!/bin/bash

cd /home/ec2-user/auth-server
CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
touch $CONTAINER_ALREADY_STARTED
  echo "-- First container startup --"
  yum update -y
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  . ~/.nvm/nvm.sh
  nvm install node
  npm ci
  su -s /bin/bash -c 'npm start' ec2-user
else
  echo "-- Not first container startup --"
  yum update -y
  npm ci
  su -s /bin/bash -c 'npm start' ec2-user
fi
