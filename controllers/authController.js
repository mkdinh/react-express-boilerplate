const jwt = require("jwt-simple");
const keys = require("../keys");
const User = require("../models").User;

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // return token with an issue timestamp
  return jwt.encode({ sub: user._id, iat: timestamp }, keys.SECRET);
}

exports.signin = (req, res, next) => {
  // assumed that user is authenticated
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = async (req, res, next) => {
  let newUser, userDb;
  // check if username and password exists
  if (!req.body.email || !req.body.password)
    return res.status(422).send({
      error: "You must provide an email and password",
    });
  // check if user email exists in database
  try {
    userDb = await User.findOne({ email: req.body.email });
  } catch (err) {
    return next(err);
  }
  // if user exists, then return error
  if (userDb) return res.status(422).send({ error: "Email already in use" });
  // if user's email is available, create new user and save to database
  try {
    newUser = new User(req.body);
    await newUser.save();
  } catch (err) {
    return next(err);
  }

  // send authentication token to user
  res.status(203).send({ token: tokenForUser(newUser) });
};
