var request = require("../helpers/request");
var clock = require("../helpers/clock");

module.exports = {
  start: start,
  end: end,
  addTask: addTask,
  pause: pause,
  resume: resume,
  status: status
};

function *start(user) {
  var url = "/projects/" + user.project +
            "/days?date=" + clock.date() +
            "&start=" + clock.time() +
            credentials(user);
  var res = yield request.post(url);
  return JSON.parse(res);
}

function *end(user) {
  var url = day(user) +
            "/end" +
            "?end=" + clock.time() +
            credentials(user);
  return yield request.post(url);
}

function *addTask(user, message) {
  var url = day(user) +
            "/tasks" +
            "?end=" + clock.time() +
            "&message=" + message +
            credentials(user);
  return yield request.post(url);
}

function *pause(user) {
  var url = day(user) +
            "/pause" +
            "?start=" + clock.time() +
            credentials(user);
  return yield request.post(url);
}

function *resume(user) {
  var url = day(user) +
            "/resume" +
            "?end=" + clock.time() +
            credentials(user);
  return yield request.post(url);
}

function *status(user) {
  var url = day(user) +
            "/status" +
            "?email=" + user.email +
            "&token=" + user.token;
  return yield request.get(url);
}

function day(user) {
  return "/projects/" + user.project +
         "/days/" + clock.date();
}

function credentials(user) {
  return "&email=" + user.email +
         "&token=" + user.token;
}
