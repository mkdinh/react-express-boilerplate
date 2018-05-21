const { validNote, validNotes } = require("../../data/notes");
const noteFactory = require("../../factories/noteFactory");
const _ = require("lodash");

describe("Note Routes", () => {
  let server, request;

  afterEach(async () => {
    // await server.closeConnection();
    await request.closeConnection();
  });

  describe("When user is not authenticated", () => {
    beforeEach(async () => {
      request = await SuperRequest.connect();
    });

    it("GET / throws unauthorized errors", async () => {
      const res = await request.get("/api/notes");
      expect(res.status).to.equal(401);
    });

    it("POST / throws unauthorized errors", async () => {
      const res = await request.post("/api/notes/").send({ ...validNote });
      expect(res.status).to.equal(401);
    });
    it("GET /:id throws unauthorized errors", async () => {
      const res = await request.get("/api/notes/1");
      expect(res.status).to.equal(401);
    });
    it("PUT /:id throws unauthorized errors", async () => {
      const res = await request.put("/api/notes/1");
      expect(res.status).to.equal(401);
    });
    it("DELETE /:id throws unauthorized errors", async () => {
      const res = await request.delete("/api/notes/1");
      expect(res.status).to.equal(401);
    });
  });

  describe("When user is authenticated", () => {
    let note, notes;

    beforeEach(async () => {
      request = await SuperRequest.connect({ authenticated: true });
    });

    it("GET / returns all notes in collection", async () => {
      notes = await noteFactory({ many: true });
      const res = await request
        .get("/api/notes/")
        .set({ authorization: request._token });
      expect(res.body.length).to.eql(notes.length);
    });

    it("POST / returns new note", async () => {
      note = await noteFactory();
      const res = await request
        .post("/api/notes")
        .send({ ...validNote })
        .set({ authorization: request._token });

      const noteDb = res.body;
      expect(res.status).to.equal(201);
      expect(noteDb.title).to.equal(note.title);
      expect(noteDb.body).to.equal(note.body);
      expect(noteDb.expiration).to.deep.equal(note.expiration);
      expect(noteDb.style).to.deep.equal(note.style);
    });

    it("GET /:id returns single note object", async () => {
      note = await noteFactory();
      const res = await request
        .get(`/api/notes/${note._id}`)
        .set({ authorization: request._token });
      const noteDb = res.body;
      expect(res.status).to.equal(200);
      expect(noteDb.title).to.equal(note.title);
      expect(noteDb.body).to.equal(note.body);
      expect(noteDb.expiration).to.deep.equal(note.expiration);
      expect(noteDb.style).to.deep.equal(note.style);
    });

    it("PUT /:id returns an update note object", async () => {
      note = await noteFactory();
      const res = await request
        .put(`/api/notes/${note._id}`)
        .send({ title: "Hello! Is it me you're looking for?" })
        .set({ authorization: request._token });
      const noteDb = res.body;
      expect(res.status).to.equal(202);
      expect(noteDb.title).to.equal("Hello! Is it me you're looking for?");
      expect(noteDb.body).to.equal(note.body);
      expect(noteDb.expiration).to.deep.equal(note.expiration);
      expect(noteDb.style).to.deep.equal(note.style);
    });

    it("DELETE /:id returns nothing", async () => {
      note = await noteFactory();
      const res = await request
        .delete(`/api/notes/${note._id}`)
        .set({ authorization: request._token });
      expect(res.status).to.equal(204);
    });
  });
});
