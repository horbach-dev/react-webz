const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appDirectory = path.resolve(__dirname);
const {presets, plugins} = require(`${appDirectory}/babel.config.js`);
const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));
const babelLoaderConfiguration = {
  test: /\\\\.ts$|tsx?$/,
  include: [
    path.resolve(__dirname, 'index.web.js'),
    path.resolve(__dirname, 'App.tsx'),
    path.resolve(__dirname, 'packages'),
    path.resolve(__dirname, 'component'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins,
    },
  },
};const svgLoaderConfiguration = {
  test: /\\\\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};
const imageLoaderConfiguration = {
  test: /\\\\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'rnw.bundle.js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
    }),
  ],
};
