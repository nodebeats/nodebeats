#!/bin/sh

mkdir -p `pwd`/var/lib/letsencrypt  
mkdir -p `pwd`/etc/letsencrypt  
mkdir -p `pwd`/var/www/letsencrypt

docker pull quay.io/letsencrypt/letsencrypt

docker run --rm  --name letsencrypt \
   -v "`pwd`/etc/letsencrypt:/etc/letsencrypt" \
  -v "`pwd`/var/lib/letsencrypt:/var/lib/letsencrypt" \
  -v "`pwd`/var/www/letsencrypt":"/var/www/letsencrypt" \
  quay.io/letsencrypt/letsencrypt \
  certonly \
 --webroot \
  --webroot-path /var/www/letsencrypt \
  --renew-by-default \
  -d  www.nodebeats.com \
 --agree-tos \
  -m nodebeats@gmail.com

#docker kill --signal=HUP gyapu-nginx

