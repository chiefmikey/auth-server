#!/bin/bash

yum install -y wget
wget -O ~/codedeploy-amazon.sh https://raw.githubusercontent.com/chiefmikey/tales-from-the-script/main/codedeploy/codedeploy-amazon.sh
chmod +x ~/codedeploy-amazon.sh
~/codedeploy-amazon.sh
cd /home/ec2-user/auth-server
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16
mkdir /home/ec2-user/auth-server/node_modules
