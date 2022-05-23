#!/bin/bash

yum update -y && yum upgrade -y
yum install -y wget curl git
wget -O ~/codedeploy-amazon.sh https://raw.githubusercontent.com/chiefmikey/tales-from-the-script/main/codedeploy/codedeploy-amazon.sh
chmod +x ~/codedeploy-amazon.sh
~/codedeploy-amazon.sh
curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
yum install -y nodejs
git clone https://github.com/chiefmikey/auth-server.git
cd /auth-server
npm ci
screen -Sdm node npm start
