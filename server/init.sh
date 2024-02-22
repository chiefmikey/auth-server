#!/bin/bash

yum update -y && yum upgrade -y
cd /home/ec2-user/server || exit
npm ci

screen -Sdm node npm run prod
