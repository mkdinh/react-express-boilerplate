const { User } = require("../../models/");
const { validUser } = require("../data/users");
const mockgoose = require("../test_helpers/mockgoose");
const sinon = require("sinon");

describe("User model", () => {
  let user;

  beforeEach(async () => {
    await mockgoose.connect();
    user = { ...validUser };
  });

  afterEach(async () => {
    await mockgoose.disconnect();
  });

  it("create a User if the input is correct", async () => {
    let errors;
    const userInst = new User(user);
    try {
      await userInst.validate();
    } catch (err) {
      throw new Error("test passed with valid user inputs");
    }
  });

  it("throws error if email is empty", async () => {
    user.email = "";
    const userInst = new User(user);
    try {
      await userInst.validate();
    } catch (err) {
      expect(err.errors.email).to.be.exist;
      expect(err.errors.email.message).to.equal("Email field cannot be empty");
    }
  });

  it("throws error if username is not unique", async () => {
    const userInstOne = new User(user);
    const userInstTwo = new User(user);
    try {
      await userInstOne.save();
      await userInstTwo.save();
    } catch (err) {
      expect(err.message).to.match(/duplicate key/);
    }
  });

  it("throws error if password is empty", async () => {
    user.password = "";
    const userInst = new User(user);

    try {
      await userInst.validate();
    } catch (err) {
      expect(err.errors.password).to.be.exist;
      expect(err.errors.password.message).to.equal(
        "Password field cannot be empty",
      );
    }
  });

  it("throw error if password is less than 6 characters", async () => {
    user.password = "tiny";
    const userInst = new User(user);

    try {
      await userInst.validate();
    } catch (err) {
      expect(err.errors.password).to.be.exist;
      expect(err.errors.password.message).to.equal(
        "Password need to be greater than 6 characters",
      );
    }
  });

  it("hash password before saving", async () => {
    const userInst = new User(user);
    try {
      const userDb = await userInst.save();
      expect(user.password).to.not.equal(userDb.password);
    } catch (err) {
      throw err;
    }
  });
  it("throws error if firstName is empty", async () => {
    user.firstName = "";
    const userInst = new User(user);

    try {
      await userInst.validate();
    } catch (err) {
      expect(err.errors.firstName).to.be.exist;
      expect(err.errors.firstName.message).to.equal(
        "First name field cannot be empty",
      );
    }
  });
  it("throws error if lastName is empty", async () => {
    user.lastName = "";
    const userInst = new User(user);

    try {
      await userInst.validate();
    } catch (err) {
      expect(err.errors.lastName).to.be.exist;
      expect(err.errors.lastName.message).to.equal(
        "Last name field cannot be empty",
      );
    }
  });

  it("set 'notes' property to empty array as default", () => {
    const userInst = new User(user);
    expect(userInst.notes).to.be.instanceof(Array);
    expect(userInst.notes.length).to.equal(0);
  });

  describe("Methods", () => {
    describe("verifyPassword", () => {
      it("return false if password is incorrect", async () => {
        const wrongPassword = "This is definitely a wrong password";
        const userInst = new User(user);
        const isMatch = await userInst.verifyPassword(wrongPassword);
        expect(isMatch).to.be.false;
      });
      it("return true if password is correct", async () => {
        const userInst = new User(user);
        const isMatch = await userInst.verifyPassword(user.password);
        expect(isMatch).to.be.false;
      });
    });
  });
});
