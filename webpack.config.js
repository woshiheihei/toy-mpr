const path = require("path");

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const entry = path.join(__dirname, "src", "main.js");
const outputPath = path.join(__dirname, "./dist");
const itkConfig = path.resolve(__dirname, "src", "itkConfig.js");
const NODE_MODULES_DIR = path.join(__dirname, "node_modules");

module.exports = {
  entry,
  output: {
    path: outputPath,
    filename: "bundle.js",
    clean: true,
    library: {
      type: "umd",
      name: "bundle",
    },
  },
  devServer: {
    port: 3000, // 指定使用的端口号
  },
  module: {
    rules: [{ test: /\.js$/, loader: "babel-loader" }],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(NODE_MODULES_DIR, "itk", "WebWorkers"),
          to: path.join(__dirname, "../dist", "itk", "WebWorkers"),
        },
        {
          from: path.join(NODE_MODULES_DIR, "itk", "WebWorkers"),
          to: path.join(__dirname, "../dist", "viewer", "itk", "WebWorkers"),
        },
        {
          from: path.join(NODE_MODULES_DIR, "itk", "ImageIOs"),
          to: path.join(__dirname, "../dist", "itk", "ImageIOs"),
        },
        {
          from: path.join(NODE_MODULES_DIR, "itk", "ImageIOs"),
          to: path.join(__dirname, "../dist", "viewer", "itk", "ImageIOs"),
        },
        {
          from: path.join(NODE_MODULES_DIR, "itk", "PolyDataIOs"),
          to: path.join(__dirname, "../dist", "itk", "PolyDataIOs"),
        },
        {
          from: path.join(NODE_MODULES_DIR, "itk", "PolyDataIOs"),
          to: path.join(__dirname, "../dist", "viewer", "itk", "PolyDataIOs"),
        },
      ],
    }),
  ],
  resolve: {
    fallback: { fs: false, path: false, url: false, module: false },
    alias: {
      "../itkConfig.js": itkConfig,
      "../../itkConfig.js": itkConfig,
    },
  },
  performance: {
    maxAssetSize: 10000000,
  },
};
