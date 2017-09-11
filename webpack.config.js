const debug = process.env.NODE_ENV === 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: ['./main.js'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        },
      },
      {
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.scss$/,
      },
      {
        loaders: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
    ],
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'fomments.min.js',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: debug,
      compress: !debug,
      mangle: !debug,
      sourcemap: debug,
      compressor: {
        warnings: false,
      },
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      production: debug,
    }),
  ],
};
