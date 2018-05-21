const webpack = require("webpack");
const merge = require("webpack-merge");
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
    port: 3000,
    // enable hot reload
    hot: true,
  },

  plugins: [
    // display file name during hot reload
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  mode: "development",
});
