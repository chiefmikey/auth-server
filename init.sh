#!/bin/bash

cd /home/ec2-user/auth-server
yum update -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
mkdir /home/ec2-user/auth-server/node_modules
npm ci
screen -S node -dm npm start
