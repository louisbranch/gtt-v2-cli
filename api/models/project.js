var request = require("co-request");
var SERVER = "http://localhost:8080/v1";

module.exports = {
  create: create
};

function *create(user, project) {
  var url = SERVER + "/projects?name=" + project.name +
            "&currency=" + project.currency +
            "&rate=" + project.rate +
            "&email=" + user.email +
            "&token=" + user.token;
  var result = yield request.post(url);
  if (result.statusCode !== 200) throw result.body;
}
