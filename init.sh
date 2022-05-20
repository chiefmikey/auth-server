#!/bin/bash

yum update -y
cd /home/ec2-user/auth-server
npm ci
screen -S node -dm npm start
