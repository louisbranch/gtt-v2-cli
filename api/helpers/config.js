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
  var file, json;
  try {
    file = yield read(FILE);
    json = JSON.parse(file);
  } catch (e) {
  }
  return json;
}

function *create(user, project) {
  var config = '{\n' +
                 ' "email": "' + user.email + '",\n' +
                 ' "token": "' + user.token + '",\n' +
                 ' "project": "' + project.name + '"\n' +
               '}\n'
  yield write(FILE, config);
}

