import webpack from 'webpack';
import webpackConfig from './webpack.config.js'; // eslint-disable-line
import chalk from 'chalk';

const bundler = webpack(webpackConfig);

bundler.run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    console.log(chalk.red(err));// eslint-disable-line
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) { // Display any errors that occur.
    return jsonStats.errors.map(error => console.log(chalk.red(error)));// eslint-disable-line
  }

  if (jsonStats.hasWarnings) { // Display warnings
    console.log(chalk.yellow('Webpack generated the following warnings: '));// eslint-disable-line
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));// eslint-disable-line
  }

  // Here the stats get displayed
  console.log(`Webpack stats: ${stats}`); // eslint-disable-line

  // if we got this far, the build succeeded.
  console.log(chalk.green('Your app has been built for production and written to /dist!'));// eslint-disable-line

  return 0;
});
