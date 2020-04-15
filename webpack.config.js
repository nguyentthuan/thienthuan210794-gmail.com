var webpack = require('webpack');
var path = require('path');
//Thư mục sẽ chứa tập tin được biên dịch
var BUILD_DIR = path.resolve(__dirname, './public');
//Thư mục chứa dự án - các component React
var APP_DIR = path.resolve(__dirname, './app');

var config = {
  entry: APP_DIR + '/app.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude: '/node_modules/',
        test: /\.(js|jsx)$/
      }
    ]
  }
};

module.exports = config;