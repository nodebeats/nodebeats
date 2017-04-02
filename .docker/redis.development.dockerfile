FROM redis:latest

MAINTAINER  Nodebeats(nodebeats@gmail.com)

# Change as appropriate for build

COPY ./.docker/config/redis.conf /etc/redis.conf

ENV REDIS_DATA_DIR=/data/cache
RUN mkdir -p $REDIS_DATA_DIR
EXPOSE  6379

CMD ["redis-server", "/etc/redis.conf"]