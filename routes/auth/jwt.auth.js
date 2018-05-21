const router = require("express").Router();
const authController = require("../../controllers/authController");
const { requireSignin } = require("../../middlewares/authentication");
// handle different authentication methods
//--------------------------------------------------------

router.post("/signin", requireSignin, authController.signin);

module.exports = router;
