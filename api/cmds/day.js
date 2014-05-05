var co = require("co");

var day = require("../models/day");
var config = require("../helpers/config");
var output = require("../helpers/output");

module.exports = {
  start: start,
  task: task
};

function command(fn, atrr, success) {
  co(function* () {
    try {
      var user = yield config.read();
      yield fn(user, attr);
    } catch (e) {
      output.error(e);
    }
    output.success(success);
  })();
};

function day() {
  command(day.start, null, "OK, day has started");
}

function task(message) {
  command(day.addTask, message, "OK, a task has been added");
}
