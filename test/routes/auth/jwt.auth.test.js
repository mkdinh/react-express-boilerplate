const request = require("supertest");
const mockgoose = require("../../test_helpers/mockgoose");
const { validUser } = require("../../data/users");
const User = require("../../../models").User;

describe("Local Authentication", () => {
  let server;

  beforeEach(async () => {
    server = await makeServer();
  });

  afterEach(async () => {
    await server.closeConnection();
  });

  // it("POST /signup return token with valid inputs", done => {
  //   const userInputs = { ...validUser };
  //   request(server)
  //     .post("/auth/local/signup")
  //     .send(userInputs)
  //     .then(res => {
  //       expect(res.body).toHaveProperty("token");
  //       done();
  //     });
  // });

  it("POST /signup return errorfs with invalid inputs");
});
