#!/bin/bash

INSTANCE_ALREADY_STARTED="INSTANCE_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e /home/ec2-user/$INSTANCE_ALREADY_STARTED ]; then
touch /home/ec2-user/$INSTANCE_ALREADY_STARTED
  echo "-- First instance startup --"
    cd /home/ec2-user/auth-server
    yum update -y
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    . ~/.nvm/nvm.sh
    nvm install node
    mkdir /home/ec2-user/auth-server/node_modules
    npm ci
    screen -S node -dm npm start
else
  echo "-- Not first instance startup --"
    yum update -y
    npm ci
    screen -S node -dm npm start
fi