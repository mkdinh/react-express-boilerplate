const router = require("express").Router();
const authController = require("../../controllers/authController");

// handle different authentication methods
//--------------------------------------------------------
router.post("/signin", authController.signin);

router.post("/signup", authController.signup);

module.exports = router;
