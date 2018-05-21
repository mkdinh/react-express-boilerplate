const router = require("express").Router();
const { requireSignin } = require("../../middlewares/authentication");
const authController = require("../../controllers/authController");

// handle different authentication methods
//--------------------------------------------------------
router.post("/signin-local", requireSignin, authController.signin);

router.post("/signup", authController.signup);

module.exports = router;
