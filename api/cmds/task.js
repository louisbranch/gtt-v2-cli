var co = require("co");

var day = require("../models/day");
var config = require("../helpers/config");
var output = require("../helpers/output");

module.exports = function (message) {
  co(function* () {
    try {
      var user = yield config.read();
      yield day.addTask(user, message);
    } catch (e) {
      output.error(e);
    }
    output.success("OK, a task has been added");
  })();
};
