const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const webpack = require('webpack'); // only add this if you don't have yet

// replace accordingly './.env' with the path of your .env file
require('dotenv').config({ path: './.env' });
module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // fallback: {
    //   os: require.resolve('os-browserify/browser'),
    //   fs: false,
    //   tls: false,
    //   net: false,
    //   path: false,
    //   https: false,
    // },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    // new Dotenv({ systemvars: true }),
    // new webpack.DefinePlugin({
    //   process: { env: {} },
    // }),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',
    // }),
    // new webpack.DefinePlugin({
    //   process: 'process/browser',
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(process.env),
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': dotenv.parsed,
    // }),

    // new webpack.EnvironmentPlugin({ ...process.env }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
    new CopyPlugin({
      patterns: [{ from: 'src', to: 'dest' }],
    }),
  ],
  stats: 'errors-only',
};
