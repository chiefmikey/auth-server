#!/bin/bash

yum update -y
yum upgrade -y
cd /home/ec2-user/server || exit
NODE_ENV=production npm i

screen -Sdm node npm run prod
