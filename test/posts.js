const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(server);

const User = require("../models/user");

describe("User", function() {
    after(function () {
        agent.close()
      });
  // TESTS WILL GO HERE.
  it("should not be able to login if they have not registered", function(done) {
    agent.post("/login", { email: "wrong@wrong.com", password: "nope" }).end(function(err, res) {
      res.status.should.be.equal(401);
      done();
    });
  });


});
