var webpack = require('webpack');
var path = require('path');
var AssetsPlugin = require('assets-webpack-plugin');

var merge = require('lodash/merge');

var baseConfig =  {
  output: {
    path: path.join(__dirname, 'static/js'),
    publicPath: '/static/js/',
  },

  resolve: {
    root: [
      path.resolve('./modules')
    ],
    modulesDirectories: [
      "web_modules",
      "private_modules",
      "node_modules",
      "bower_components"
    ]
  },

  module: {
    loaders: [
      { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" }, //bundle 时打开
      {
        test: /\.jsx?$/i,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.mst$/i,
        loader: 'raw-loader'
      },
    ]
  },

  externals: {
    "jquery": "jQuery"
  },

};

var pc = {
  entry: {
    // main: [
    //   'es5-shim', 
    //   'es5-shim/es5-sham', 
    //   'console-polyfill', 
    //   'html5shiv', 
    //   'es6-promise', 
    //   'core-js/fn/object/assign'
    // ],
    // common: './src/common/index.js',
    userLive: './src/live/index.js',
    hostLive: './src/teacher/index.js',
    userCenter: './src/userCenter/index.js',
  },
 
  output: {
    filename: "[name].js?[hash]",
    chunkFilename: '[name].chunk.js?[chunkhash]'
  },

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 20000}),
    // 提取 webpack run time
    new webpack.optimize.CommonsChunkPlugin({
      names: "common",
      // chunks: ["userLive", "hostLive", "userCenter"],
      // minChunks: 3,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: "common",

      chunks: ["chatRoom", "liveRoom", "replyArea", "info"],
      // (use all children of the chunk)

      async: true,
      // (create an async commons chunk)

      minChunks: 3,
      // (3 children must share the module before it's separated)
    }),
    new AssetsPlugin({
      filename: 'assetsMap.json',
      prettyPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        drop_console: true
      }
    })
  ]

};

var mobile = {
  entry: {
    'userLive': './src/live_mobile/index.js',
  },
 
  output: {
    filename: "mobile/[name].js?[hash]",
    chunkFilename: 'mobile/[name].chunk.js?[chunkhash]'
  },

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 30000}),
    // 提取 webpack run time
    new webpack.optimize.CommonsChunkPlugin({
      names: "userLive",
      children: true,
      // (use all children of the chunk)

      async: true,
      // (create an async commons chunk)

      minChunks: 2,
      // (3 children must share the module before it's separated)
    }),
    new AssetsPlugin({
      filename: 'assetsMapMobile.json',
      prettyPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        drop_console: true
      }
    })
  ]

};


module.exports = [
  merge({name: 'pc'}, baseConfig, pc),
  merge({name: 'mobile'}, baseConfig, mobile),
];
