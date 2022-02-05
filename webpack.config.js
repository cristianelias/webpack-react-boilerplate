const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = (env, { mode }) => {
  const isProduction = mode === "production";

  const backendUrl = isProduction
    ? "[INSERT PRODUCTIVE URL]"
    : "http://localhost:3000/";

  return {
    entry: "./src/main.js",
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "main.js",
      path: path.resolve(__dirname, "build"),
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backendUrl),
      }),
      new HtmlWebpackPlugin({ template: "src/index.html" }),
    ],
    devServer: {
      // open: true,
      client: {
        overlay: true,
        progress: true,
      },
      compress: true,
      port: 3000,
      historyApiFallback: true,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
            ],
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
