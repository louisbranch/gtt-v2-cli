var co = require("co");

var day = require("../models/day");
var config = require("../helpers/config");
var output = require("../helpers/output");

module.exports = function () {
  co(function* () {
    try {
      var user = yield config.get();
      yield day.start(user);
    } catch (e) {
      output.error(e);
    }
    output.success("OK, day has started");
  })();
};

