const path = require('path');
const webpack = require("webpack");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    main: { import: "./src/index.js", dependOn: "shared" },
    newindex: { import: "./src/newindex.js", dependOn: "shared" },
    shared: "lodash/join",
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["main", "shared"],
    }),
    new HtmlWebpackPlugin({
      filename: "newindex/index.html",
      template: "./src/index.html",
      chunks: ["newindex", "shared"],
    }),
    // new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  optimization: {
    usedExports: true,
    sideEffects: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  }
};
