for i in {1..120}; do echo " " && echo "req #: $i" && date +%T && curl -I "http://localhost:8080/t1" 2>/dev/null | head -n 1 | cut -d$' ' -f2 && sleep 1; done
curl -I "http://localhost:8080/t1" 2>/dev/null | head -n 1 | cut -d$' ' -f2