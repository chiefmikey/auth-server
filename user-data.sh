#!/bin/bash

yum install -y wget
wget -O ~/codedeploy-amazon.sh https://raw.githubusercontent.com/chiefmikey/tales-from-the-script/main/codedeploy/codedeploy-amazon.sh
sudo chmod +x ~/codedeploy-amazon.sh
sudo ~/codedeploy-amazon.sh
