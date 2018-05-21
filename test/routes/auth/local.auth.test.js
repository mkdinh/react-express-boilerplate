const { validUser } = require("../../data/users");
describe("Local Authentication", () => {
  let server;

  beforeEach(async () => {
    server = await makeServer();
  });

  afterEach(async () => {
    await server.closeConnection();
  });

  it("POST /signup returns token with valid inputs", async () => {
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

  it("POST /signup returns error with invalid inputs", async () => {
    let res;
    const userInputs = { ...validUser, username: "", password: "" };

    try {
      res = await request(server)
        .post("/auth/local/signup")
        .send(userInputs);
    } catch (err) {
      // expect(res.errors).to.have.property("token");
    }
    expect(res.body).to.eql({
      error: "You must provide an email and password",
    });
    expect(res.status).to.equal(422);
  });
});
