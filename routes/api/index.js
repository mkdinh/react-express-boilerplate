const router = require("express").Router();
const noteRoutes = require("./noteRoutes");

// handle different API endpoints
//--------------------------------------------------------
router.use("/notes", noteRoutes);

module.exports = router;
