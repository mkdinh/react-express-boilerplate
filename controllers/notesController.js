const { Note } = require("../models");

exports.index = async (req, res, next) => {
  const noteDb = await Note.find({});
  res.send(noteDb);
};

exports.create = async (req, res, next) => {
  const { title, body, style, expiration } = req.body;
  const noteDb = await Note.create({ title, body, style, expiration });
  res.status(201).json(noteDb);
};

exports.findOne = async (req, res, next) => {
  const noteDb = await Note.findOne({ _id: req.params.id });
  res.status(200).json(noteDb);
};

exports.updateOne = async (req, res, next) => {
  const noteDb = await Note.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    {
      new: true,
    },
  );

  res.status(202).json(noteDb);
};

exports.deleteOne = async (req, res, next) => {
  await Note.findOneAndRemove({ _id: req.params.id });
  res.status(204).send({ message: "Successfully delete note!" });
};
