var request = require("../helpers/request");
var clock = require("../helpers/clock");

module.exports = {
  start: start
};

function *start(user) {
  var url = "/projects/" + user.project +
            "/days?date=" + clock.date() +
            "&email=" + user.email +
            "&token=" + user.token;
  var res = yield request.post(url);
  return JSON.parse(res);
}

