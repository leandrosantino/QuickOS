const path = require('path');
const nopdeExternals = require('webpack-node-externals')
const mode = /production/.test(String(process.env.NODE_ENV))?'production':'development'

module.exports = {
  mode,
  entry: {
    main: {
      import: './electron/main.ts',
      .../production/.test(mode)?{dependOn: 'server'}:{}
    },
    preload: './electron/preload.ts',
    server: {
      import: './server/index.ts',
      filename: '[name]/index.js'
    }
  },
  target: 'node',
  externals: [
    function ({ request }, callback) {
      if (request.includes('../database/client')) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
    nopdeExternals()
  ],
  externalsPresets:{
    node: true
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {loader:'ts-loader', options:{configFile: 'electron.tsconfig.json'}},
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
};