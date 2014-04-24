var co = require("co");
var fs = require("fs");
var assert = require("assert");
var config = require("../../api/helpers/config");

describe("config helper", function(){

  describe("write", function(){

    it("writes a .gtt file with project info", function(done){
      var user = {
        email: "me@luizbranco.com",
        token: "12345"
      };

      var project = {
        name: "test"
      };

      co(function* () {
        yield config.write(user, project);
      })();

      fs.exists(".gtt", function (exists) {
        assert.equal(true, exists);
        done();
      });
    });

  });

  describe("read", function(){

    describe("when file is readable", function(){
      var info;

      before(function(done){
        co(function* () {
          info = yield config.read();
          done();
        })();
      });

      it("has a user email", function(){
        assert.equal("me@luizbranco.com", info.email);
      });

      it("has a user token", function(){
        assert.equal("12345", info.token);
      });

      it("has a project name", function(){
        assert.equal("test", info.project);
      });

    });

    describe("when file doesn't exist", function(){

      xit("throws an error", function(){
      });

    });

    describe("when file has invalid syntax ", function(){

      it("throws an error", function(){
        assert.throws(function () {
          var gen = config.read();
          gen.next();
          gen.next("{{");
        }, /invalid .gtt file/);
      });

    });

  });

});
