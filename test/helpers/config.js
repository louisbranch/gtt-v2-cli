var co = require("co");
var fs = require("fs");
var assert = require("assert");
var config = require("../../api/helpers/config");

describe("config helper", function(){

  describe("create", function(){

    it("creates a .gtt file with project info", function(done){
      var user = {
        email: "me@luizbranco.com",
        token: "12345"
      };

      var project = {
        name: "test"
      };

      co(function* () {
        yield config.create(user, project);
      })();

      fs.exists(".gtt", function (exists) {
        assert.equal(true, exists);
        done();
      });
    });

  });

  describe("get", function(){
    var info;

    before(function(done){
      co(function* () {
        info = yield config.get();
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

});
