var app = require("commander");
var init = require("./api/cmds/init");

app
  .version("0.0.1")
  .option("init", "configure gtt for the current git project")
  .option("start", "start day")
  .option("task <description>", "add a non-git task")
  .option("pause", "pause day")
  .option("resume", "resume day")
  .option("end", "end day")
  .option("status", "show day status")
  .parse(process.argv);

if (process.argv.length == 2) app.help(); // Defaults to help
if (app.init) init(app);