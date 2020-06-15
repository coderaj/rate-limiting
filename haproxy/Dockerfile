FROM haproxy:2.1.4

RUN set -x	&& \
    export http_proxy=http://www-proxy.us.oracle.com:80     &&  \
    export https_proxy=http://www-proxy.us.oracle.com:80    &&  \
    apt-get update					&&  \
    apt-get install rsyslog -y				&& \
    apt-get install socat -y                && \
    apt-get install watch  -y

ADD haproxy.conf /etc/rsyslog.d/haproxy.conf
ADD rsyslog.conf /etc/rsyslog.conf

COPY docker-entrypoint.sh /

RUN set -x	&& \
    chmod 777 ./docker-entrypoint.sh

EXPOSE 80 443

ENTRYPOINT ["./docker-entrypoint.sh"]
