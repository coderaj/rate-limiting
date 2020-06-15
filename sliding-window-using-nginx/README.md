# sliding-window-using-nginx

##Sliding window using Nginx (Openresty) and Lua

Key format = quota*limit*{client_id}\_current_min in server
ttl = Time to Live for the current key

####Key features:

> current_key expires in 90 secs and flushed from memory
> all keys are maintained in in-memory dictionary and are shared across nginx workers

####ToDo:

> Automated tests to validate the limits
> Edge cases
> Hourly quota limit, current implementation tracks no. of requests in minute wise interval.

####How to test it?
Ensure docker-compose is installed.

> docker-compose up

In two terminal screens, issue the following bash commands simultaneously

60 req/min

> for i in {1..120}; do echo " " && echo "req #: \$i" && curl -H "ClientId: bechtel" "http://localhost:8080/t1" && sleep 1; done

120 req/min

> for i in {1..120}; do echo " " && echo "req #: \$i" && curl -H "ClientId: verizon" "http://localhost:8080/t1" && sleep 0.5; done

See demo:

https://otube.oracle.com/media/sliding_window_quota_limit_demo/0_aw04x87p

Assume 2 client applications - Bechtel and Verizon makes server to server calls at the following rates:
Verizon = 1 req/sec | 60 req/min
Bechtel = 2 req/sec | 120 req / min

Error: Rate limit exceeded => If current_rate > 60 req/min

Key is shared across all nginx workers - Kong library ensures it is lock-free
https://github.com/Kong/lua-resty-counter

bechtel will exceed rate-limit of 60 req/min around request #60 and #70
We will restart the curl requests at 1 req/sec

Notice sliding window behavior once current_rate_per_min changes for bechtel

Inspirations & references:

https://github.com/openresty/lua-nginx-module#ngxshareddictexpire
https://leandromoreira.com/2019/01/25/how-to-build-a-distributed-throttling-system-with-nginx-lua-redis/
https://github.com/leandromoreira/nginx-lua-redis-rate-measuring
https://openresty-reference.readthedocs.io/en/latest/Lua_Nginx_API/#ngxreqget_headers
