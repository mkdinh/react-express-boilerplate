const mongoose = require("mongoose");
const brypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email is already in use"],
    required: [true, "Email field cannot be empty"],
    trim: true,
  },

  password: {
    type: String,
    trim: true,
    required: [true, "Password field cannot be empty"],
    validate: [
      password => {
        return password && password.length > 6;
      },
      "Password need to be greater than 6 characters",
    ],
  },

  firstName: {
    type: String,
    trim: true,
    required: [true, "First name field cannot be empty"],
  },

  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name field cannot be empty"],
  },

  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

UserSchema.pre("save", async function(next) {
  let salt, hash;
  let user = this;
  // only hash password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    // gen salt
    salt = await brypt.genSalt(10);
    // hash password along with new salt
    hash = await brypt.hash(user.password, salt);
  } catch (err) {
    return next(err);
  }
  // set encrypted hash as user password
  user.password = hash;
  // continue process
  next();
});

UserSchema.methods.verifyPassword = async function(password) {
  const isMatch = await brypt.compare(password, this.password);
  return isMatch;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
