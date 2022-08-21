#!/bin/sh

COUNT=0
while [ ! -f "/home/ec2-user/auth/gitlang/gitlang.ts" ] || [ ! -f "/home/ec2-user/auth/vm3000/vm3000.ts" ]; do
  [ ${COUNT} -eq 0 ] && echo "Trigger app deploy workflows"
  COUNT+=1
  echo "Updating..."
  sleep 60
done
