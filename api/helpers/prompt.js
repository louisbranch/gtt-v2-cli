var prompt = require("co-prompt");
var _ = require("lodash");

module.exports = {
  credentials: credentials,
  project: project
};

function *credentials() {
  process.stdout.write("Initializing Git Time Tracker\n");
  return {
    user: yield prompt.confirm("are you a new user? "),
    email: yield prompt("email: "),
    password: yield prompt.password("password: ")
  };
}

function *project(projects) {
  if (projects.length) {
    process.stdout.write("choose a project or create a new one:\n");
    process.stdout.write(projects.join(", ") + "\n");
  }
  var name = yield prompt("project name: ");
  if (_.contains(projects, name)) return {name: name};

  return {
    name: name,
    currency: (yield prompt("currency: [usd] ")) || "usd",
    rate: (yield prompt("cost per hour: [0] ")) || "0"
  };
}
