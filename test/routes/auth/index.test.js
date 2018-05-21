const { validUser } = require("../../data/users");
const userFactory = require("../../factories/userFactory");

describe("Local Authentication", () => {
  let server;

  beforeEach(async () => {
    server = await makeServer();
  });

  afterEach(async () => {
    await server.closeConnection();
  });

  describe("POST /signup", () => {
    it("returns token with valid inputs", async () => {
      let res;
      const userInputs = { ...validUser };

      try {
        res = await request(server)
          .post("/auth/signup")
          .send(userInputs);
      } catch (err) {
        console.log(err);
      }

      expect(res.status).to.equal(203);
      expect(res.body).to.have.property("token");
    });

    it("returns error with invalid inputs", async () => {
      let res;
      const userInputs = { ...validUser, username: "", password: "" };

      res = await request(server)
        .post("/auth/signup")
        .send(userInputs);

      expect(res.body).to.eql({
        error: "You must provide an email and password",
      });
      expect(res.status).to.equal(422);
    });
  });

  describe("POST /signin-local", () => {
    it("returns jwt token if credentials is valid", async () => {
      const { email, _password } = await userFactory();

      const res = await request(server)
        .post("/auth/signin-local")
        .send({ email, password: _password });

      expect(res.status).to.equal(203);
      expect(res.body).to.have.property("token");
    });

    it("returns 401 error if credentials is invalid", async () => {
      const res = await request(server)
        .post("/auth/signin-local")
        .send({ email: "wrong username", password: "wrong password" });

      expect(res.status).to.equal(401);
    });
  });
});
