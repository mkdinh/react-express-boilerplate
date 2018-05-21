const User = require("../../models").User;
const { validUser } = require("../data/users");

module.exports = async () => {
  const user = await User.create(validUser);
  user._password = validUser.password;
  return user;
};
