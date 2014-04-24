var fs = require("fs");
var thunk = require("thunkify");

var FILE = ".gtt";

module.exports = {
  get: get,
  create: create
};

function *get() {
  var read = thunk(fs.readFile);
  var file, json;
  try {
    file = yield read(FILE);
    json = JSON.parse(file);
  } catch (e) {
    if (e === "ENOENT") throw(".gtt file not found");
  }
  return json;
}

function *create(user, project) {
  var write = thunk(fs.writeFile);
  var config = '{\n' +
                 ' "email": "' + user.email + '",\n' +
                 ' "token": "' + user.token + '",\n' +
                 ' "project": "' + project.name + '"\n' +
               '}\n'
  yield write(FILE, config);
}

