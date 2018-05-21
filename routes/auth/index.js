const router = require("express").Router();
const {
  requireSignin,
  requireAuth,
} = require("../../middlewares/authentication");

const authController = require("../../controllers/authController");

// handle different authentication methods
//--------------------------------------------------------
router.post("/signin-local", requireSignin, authController.signin);

router.post("/signup", authController.signup);

router.get("/private", requireAuth, (req, res) => {
  res.send({ assets: "super duper private info" });
});

module.exports = router;
