#!/bin/bash

yum update -y
yum install -y wget curl
wget -O ~/codedeploy-amazon.sh https://raw.githubusercontent.com/chiefmikey/tales-from-the-script/main/codedeploy/codedeploy-amazon.sh
chmod +x ~/codedeploy-amazon.sh
~/codedeploy-amazon.sh
curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
yum install -y nodejs
mkdir /home/ec2-user/auth-server
mkdir /home/ec2-user/auth-server/node_modules
