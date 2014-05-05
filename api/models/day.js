var request = require("../helpers/request");
var clock = require("../helpers/clock");

module.exports = {
  start: start,
  addTask: addTask
};

function *start(user) {
  var url = "/projects/" + user.project +
            "/days?date=" + clock.date() +
            "&email=" + user.email +
            "&token=" + user.token;
  var res = yield request.post(url);
  return JSON.parse(res);
}

function *addTask(user, message) {
  var url = "/projects/" + user.project +
            "/days/" + clock.date() +
            "?end=" + clock.time() +
            "&message=" + message +
            "&email=" + user.email +
            "&token=" + user.token;
  return yield request.post(url);
}
