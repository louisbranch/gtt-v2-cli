var assert = require("assert");
var sinon = require("sinon");
var helper = require("../../api/helpers/clock");

describe("clock helper", function(){
  var DateStub;

  before(function(){
    var now = new Date("2014, 4, 10").getTime()
    DateStub = sinon.useFakeTimers(now);
  });

  after(function(){
    DateStub.restore();
  });

  describe("time", function(){

    it("formats as ISO string", function(){
      assert.equal("2014-04-10T03:00:00.000Z", helper.time());
    });

  });

  describe("date", function(){

    it("formats as YYYY-MM-DD", function(){
      assert.equal("2014-04-10", helper.date());
    });

  });

});
