var request = require("co-request");
var SERVER = "http://localhost:8080/v1";

module.exports = {
  get: get,
  post: post
};

function *get(url) {
  return yield req("get", url);
}

function *post(url) {
  return yield req("post", url);
}

function *req(method, url) {
  var result = yield request[method](SERVER + url);
  if (result.statusCode !== 200) throw result.body;
  return result.body;
}
