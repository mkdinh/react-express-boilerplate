const passportService = require("../services/passport");
const requireAuth = passportService.authenticate("jwt", { session: false });
const requireSignin = passportService.authenticate("local", { session: false });

module.exports = { requireAuth, requireSignin };
