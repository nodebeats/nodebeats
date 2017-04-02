FROM        node:6.9.1

MAINTAINER  Nodebeats(nodebeats@gmail.com)

LABEL Description="Nodebeats, An Open Source Content Management System built using MEAN Framework"
LABEL Vendor="Bitsbeat IT Solution"
LABEL Version="1.0"

ENV PORT=3000 \
    PROJECT_DIR=/var/www/nodebeats \
    LOG_DIR=/var/log/pm2

# Add our user and group first to make sure their IDs get assigned consistently
RUN npm install -g pm2 && \
    npm install -g express && \
    npm install -g gulp && \
    npm install -g nodemon && \
    mkdir -p $LOG_DIR && \
    mkdir -p $PROJECT_DIR

# Install app dependencies
COPY package.json npm-shrinkwrap.json $PROJECT_DIR/

# Create app directory
WORKDIR     $PROJECT_DIR

RUN npm install

# Bundle app sourceuser
COPY    . $PROJECT_DIR

EXPOSE 		$PORT

CMD ["pm2", "start", "pm2.json", "--watch", "--no-daemon"]
