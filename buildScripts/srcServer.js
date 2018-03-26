import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev'; // eslint-disable-line
import HtmlWebpackPlugin from "html-webpack-plugin";
import LiveReloadPlugin from 'webpack-livereload-plugin';
import xml from 'xml';
import fs from 'fs';


/* eslint-disable no-console */


process.env.NODE_ENV = 'development'; // this assures the Babel dev config doesn't apply.

const port = 3000;
const app = express();
const compiler = webpack(config);

// Create an index.html that can open our production build
compiler.apply(
  new HtmlWebpackPlugin({
    template: "./static/template.html",
    filename: "./index.html"
  })
)

compiler.apply( // This plugin injects a script tag pointing to the livereload JS Which refreshes our page when we make a change in some src file.
  new LiveReloadPlugin({
    hostname: "localhost",
    appendScriptTag: true
  })
)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

fs.readFile('./src/assets/disks.xml', 'utf-8', function (data, err){
  if(err) console.log(err);
  console.log(data);    
});  

app.get('/disks', (req, res)=>{
  res.contentType('application/xml');
  res.sendFile(path.join(__dirname, '../src/assets/disks.xml'));
  
})


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
