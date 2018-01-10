(function() {
  'use strict';

  const controller = require(__dirname + '/../../app/controller.js');

  describe('Controller', () => {
    it("method general should work", () => {
      var obj = spyOn(controller, 'general').and.callThrough();
      const route = controller.general;
      expect(obj).toEqual(route);
      const reqMock = {
        headers: {
          'x-forwarded-for': ["localhost1","remotehost2"]
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
      expect(obj).toHaveBeenCalled();
      expect(resStatus).toEqual(200);
      expect(resBody).toContain('Hello, You are from');
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
      expect(resStatus).toEqual(200);
      expect(resBody).toContain('I am server instance on');
    });

    it("method crashme should work", () => {
      let route = controller.crashme;
      let crashMethod = jasmine.createSpy('crashMethod');
      route("", "", "", crashMethod);
      expect(crashMethod).toHaveBeenCalled();
    });

  });

}());
