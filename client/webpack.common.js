const webpack = require("webpack");
const combineLoaders = require("webpack-combine-loaders");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  // path to index.js
  context: path.resolve(__dirname, "./src"),

  // entry file (index.js)
  entry: {
    app: "./index.js"
  },

  output: {
    // bundle name in file system
    filename: "./assets/js/[name].bundle.js",
    // where to find bundle on server
    publicPath: "./dist",
    // where to deposit bundle on file system
    path: path.resolve(__dirname, "./dist")
  },

  // set webpack target environment
  target: "web",

  // turn off node variables
  node: {
    __dirname: false,
    __filename: false
  },

  module: {
    rules: [
      {
        // load javascript file with ES6 syntax
        test: /\.js$/,
        loader: combineLoaders([
          {
            loader: "babel-loader"
          }
        ]),
        exclude: /node_modules/
      },
      // {
      //   // load css file as string and apply styles
      //   test: /.css$/,
      //   use: [
      //     devMode ? "style-loader" : MiniCssExtractPlugin.loader,
      //     "css-loader"
      //   ]
      // },
      {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          // "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },

  plugins: [
    // generate html file
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
      chunks: ["app"],
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: "./assets/css/app.bundle.css"
    })
  ]
};
