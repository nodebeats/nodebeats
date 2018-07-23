FROM nginx:latest

MAINTAINER  Nodebeats(nodebeats@gmail.com)

RUN rm /etc/nginx/conf.d/default.conf

ENV NGINX_DIR=/var/www \
    NGINX_CONF_DIR=/etc/nginx/nginx.conf \
    NGINX_LOG_DIR=/var/www/logs \
    NGINX_CACHE_DIR=/var/www/cache \
    NGINX_TMP_DIR=/var/www/tmp

RUN mkdir -p $NGINX_DIR && \
    mkdir -p $NGINX_DIR/public && \
    mkdir -p $NGINX_DIR/admin && \
    mkdir -p $NGINX_LOG_DIR && \
    mkdir -p $NGINX_CACHE_DIR && \
    mkdir -p $NGINX_TMP_DIR

# Copy custom nginx config
COPY ./.docker/config/nginx.conf $NGINX_CONF_DIR

# Copy public files to Nginx
COPY ./public $NGINX_DIR/public
COPY ./admin/dist $NGINX_DIR/app

# forward request logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log
# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD service nginx start