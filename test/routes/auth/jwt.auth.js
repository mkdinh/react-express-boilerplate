const { validUser } = require("../../data/users");
const userFactory = require("../../factories/userFactory");
const jwt = require("jwt-simple");
const keys = require("../../../keys");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // return token with an issue timestamp
  return jwt.encode({ sub: user._id, iat: timestamp }, keys.SECRET);
}

describe("Local Authentication", () => {
  let server, agent;

  beforeEach(async () => {
    server = await makeServer();
    // agent = request(server);
  });

  afterEach(async () => {
    await server.closeConnection();
  });

  it("POST auth/signin ", async () => {
    const { email, password } = await userFactory();

    const res = await request(server)
      .post("/auth/signin")
      .send({ email, password });
  });

  it("POST /signup return errorfs with invalid inputs");
});
