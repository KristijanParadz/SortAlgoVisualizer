
const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    bundle: "./src/ts/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  devServer: {
    static: {
      directory: "./dist",
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "SortAlgoVisualization",
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
};
