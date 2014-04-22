var fs = require("fs");
var co = require("co");
var request = require("co-request");
var thunk = require("thunkify");
var read = thunk(fs.readFile);

var output = require("../helpers/output");
var prompt = require("../helpers/prompt");

var SERVER = "http://localhost:8080/v1";
var FILE = ".gtt";

module.exports = function (app) {
  co(function* () {
    var file;
    try { file = yield read(FILE); } catch (e) { }
    if (file) output.error("gtt file already exists for this project");;

    try {
      var credentials = yield prompt.credentials();
      var user = yield authenticate(credentials);
      var project = yield prompt.project(user.projects);
    } catch (e) {
      output.error(e);
    }
    output.success("created!");
  })();
};

function *authenticate(credentials) {
  if (credentials.user) return yield login(credentials);
  return yield signup(credentials);
}

function *login(credentials) {
  var url = SERVER + "/login?email=" + credentials.email +
            "&password=" + credentials.password;
  var result = yield request.post(url);
  if (result.statusCode !== 200) throw result.body;
  return JSON.parse(result.body);
}

function *signup(credentials) {
  var url = SERVER + "/signup?email=" + credentials.email +
            "&password=" + credentials.password;
  var result = yield request.post(url);
  if (result.statusCode !== 200) throw result.body;
  return {
    token: result.body,
    projects: []
  };
}
