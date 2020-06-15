FROM openresty/openresty:xenial
RUN  mkdir /src
COPY ./src/ /src
RUN cd /src && \
    luarocks make