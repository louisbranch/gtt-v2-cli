var co = require("co");

var authenticate = require("../models/user").authenticate;
var createProject = require("../models/project").create;
var config = require("../helpers/config");
var output = require("../helpers/output");
var prompt = require("../helpers/prompt");

module.exports = function () {
  co(function* () {
    var credentials, user, project;

    var file = yield config.get();
    if (file) output.error("gtt file already exists for this project");;

    try {
      credentials = yield prompt.credentials();
      user = yield authenticate(credentials);
      project = yield prompt.project(user.projects);
      if (project.rate) yield createProject(user, project);
      yield config.create(user, project);
    } catch (e) {
      output.error(e);
    }
    output.success("gtt initialized\n You may want to add '.gtt' to .gitignore");
  })();
};
