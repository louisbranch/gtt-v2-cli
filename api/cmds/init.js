var co = require("co");

var authenticate = require("../models/user").authenticate;
var createProject = require("../models/project").create;
var config = require("../helpers/config");
var output = require("../helpers/output");
var prompt = require("../helpers/prompt");

module.exports = function () {
  co(function* () {
    var credentials, file, user, project;

    try {
      file = yield config.read();
    } catch (e) { }
    if (file) output.error("gtt file already exists for this project");

    try {
      credentials = yield prompt.credentials();
      user = yield authenticate(credentials);
      project = yield prompt.project(user.projects);
      if (project.rate) yield createProject(user, project);
      yield config.write(user, project);
    } catch (e) {
      output.error(e);
    }
    output.success("gtt initialized\nYou may want to add '.gtt' to .gitignore");
  })();
};
