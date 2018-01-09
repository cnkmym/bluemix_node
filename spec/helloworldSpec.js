const request = require('request');

const base_url = "http://localhost:"+(process.env.PORT||3000);

describe("Server Route Test",()=>{

  describe("GET /", ()=>{
      it("returns status code 200",()=>{
        request.get(base_url,(error,response,body)=>{
          expect(response.statusCode).toBe(200);
          done();
        });
      });
      it("contains valid html",()=>{
        request.get(base_url,(error,response,body)=>{
          expect(body).contains("<h1>Hello, You are from");
          done();
        });
      });
  });

  describe("GET /api/*", ()=>{
    let path = "/api/whoami";
    it("listens on api calls",()=>{
      request.get(base_url+path,(error,response,body)=>{
        expect(body).contains("I am server instance on");
        done();
      });
    });
  });
});
