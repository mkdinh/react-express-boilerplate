const { Note } = require("../../models");
const { validNote, validNotes } = require("../data/notes");

module.exports = ({ many } = {}) => {
  if (many) return Note.insertMany(validNotes);
  else return Note.create(validNote);
};
