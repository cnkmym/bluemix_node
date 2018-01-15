(function() {
  'use strict';

  const request = require('request');
  const chai = require('chai');
  const spies = require('chai-spies');
  const app = require(__dirname + '/../../app/server.js');
  const controller = require(__dirname + '/../../app/controller.js');
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
      it("listens on /api/whoami calls", (done) => {
        request.get(base_url + "/api/whoami", (error, response, body) => {
          expect(body).to.include("I am server instance on");
          done();
        });
      });

      it("listens on /api/sleep calls", (done) => {
        request.get(base_url + "/api/sleep/1", (error, response, body) => {
          expect(body).to.include("Finish sleeping");
          done();
        });
      });
    });

    after(function(done) {
      app.closeServer();
      done();
    });
  });
}());
