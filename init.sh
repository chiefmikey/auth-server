#!/bin/bash

yum update -y
cd /home/ec2-user/auth-server
npm ci
screen -Sdm node npm start
