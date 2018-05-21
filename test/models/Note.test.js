const { Note } = require("../../models/");
const { validNote } = require("../data/notes");
const mockgoose = require("../test_helpers/mockgoose");
const sinon = require("sinon");

describe("Note model", () => {
  let note;

  beforeEach(async () => {
    await mockgoose.connect();
    note = { ...validNote };
  });

  afterEach(async () => {
    await mockgoose.disconnect();
  });

  it("create a Note if the input is correct", async () => {
    const noteDb = new Note(note);
    try {
      await noteDb.validate();
    } catch (err) {
      throw new Error("test passed with valid note inputs");
    }
  });

  it("throws an error if the title is empty", async () => {
    note = { ...note, title: "" };
    const noteDb = new Note(note);
    try {
      await noteDb.validate();
    } catch (err) {
      expect(err.errors.title).to.be.exist;
      expect(err.errors.title.message).to.equal(
        "Your note need to have a title!",
      );
      return;
    }
    // throw error it validate failed
    throw new Error("test passed with invalid note inputs");
  });

  it("throws an error if the title is empty", async () => {
    note = { ...note, body: "" };
    const noteDb = new Note(note);
    try {
      await noteDb.validate();
    } catch (err) {
      expect(err.errors.body).to.be.exist;
      expect(err.errors.body.message).to.equal("Your note should have a body!");
      return;
    }
    // throw error it validate failed
    throw new Error("test passed with invalid note inputs");
  });

  it("set default expiration date to null", async () => {
    const noteDb = new Note(note);
    expect(noteDb.expiration).to.be.null;
  });

  it("set a default styles", async () => {
    const noteDb = new Note(note);
    expect(noteDb.style).to.be.eql({
      background: "#FFFFA5",
    });
  });
});
