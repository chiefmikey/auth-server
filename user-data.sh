#!/bin/bash

yum update -y && yum upgrade -y
yum install -y wget git
wget -O /home/ec2-user/codedeploy-al2.sh https://raw.githubusercontent.com/chiefmikey/tales-from-the-script/main/linux/codedeploy/linux-codedeploy-al2.sh
chmod +x /home/ec2-user/codedeploy-al2.sh
/home/ec2-user/codedeploy-al2.sh
curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
yum install -y nodejs
rm -r /home/ec2-user/install
rm -r /home/ec2-user/codedeploy-al2.sh
# Trigger init deploy workflows
