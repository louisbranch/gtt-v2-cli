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
  });

  after(function(){
    clock.date.restore();
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

});
