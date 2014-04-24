var co = require("co");
var assert = require("assert");
var nock = require("nock");
var model = require("../../api/models/user");

describe("user model", function(){

  describe("signup", function(){

    before(function(){
      nock("http://localhost:8080/")
        .post("/v1/signup?email=me@luizbranco.com&password=secret")
        .reply(200, "12345");
    });

    it("returns user info", function(done){
      var credentials = {
        email: "me@luizbranco.com",
        password: "secret",
        user: false
      };

      co(function* () {
        var response = yield model.authenticate(credentials);
        assert.deepEqual({
          token: "12345",
          email: "me@luizbranco.com",
          projects: []
        }, response);
        done();
      })();
    });

  });

  describe("login", function(){

    before(function(){
      nock("http://localhost:8080/")
        .post("/v1/login?email=me@luizbranco.com&password=secret")
        .reply(200, {
          token: "12345",
          email: "me@luizbranco.com",
          projects: ["test"]
        });
    });

    it("returns user info", function(done){
      var credentials = {
        email: "me@luizbranco.com",
        password: "secret",
        user: true
      };

      co(function* () {
        var response = yield model.authenticate(credentials);
        assert.deepEqual({
          token: "12345",
          email: "me@luizbranco.com",
          projects: ["test"]
        }, response);
        done();
      })();
    });

  });

});
