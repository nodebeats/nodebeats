FROM mongo:3.4.4

MAINTAINER  Nodebeats(nodebeats@gmail.com)

ENV MONGO_DATA_DIR=/data/db \
    RESTORE_DIR=/data/backups \
    MONGO_LOG_DIR=/var/log/mongodb

RUN apt-get update && apt-get install -y cron netcat-traditional netcat-openbsd && \
    mkdir -p $MONGO_DATA_DIR && \
    mkdir -p $RESTORE_DIR && \
    mkdir -p $MONGO_LOG_DIR

WORKDIR     $MONGO_DATA_DIR

COPY ./.docker/mongo_scripts /mongo_scripts
COPY ./lib/mongodump $RESTORE_DIR

RUN chmod +rx /mongo_scripts/*.sh && \
    touch /.firstrun

EXPOSE 27017

CMD ["/mongo_scripts/run.sh"]
