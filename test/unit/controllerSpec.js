(function() {
  'use strict';

  const controller = require(__dirname + '/../../app/controller.js');
  const chai = require('chai');
  const spies = require('chai-spies');

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
      route(reqMock, resMock);
      expect(resStatus).to.equal(200);
      expect(resBody).to.include('Hello, You are from');
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

    it("method crashme should work", () => {
      let route = controller.crashme;
      let crashMethod = chai.spy(() => {
        console.log("Unit Test");
      });
      route("", "", "", crashMethod);
      expect(crashMethod).to.have.been.called();
    });

  });

}());
