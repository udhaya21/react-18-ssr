const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
