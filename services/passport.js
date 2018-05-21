const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models").User;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../keys");

// set up options for JWT Strategy
//--------------------------------------------------------
const jwtOptions = {
  secretOrKey: keys.SECRET,
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
};

const JwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  let user;
  // check if decoded user if match with database
  try {
    user = await User.find({ _id: payload.sub });
  } catch (err) {
    return done(err, false);
  }
  // return if user if found
  if (user) return done(null, user);
  // else return that search is complete but did not find user
  else return done(null, false);
});

// setup options for local strategy
//--------------------------------------------------------
const localOptions = {
  usernameField: "email",
};

const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    let user, verified;
    // check if email exists in database
    try {
      user = await User.findOne({ email });
      // if user does not exists
      if (!user) return done(null, false);
      // if user exists, verify password
      verified = await user.verifyPassword(password);
      if (verified) {
        return done(null, user);
      } else {
        // return unauthorized if password does not watch
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  },
);

// use passport strategies
//--------------------------------------------------------
passport.use(localLogin);
passport.use(JwtLogin);

module.exports = passport;
