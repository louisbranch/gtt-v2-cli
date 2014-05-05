var co = require("co");
var assert = require("assert");
var nock = require("nock");
var sinon = require("sinon");
var model = require("../../api/models/day");
var clock = require("../../api/helpers/clock");

describe("day model", function(){
  var DateStub;

  before(function(){
    sinon.stub(clock, "date", function () {
      return "2014-04-10";
    });
    sinon.stub(clock, "time", function () {
      return "2014-04-10T03:00:00.000Z";
    });
  });

  after(function(){
    clock.date.restore();
    clock.time.restore();
  });

  describe("start", function(){

    before(function(){
      nock("http://localhost:8080/")
        .post("/v1/projects/test/days?date=2014-04-10" +
              "&email=me@luizbranco.com&token=12345")
        .reply(200, {
          date: "2014-04-24"
        });
    });

    it("creates a new day", function(done){
      var user = {
        email: "me@luizbranco.com",
        token: "12345",
        project: "test"
      };

      co(function* () {
        var response = yield model.start(user);
        assert.deepEqual({
          date: "2014-04-24"
        }, response);
        done();
      })();

    });

  });

  describe("addTask", function(){

    before(function(){
      nock("http://localhost:8080/")
        .post("/v1/projects/test/days/2014-04-10" +
              "?end=2014-04-10T03:00:00.000Z"  +
              "&message=important%20task" +
              "&email=me@luizbranco.com&token=12345")
        .reply(200, "OK");
    });

    it("adds a new task", function(done){
      var user = {
        email: "me@luizbranco.com",
        token: "12345",
        project: "test"
      };

      co(function* () {
        var response = yield model.addTask(user, "important task");
        assert.deepEqual(response, "OK");
        done();
      })();

    });

  });

});
