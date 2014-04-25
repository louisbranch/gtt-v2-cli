var fs = require("fs");
var thunk = require("thunkify");

var FILE = ".gtt";

module.exports = {
  read: read,
  write: write
};

function *read() {
  var read = thunk(fs.readFile);
  var file, json;
  try {
    file = yield read(FILE);
    json = JSON.parse(file);
  } catch (e) {
    if (e instanceof SyntaxError) throw("invalid .gtt file");
    throw(".gtt file not found");
  }
  return json;
}

function *write(user, project) {
  var write = thunk(fs.writeFile);
  var config = '{\n' +
                 ' "email": "' + user.email + '",\n' +
                 ' "token": "' + user.token + '",\n' +
                 ' "project": "' + project.name + '"\n' +
               '}\n'
  yield write(FILE, config);
}

