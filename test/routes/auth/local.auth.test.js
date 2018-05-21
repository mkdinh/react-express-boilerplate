const { validUser } = require("../../data/users");
describe("Local Authentication", () => {
  let server;

  beforeEach(async () => {
    server = await makeServer();
  });

  afterEach(async () => {
    await server.closeConnection();
  });

  it("POST /signup return token with valid inputs", async () => {
    let res;
    const userInputs = { ...validUser };

    try {
      res = await request(server)
        .post("/auth/local/signup")
        .send(userInputs);
    } catch (err) {
      console.log(err);
    }

    expect(res.status).to.equal(203);
    expect(res.body).to.have.property("token");
  });

  it("POST /signup return token with valid inputs", async () => {
    let res;
    const userInputs = { ...validUser };

    try {
      res = await request(server)
        .post("/auth/local/signup")
        .send(userInputs);
    } catch (err) {
      console.log(err);
    }

    expect(res.status).to.equal(203);
    expect(res.body).to.have.property("token");
  });

  it("POST /signup return token with valid inputs", async () => {
    let res;
    const userInputs = { ...validUser };

    try {
      res = await request(server)
        .post("/auth/local/signup")
        .send(userInputs);
    } catch (err) {
      console.log(err);
    }
    expect(res.status).to.equal(203);
    expect(res.body).to.have.property("token");
  });
});
