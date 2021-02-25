const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["./src/ts/main.ts", "./src/sass/main.scss"],
  output: {
    path: path.resolve(__dirname, "../server/dist"),
    filename: "js/bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/style.css" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new HtmlWebpackPlugin({
      title: "chart",
      hash: true,
      filename: "./html/chart.html",
      template: "./src/ts/spa/html/chart.html",
    }),
    new HtmlWebpackPlugin({
      title: "home",
      hash: true,
      filename: "./html/home.html",
      template: "./src/ts/spa/html/home.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            context: "./src/asset",
            name: "root[path][name].[ext]",
            publicPath: "../server/dist",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  mode: "development",
};
