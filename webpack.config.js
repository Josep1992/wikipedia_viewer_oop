const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//webpack config can also be functions
module.exports = (env) => {
  return {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['env'],
          },
        },
      ],
    },
  };
};
