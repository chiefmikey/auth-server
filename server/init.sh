#!/bin/sh

yum update -y && yum upgrade -y
cd /home/ec2-user/server
npm ci

[ -f "/home/ec2-user/server/gitlang/gitlang.ts" ] && [ -f "/home/ec2-user/server/vm3000/vm3000.ts" ] && screen -Sdm node npm run server:start
[ -f "/home/ec2-user/server/gitlang/gitlang.ts" ] && [ ! -f "/home/ec2-user/server/vm3000/vm3000.ts" ] && screen -Sdm node npm run server:gitlang
[ ! -f "/home/ec2-user/server/gitlang/gitlang.ts" ] && [ -f "/home/ec2-user/server/vm3000/vm3000.ts" ] && screen -Sdm node npm run server:vm3000

if [ ! -f "/home/ec2-user/server/gitlang/gitlang.ts" ] || [ ! -f "/home/ec2-user/server/vm3000/vm3000.ts" ]; then
  chmod +x /home/ec2-user/server/cron.sh
  screen -Sdm cron /home/ec2-user/server/cron.sh
fi
