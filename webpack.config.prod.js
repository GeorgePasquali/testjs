import path from 'path';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import PROJECT_CONFIG from "./package.json";
import webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";

const extractSass = new ExtractTextPlugin({
  filename: `${PROJECT_CONFIG.name}-${PROJECT_CONFIG.version}.styles.css`,
  disable: process.env.NODE_ENV === "development"
});

export default {
  /**
   * The Entry to the Bundling context
   */
  entry: [
    path.resolve(__dirname, PROJECT_CONFIG.main)
  ],

  /**
   * The output Path of the bundling context
   */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${PROJECT_CONFIG.name}-${PROJECT_CONFIG.version}.bundle.js`,
    library: PROJECT_CONFIG.module,
    libraryTarget:"umd"
  },

  /**
   * Source map gets generated in a separate file
   * It is slower, but ideal for production builds
   */
  devtool: "source-map",

  optimization: {
    minimize: false, // MAKE TRUE FOR PRODUCTION
  },


  ////////////// MODULE RULES ////////////////
  module: {

    // Enables ES6 support for the Project
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  ////////////// PLUGINS ////////////////
  plugins: [
    new webpack.BannerPlugin({
      banner: `${PROJECT_CONFIG.name} Version: ${PROJECT_CONFIG.version}`,

    }),
    extractSass,
    new HtmlWebpackPlugin({
      template: "./static/template.html",
      filename: "./index.html"
    })
    ]


};
