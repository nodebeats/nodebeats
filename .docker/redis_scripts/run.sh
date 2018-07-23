#!/bin/bash
configFile=/etc/redis.conf

if [[ -r $configFile ]] ; then
     . "$configFile"
else
     echo "configFile not found or not readable."
     exit 1
fi

#for testing only:
echo "$name"
echo "$pass"