import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";
import { Rate } from "k6/metrics";
export let options = {
  vus: 10,
  duration: "30s",
};
export let errorRate = new Rate("errors");
export default function () {
  let res = http.get("http://192.168.43.218:90/t2");
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  let error_value = check(res, { "429": (r) => r.status == 429 });
  errorRate.add(error_value);
  sleep(0.1);
}
