var request = require("co-request");
var SERVER = "http://localhost:8080/v1";

module.exports = {
  authenticate: authenticate
};

function *authenticate(credentials) {
  if (credentials.user) return yield login(credentials);
  return yield signup(credentials);
}

function *login(credentials) {
  var url = SERVER + "/login?email=" + credentials.email +
            "&password=" + credentials.password;
  var result = yield request.post(url);
  if (result.statusCode !== 200) throw result.body;
  return JSON.parse(result.body);
}

function *signup(credentials) {
  var url = SERVER + "/signup?email=" + credentials.email +
            "&password=" + credentials.password;
  var result = yield request.post(url);
  if (result.statusCode !== 200) throw result.body;
  return {
    token: result.body,
    email: credentials.email,
    projects: []
  };
}
