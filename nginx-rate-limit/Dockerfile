FROM nginx:alpine
RUN apk update \
    && apk add --virtual build-dependencies \
    build-base \
    gcc \
    wget \
    git \
    zlib \
    zlib-dev \
    pcre \
    pcre-dev \
    && apk add \
    bash \
    && wget https://nginx.org/download/nginx-1.17.10.tar.gz \
    && tar -xzvf nginx-1.17.10.tar.gz \
    &&  git clone https://github.com/perusio/nginx-hello-world-module.git \
    && cd nginx-1.17.10 \
    &&  ./configure --with-compat --add-dynamic-module=../nginx-hello-world-module \
    && make modules \
    && cp objs/ngx_http_hello_world_module.so /etc/nginx/modules/
