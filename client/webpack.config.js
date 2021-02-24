const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  // entry file
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: ["./src/ts/main.ts", "./src/sass/main.scss"],
  // 번들링된 js 파일의 이름(filename)과 저장될 경로(path)를 지정
  // https://webpack.js.org/configuration/output/#outputpath
  // https://webpack.js.org/configuration/output/#outputfilename
  output: {
    path: path.resolve(__dirname, "../server/dist"),
    filename: "js/bundle.js",
  },
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
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
  // https://webpack.js.org/configuration/module
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
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            context: "./src/asset",
            name: "root[path][name].[ext]",
            publicPath: "dist",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  // https://webpack.js.org/configuration/mode
  mode: "development",
};
