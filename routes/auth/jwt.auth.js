const router = require("express").Router();
const authController = require("../../controllers/authController");
// const { requireSignin } = require("../../middlewares/authentication");

const passportService = require("../../services/passport");
const passport = require("passport");

// handle different authentication methods
//--------------------------------------------------------
router.post("/signin", authController.signin);

router.post("/signup", authController.signup);

module.exports = router;
