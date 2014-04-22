var fs = require("fs");
var request = require("request");
var output = require("../helpers/output");
var prompt = require("../helpers/prompt");

var SERVER = "http://localhost:8080/v1";
var FILE = ".gtt";

module.exports = function (app) {
  fs.exists(FILE, function (exists) {
    if (!exists) authenticate();
    else output.error("gtt file already exists for this project");
  });
};

function authenticate() {
  prompt.credentials(function (credentials) {
    if (credentials.user) login(credentials);
    else signup(credentials);
  });
}

function login(credentials) {
  var url = SERVER + "/login?email=" + credentials.email +
            "&password=" + credentials.password;

  request.post(url, function (err, res, body) {
    if (err) return output.error(err);
    var token = body;
    output.success(token);
  });
}

function signup(credentials) {
  var url = SERVER + "/signup?email=" + credentials.email +
            "&password=" + credentials.password;

  request.post(url, function (err, res, body) {
    if (err) return output.error(err);
    var token = body;
    output.success(token);
  });
}
