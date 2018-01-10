(function() {
  'use strict';

  const request = require('request');
  const app = require(__dirname+'/../../app/server.js');
  const base_url = "http://localhost:" + (process.env.PORT || 3000);

  describe("Server Integration Test", () => {
    describe("GET /", () => {
      it("returns status code 200", (done) => {
        request.get(base_url, (error, response, body) => {
          expect(response.statusCode).toBe(200);
          done();
        });
      });
      it("contains valid text", (done) => {
        request.get(base_url, (error, response, body) => {
          expect(body).toContain("Hello, You are from");
          done();
        });
      });
    });

    describe("GET /api/*", () => {
      let path = "/api/whoami";
      it("listens on api calls", (done) => {
        request.get(base_url + path, (error, response, body) => {
          expect(body).toContain("I am server instance on");
          done();
        });
      });
    });

    afterAll(function() {
      spyOn(app,"closeServer").and.callThrough();
      app.closeServer();
      expect(app.closeServer).toHaveBeenCalled();
    });
  });
}());
