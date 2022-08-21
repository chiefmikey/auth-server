#!/bin/sh

yum update -y && yum upgrade -y
cd /home/ec2-user/server
npm ci

[ -f "/home/ec2-user/gitlang/gitlang.ts" ] && [ -f "/home/ec2-user/vm3000/vm3000.ts" ] && screen -Sdm node npm run server:start
[ -f "/home/ec2-user/gitlang/gitlang.ts" ] && [ ! -f "/home/ec2-user/vm3000/vm3000.ts" ] && screen -Sdm node npm run server:gitlang
[ ! -f "/home/ec2-user/gitlang/gitlang.ts" ] && [ -f "/home/ec2-user/vm3000/vm3000.ts" ] && screen -Sdm node npm run server:vm3000
