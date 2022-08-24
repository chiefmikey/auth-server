#!/bin/sh

yum update -y && yum upgrade -y
cd /home/ec2-user/server
npm ci

screen -Sdm node npm run prod
