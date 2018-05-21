const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");
const authentication = require("../services/passport");
// Handle Requests
//--------------------------------------------------------
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);
module.exports = router;
