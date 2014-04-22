var color = require("cli-color");

module.exports = {
  success: success,
  error: error
};

function success(message) {
  process.stdout.write(color.green(message + "\n"));
  process.exit(0);
}

function error(message) {
  process.stdout.write(color.red(message + "\n"));
  process.exit(1);
}
