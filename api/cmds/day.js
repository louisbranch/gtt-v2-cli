var co = require("co");

var day = require("../models/day");
var config = require("../helpers/config");
var output = require("../helpers/output");

module.exports = {
  start: start,
  task: task
};

function command(fn, success, param) {
  co(function* () {
    try {
      var user = yield config.read();
      var response = yield fn(user, param);
    } catch (e) {
      output.error(e);
    }
    output.success(success || response);
  })();
};

function day() {
  command(day.start, "OK, day has started");
}

function task(message) {
  command(day.addTask, "OK, a task has been added", message);
}

function pause() {
  command(day.pause, "OK, day has been paused");
}

function resume() {
  command(day.resume, "OK, day has been resumed");
}

function end() {
  command(day.end, "OK, day has been finished");
}

function status() {
  command(day.status);
}
