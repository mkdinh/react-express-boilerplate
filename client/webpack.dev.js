const webpack = require("webpack");
const merge = require("webpack-merge");
const FriendErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  // display dev tools
  devtool: "inline-cheap-module-source map",

  devServer: {
    // specify static file directory
    publicPath: "/", // here's the change
    contentBase: path.resolve(__dirname, "./public/"),
    // specify webpack-dev-server port
    port: 8080,
    // open: true,
    // enable hot reload
    hot: true
  },

  plugins: [
    // display file name during hot reload
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendErrorsWebpackPlugin()
  ],

  mode: "development"
});
