const path = require('path');

const SRC_DIR = path.join(__dirname, 'client', 'src');
const PUBLIC_DIR = path.join(__dirname, 'client', 'public');

module.exports = {
  mode: 'development',
  entry: path.join(SRC_DIR, 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: PUBLIC_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        //  : "babel-jest",
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      // {
      //   test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      //   loader: 'sass-loader',
      // },
    ],
  },
};
