var request = require("co-request");
var SERVER = "http://localhost:8080/v1";

module.exports = {
  post: post
};

function *post(url) {
  var result = yield request.post(SERVER + url);
  if (result.statusCode !== 200) throw result.body;
  return result.body;
}
