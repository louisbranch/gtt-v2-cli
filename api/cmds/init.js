var fs = require("fs");
var co = require("co");
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

    var credentials = yield prompt.credentials();
    var project = yield prompt.project([]);
    console.log(credentials);
    console.log(project);
    output.success("created!");
  })();
};
