import path from 'path';
import PROJECT_CONFIG from "./package.json";

module.exports = {
  entry: [
    path.resolve(__dirname, PROJECT_CONFIG.main)
  ],

  output: { // simulate the existance of this file in the dir ./src (For dev server)
    path: path.resolve(__dirname, 'src'),
    publicPath: "/",
    filename: `${PROJECT_CONFIG.name}.bundle.js`,
    library: PROJECT_CONFIG.module,
    libraryTarget:"umd"
  },

  devtool: "inline-sourcemap",

  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }]
      },

      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }

    ]
  }


};
