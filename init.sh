#!/bin/bash

yum update -y && yum upgrade -y
cd ~/auth-server
npm ci
screen -Sdm node npm start
