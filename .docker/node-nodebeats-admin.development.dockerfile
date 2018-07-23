FROM        node:8.11.1

MAINTAINER  Nodebeats(nodebeats@gmail.com)

LABEL Description="Angular 5 Universal Server"
LABEL Vendor="Nodebeats"
LABEL Version="3.1"

# ENV PORT=4000 \
#     # CLI_PORT=49153 \
#     PROJECT_DIR=/var/www/nodebeats/admin

# RUN npm install -g typescript && \
#     npm install -g webpack && \
#     npm install -g webpack-dev-server && \
#     npm install -g @angular/cli && \
#     npm install -g mocha && \
#     mkdir -p $PROJECT_DIR

# # Install app dependencies
# COPY admin/package.json $PROJECT_DIR/

# # Create app directory
# WORKDIR     $PROJECT_DIR

# RUN npm install

# # Bundle app sourceuser
# COPY    ./admin $PROJECT_DIR

# EXPOSE 		$PORT
# EXPOSE 		$CLI_PORT

# CMD ["npm", "start"]
