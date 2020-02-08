const router = require("express").Router();
const authController = require("../../controllers/auth.controller");

// handle different authentication methods
//--------------------------------------------------------

router.post("/signup", authController.signup);

module.exports = router;
