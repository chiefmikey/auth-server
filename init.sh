#!/bin/bash

yum update -y
npm ci
screen -S node -dm npm start
