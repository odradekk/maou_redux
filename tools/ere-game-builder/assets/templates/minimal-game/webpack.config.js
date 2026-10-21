/**
 * 仅在生成 Android / 打包版（era.bundle.js + main.bundle.js + static.json）时使用。
 * 直接用 PC 版引擎打开本文件夹时不会读取这个文件。
 */
const { resolve } = require('path');

const EreWebpackPlugin = require('ere-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'ere/'),
  entry: {
    era: {
      import: './era-electron.js',
      library: { name: '_era', type: 'self' },
    },
    main: {
      dependOn: 'era',
      import: './main.js',
      library: { name: 'game', type: 'self' },
    },
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { modules: false, targets: { chrome: '60' }, useBuiltIns: false }]],
          },
        },
      },
      {
        test: /\.kojo$/,
        use: {
          loader: require.resolve('kojo-loader'),
          options: { sdkPath: '#/era-electron' },
        },
      },
    ],
  },
  output: {
    path: resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js',
  },
  performance: { hints: false },
  plugins: [new EreWebpackPlugin()],
  resolve: {
    // 与 ere/jsconfig.json 中的 "#/*" 别名保持一致
    alias: { '#': resolve(__dirname, 'ere/') },
  },
};
