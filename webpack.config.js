var debug = process.env.NODE_ENV !== 'prod';
var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');
var distJS = '/assets/dist/js';

module.exports = {
  context: __dirname,
  devtool: debug ? 'source-map' : null,
  entry: __dirname + '/assets/src/js/scripts.js',
  output: {
    path: __dirname + distJS,
    filename: 'scripts.min.js'
  },
  resolve: {
    alias: {
      'eventEmitter/EventEmitter': 'wolfy87-eventemitter/EventEmitter',
      'get-style-property/get-style-property': 'desandro-get-style-property/get-style-property',
      'matches-selector/matches-selector': 'desandro-matches-selector/matches-selector',
      'classie/classie': 'desandro-classie/classie',
      velocity: 'velocity-animate/velocity.js',
      ScrollMagicVelocity: 'scrollmagic/scrollmagic/uncompressed/plugins/animation.velocity',
      ScrollMagicAddIndicators: 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
    }
  },
  plugins: debug ? [
    new LiveReloadPlugin()
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ],
  module: {
    loaders: [
      { test: /\.js/, loader: 'imports?define=>false' }
    ]
  }
};
