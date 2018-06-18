// Import dependencies
//--------------------------------------------------------
require("dotenv").config();
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./keys");
const path = require("path");
const app = express();
const server = http.createServer(app);
const routes = require("./routes");
const PORT = process.env.PORT;

// Configure Express server
//--------------------------------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(routes);

// Configure Mongoose
//--------------------------------------------------------
mongoose.Promise = global.Promise;
mongoose
  .connect(keys.MONGODB_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch(err => console.log(err));

if (["prod", "ci"].includes(process.env.NODE_ENV)) {
  // scope static assets to express
  app.use(express.static(path.join(__dirname, "client/public")));
  // send SPA files to client
  app.use("*", (req, res, next) => {
    res.send(
      "*",
      res.sendFile(path.join(__dirname, "client/public/index.html")),
    );
  });
}

// Start server
//--------------------------------------------------------
const expressServer = app.listen(PORT, () => {
  console.log("listening to port: ", PORT);
});

module.exports = expressServer;
