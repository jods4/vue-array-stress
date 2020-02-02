const { resolve } = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',

  entry: './src/main.js',

  output: {
    path: resolve(__dirname, './dist'),
  },

  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
    ]
  },

  plugins: [
    new VueLoaderPlugin(),    
  ],

  devServer: {
    hot: true,
    publicPath: '/dist/',
  },
});