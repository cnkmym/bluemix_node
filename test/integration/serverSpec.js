(function() {
  'use strict';

  const request = require('request');
  const chai = require('chai');
  const spies = require('chai-spies');
  const app = require(__dirname+'/../../app/server.js');
  const controller = require(__dirname+'/../../app/controller.js');
  const base_url = "http://localhost:" + (process.env.PORT || 3000);

  chai.use(spies);
  var expect = chai.expect;

  describe("Server Integration Test", () => {
    describe("GET /", () => {
      it("returns status code 200", (done) => {
        request.get(base_url, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
      it("contains valid text", (done) => {
        request.get(base_url, (error, response, body) => {
          expect(body).to.include("Hello, You are from");
          done();
        });
      });
    });

    describe("GET /api/*", () => {
      let crashme = "/api/whoami";
      it("listens on api calls", (done) => {
        request.get(base_url + crashme, (error, response, body) => {
          expect(body).to.include("I am server instance on");
          done();
        });
      });
    });

    after(function() {
      chai.spy.on(app,"closeServer");
      app.closeServer();
      expect(app.closeServer).to.have.been.called();
    });
  });
}());
