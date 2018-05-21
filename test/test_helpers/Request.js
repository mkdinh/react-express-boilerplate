const supertest = require("supertest");
const makeServer = require("./makeServer");
const userFactory = require("../factories/userFactory");

class SuperRequest {
  static async connect({ authenticated } = {}) {
    const server = await makeServer();
    const request = supertest(server);
    const superRequest = new SuperRequest(server, request);
    let temp;

    if (authenticated) temp = await superRequest.authenticate();

    return new Proxy(superRequest, {
      get: function(target, property) {
        return target[property] || request[property] || server[property];
      },
    });
  }

  constructor(server, request) {
    this.server = server;
    this.request = request;
  }

  async authenticate() {
    const request = this.request;
    const user = await userFactory();
    const res = await request
      .post("/auth/signin-local")
      .send({ email: user.email, password: user._password });
    const token = res.body.token;
    request._token = token;

    supertest.prototype.authorize = function() {
      request.set("authorization", authReq._token);
      return request;
    };

    return request;
  }
  //   return new Promise((resolve, reject) => {
  //     userFactory()
  //       .then(user => {
  //         return request
  //           .post("/auth/signin-local")
  //           .send({ email: user.email, password: user._password });
  //       })
  //       .then(res => {
  //         request._token = res.body.token;
  //         return resolve(request);
  //       })
  //       .catch(err => reject(err));
  //   });
  // }
}

module.exports = SuperRequest;
