const User = require("../../models").User;
const { validUser } = require("../data/users");

module.exports = () => {
  return User.create(validUser);
};
