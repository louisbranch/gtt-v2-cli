var request = require("../helpers/request");

module.exports = {
  create: create
};

function *create(user, project) {
  var url = "/projects?name=" + project.name +
            "&currency=" + project.currency +
            "&rate=" + project.rate +
            "&email=" + user.email +
            "&token=" + user.token;
  return yield request.post(url);
}
