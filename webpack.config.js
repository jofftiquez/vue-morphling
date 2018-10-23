const path = require('path');

function createConfig (target) {
  var name = 'index.js';

  if (target !== 'commonjs2') {
    name = 'vue-morphling.js';
  }

  var output = {
    library: 'VueMorphling',
    libraryTarget: target,
    path: path.resolve(__dirname, 'dist'),
    filename: name
  };

  if (typeof target === 'undefined') {
    name = 'vue-morphling.js';
    output = {
      path: path.resolve(__dirname, 'dist'),
      filename: name
    };
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
  };
}

module.exports = [
  createConfig('var'),
  createConfig('commonjs2')
];
