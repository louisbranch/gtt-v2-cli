var fs = require("fs");
var thunk = require("thunkify");
var read = thunk(fs.readFile);
var write = thunk(fs.writeFile);

var FILE = ".gtt";

module.exports = {
  get: get,
  create: create
};

function *get() {
  var file;
  try {
    file = yield read(FILE);
  } catch (e) {
  }
  return file;
}

function *create(user, project) {
  var config = "email=" + user.email + "\n" +
               "token=" + user.token + "\n" +
               "project=" + project.name + "\n";
  yield write(FILE, config);
}

