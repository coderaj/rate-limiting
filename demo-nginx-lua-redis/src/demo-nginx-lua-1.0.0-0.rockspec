package = "demo-nginx-lua"
version = "1.0.0-0"
source = {
  url = "local",
  tag = "1.0.0"
}

build = {
  type = "builtin",
  modules = {
    ["sharedworker.counter"] = "lib/counter.lua"
  }
}