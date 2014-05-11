var co = require("co");
var assert = require("assert");
var nock = require("nock");
var sinon = require("sinon");
var model = require("../../api/models/day");
var clock = require("../../api/helpers/clock");

describe("day model", function(){
  var user = {
    email: "me@luizbranco.com",
    token: "12345",
    project: "test"
  };

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
              "&start=2014-04-10T03:00:00.000Z"  +
              "&email=me@luizbranco.com&token=12345")
        .reply(200, {
          date: "2014-04-24"
        });
    });

    it("creates a new day", function(done){
      co(function* () {
        var response = yield model.start(user);
        assert.deepEqual({
          date: "2014-04-24"
        }, response);
        done();
      })();

    });

  });

  describe("end", function(){

    before(function(){
      nock("http://localhost:8080/")
        .post("/v1/projects/test/days/2014-04-10/end" +
              "?end=2014-04-10T03:00:00.000Z"  +
              "&email=me@luizbranco.com&token=12345")
        .reply(200, "OK");
    });

    it("ends day", function(done){
      co(function* () {
        var response = yield model.end(user);
        assert.deepEqual(response, "OK");
        done();
      })();
    });

  });

  describe("addTask", function(){

    before(function(){
      nock("http://localhost:8080/")
        .post("/v1/projects/test/days/2014-04-10/tasks" +
              "?end=2014-04-10T03:00:00.000Z"  +
              "&message=important%20task" +
              "&email=me@luizbranco.com&token=12345")
        .reply(200, "OK");
    });

    it("adds a new task", function(done){
      co(function* () {
        var response = yield model.addTask(user, "important task");
        assert.deepEqual(response, "OK");
        done();
      })();
    });

  });

  describe("pause", function(){

    before(function(){
      nock("http://localhost:8080/")
        .post("/v1/projects/test/days/2014-04-10/pause" +
              "?start=2014-04-10T03:00:00.000Z"  +
              "&email=me@luizbranco.com&token=12345")
        .reply(200, "OK");
    });

    it("pauses day", function(done){
      co(function* () {
        var response = yield model.pause(user);
        assert.deepEqual(response, "OK");
        done();
      })();
    });

  });

  describe("resume", function(){

    before(function(){
      nock("http://localhost:8080/")
        .post("/v1/projects/test/days/2014-04-10/resume" +
              "?end=2014-04-10T03:00:00.000Z"  +
              "&email=me@luizbranco.com&token=12345")
        .reply(200, "OK");
    });

    it("resumes a previous pause", function(done){
      co(function* () {
        var response = yield model.resume(user);
        assert.deepEqual(response, "OK");
        done();
      })();
    });

  });

  describe("status", function(){

    before(function(){
      nock("http://localhost:8080/")
        .get("/v1/projects/test/days/2014-04-10/status" +
              "?email=me@luizbranco.com&token=12345")
        .reply(200, "07:15");
    });

    it("returns the day status", function(done){
      co(function* () {
        var response = yield model.status(user);
        assert.deepEqual(response, "07:15");
        done();
      })();
    });

  });

});
