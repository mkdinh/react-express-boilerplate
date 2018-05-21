const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  // plugins: [
  //   // generate html file
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(__dirname, "./public/index.html"),
  //     filename: "index.html",
  //     chunks: ["app"]
  //   })
  // ],

  mode: "production"
});
