var request = require("../helpers/request");

module.exports = {
  authenticate: authenticate
};

function *authenticate(credentials) {
  if (credentials.user) return yield login(credentials);
  return yield signup(credentials);
}

function *login(credentials) {
  var url = "/login?email=" + credentials.email +
            "&password=" + credentials.password;
  var res = yield request.post(url);
  return JSON.parse(res);
}

function *signup(credentials) {
  var url = "/signup?email=" + credentials.email +
            "&password=" + credentials.password;
  var res = yield request.post(url);
  return {
    token: res,
    email: credentials.email,
    projects: []
  };
}
