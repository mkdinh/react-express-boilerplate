const router = require("express").Router();
const localAuthRoutes = require("./local.auth");
const jwtAuthRoutes = require("./jwt.auth");
// handle different authentication methods
//--------------------------------------------------------
router.use("/local", localAuthRoutes);
router.use("/jwt", jwtAuthRoutes);
module.exports = router;
