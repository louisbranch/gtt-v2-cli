module.exports = {
  time: time,
  date: date
};

function time() {
  return (new Date()).toISOString();
}

function date() {
  var now = new Date();
  var month = now.getMonth() + 1;
  var day =  now.getDate();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  return now.getFullYear() + "-" + month + "-" + day;
}

