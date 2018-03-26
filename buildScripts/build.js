// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod'; // eslint-disable-line
import chalk from 'chalk';

process.env.NODE_ENV = 'production'; // this assures the Babel dev config doesn't apply.

console.log(chalk.blue('Generating minified bundle for production. This will take a moment...'));

let compiler = webpack(webpackConfig);

// Create an index.html that can open our production build

compiler.run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) { // Display any errors that occur.
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if (jsonStats.hasWarnings) { // Display warnings
    console.log(chalk.yellow('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(chalk.cyanBright(`Webpack stats: ${stats}`)); // Here the stats get displayed

  // if we got this far, the build succeeded.
  console.log(chalk.green('Your app has been built for production and written to /dist!'));

  return 0;
});
