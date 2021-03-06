(function() {
  'use strict';

  const controller = require(__dirname + '/../../app/controller.js');
  const chai = require('chai');
  const spies = require('chai-spies');
  const app = require(__dirname + '/../../app/server.js');

  chai.use(spies);
  var expect = chai.expect;

  describe('Controller', () => {
    it("method general should work", () => {
      const route = controller.general;
      const reqMock = {
        headers: {
          'x-forwarded-for': ["localhost1", "remotehost2"]
        }
      };
      let resBody = "";
      const resMock = {
        "sendFile": (body, opt) => {
          resBody = body;
        }
      };
      route(reqMock, resMock);
      expect(resBody).to.include('index.html');
    });

    it("method whoami should work", () => {
      const route = controller.whoami;
      let resStatus = -1;
      let resBody = "";
      const resMock = {
        "status": (code) => {
          resStatus = code;
          return {
            "send": (body) => {
              resBody = body;
            }
          };
        }
      };
      route("", resMock);
      expect(resStatus).to.equal(200);
      expect(resBody).to.include('I am server instance on');
    });

    it("method sleep should work", () => {
      const route = controller.sleep;
      let resStatus = -1;
      let resBody = "";
      const resMock = {
        "status": (code) => {
          resStatus = code;
          return {
            "send": (body) => {
              resBody = body;
            }
          };
        }
      };
      return route("", resMock).then(() => {
        expect(resStatus).to.equal(200);
        expect(resBody).to.include('Finish sleeping for');
      });
    });

    it("method calcPI should work when no digits defined", () => {
      const route = controller.calcPI;
      let resStatus = -1;
      let resBody = "";
      const resMock = {
        "status": (code) => {
          resStatus = code;
          return {
            "send": (body) => {
              resBody = body;
            }
          };
        }
      };
      route("", resMock);
      expect(resStatus).to.equal(200);
      expect(resBody).to.include('3.14');
    });

    it("method calcPI should work when digits is defined", () => {
      const route = controller.calcPI;
      let resStatus = -1;
      let resBody = "";
      const resMock = {
        "status": (code) => {
          resStatus = code;
          return {
            "send": (body) => {
              resBody = body;
            }
          };
        }
      };
      route({
        'params': {
          'digits': 5
        }
      }, resMock);
      expect(resStatus).to.equal(200);
      expect(resBody).to.include('3.14159');
    });

    it("method crashme should work", () => {
      let crashMethod = chai.spy(() => {
        console.log("Unit Test");
      });
      controller.setProcessKill(crashMethod);
      controller.crashme();
      expect(crashMethod).to.have.been.called();
    });

    after(function(done) {
      app.closeServer();
      done();
    });
  });

}());
