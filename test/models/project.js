var co = require("co");
var assert = require("assert");
var nock = require("nock");
var model = require("../../api/models/project");

describe("project model", function(){

  describe("create", function(){

    before(function(){
      nock("http://curry.io/")
        .post("/v1/projects?name=test&currency=usd&rate=30&" +
              "email=me@luizbranco.com&token=12345")
        .reply(200, "OK");
    });

    it("returns response body", function(done){
      var user = {
        email: "me@luizbranco.com",
        token: "12345"
      };

      var project = {
        name: "test",
        currency: "usd",
        rate: "30"
      };

      co(function* () {
        var response = yield model.create(user, project);
        assert.deepEqual("OK", response);
        done();
      })();
    });

  });

});
