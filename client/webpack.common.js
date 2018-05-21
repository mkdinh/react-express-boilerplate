const webpack = require("webpack");
const combineLoaders = require("webpack-combine-loaders");
const path = require("path");

module.exports = {
  // path to index.js
  context: path.resolve(__dirname, "./src"),

  // entry file (index.js)
  entry: {
    app: "./index.js",
  },

  output: {
    // bundle name in file system
    filename: "[name].bundle.js",
    // where to find bundle on server
    publicPath: "/dist",
    // where to deposit bundle on file system
    path: path.resolve(__dirname, "/dist"),
  },

  // set webpack target environment
  target: "web",

  // turn off node variables
  node: {
    __dirname: false,
    __filename: false,
  },

  module: {
    rules: [
      {
        // load javascript file with ES6 syntax
        test: /\.js$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        // load css file as string and apply styles
        test: /.css$/,
        loaders: ["style-loader", "css-loader"],
      },
    ],
  },
};
