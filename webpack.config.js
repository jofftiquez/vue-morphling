const path = require('path');
const webpack = require('webpack');

function createConfig(target) {
  var name = 'index.js';

  if(target !== 'commonjs2') {
    name = 'morphling.js'
  }

  var output = {
    library: 'Morphling',
    libraryTarget: target,
    path: path.resolve(__dirname, 'dist'),
    filename: name
  }

  if(typeof target === 'undefined') {
    name = 'morphling.js';
    output = {
      path: path.resolve(__dirname, 'dist'),
      filename: name
    }
  }

  return {
    name: target,
    entry: './src',
    output: output,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        }
      ]
    }
  }
}

module.exports = [
  createConfig('var'),
  createConfig('commonjs2')
]