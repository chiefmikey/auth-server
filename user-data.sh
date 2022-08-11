#!/bin/bash

yum update -y && yum upgrade -y
yum install -y wget curl git
wget -O ~/codedeploy-al2.sh https://raw.githubusercontent.com/chiefmikey/linux-codedeploy/main/linux-codedeploy-al2.sh
sudo chmod +x ~/codedeploy-al2.sh
sudo ~/codedeploy-al2.sh
curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
yum install -y nodejs
rm -r install
rm -r codedeploy-al2.sh
git clone https://github.com/chiefmikey/auth-server.git
cd /auth-server
npm ci
screen -Sdm node npm start
