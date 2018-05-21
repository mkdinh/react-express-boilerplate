const router = require("express").Router();
// handle different authentication methods
//--------------------------------------------------------

router.post("/signup", authController.signup);

module.exports = router;
