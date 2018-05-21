const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Your note need to have a title!"],
  },
  body: {
    type: String,
    required: [true, "Your note should have a body!"],
  },

  expiration: {
    type: Date,
    default: null,
  },

  style: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      background: "#FFFFA5",
    },
  },
});

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = NoteModel;
