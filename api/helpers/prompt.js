var prompt = require("prompt");
prompt.message = "";
prompt.delimiter = "";

module.exports = {
  credentials: credentials,
  project: project
};

function credentials(callback) {
  var schema = {
    properties: {
      user: {
        message: "Do you have a gtt account?",
        validator: /^(y|n)(?:es|o)?$/i,
        default: "yes"
      },
      email: {
        required: true,
        message: "email:"
      },
      password: {
        hidden: true,
        required: true,
        message: "password:"
      }
    }
  };

  process.stdout.write("Initializing Git Time Tracker\n");
  prompt.start();
  prompt.get(schema, function (err, result) {
    result.user = result.user[0].toLowerCase() === "y";
    callback(result);
  });
}

function project() {
  //TODO
}
