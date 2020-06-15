import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
export let options = {
  vus: 10,
  duration: '30s',
};
export default function() {
  let res = http.get('http://localhost:8080/t1');
  check(res, {
    "is status 200": r => r.status === 200
  });
  if (res.status == 429) {
    throw new Error ("rate limit exceeded")
  }
  sleep(0.1);
}
