'use strict';

var fs = require('fs-extra')
  , path = require('path')
  , Client = require('../client')
  , done = require('../done');

module.exports = exports = function(opts) {
  var dir = process.cwd();
  // Ensure empty directory
  Client.getClient(function(err, cli) {
    if (err) return done(err);

    cli.getJSON('admin/products', {}, function(err, res) {
      /* istanbul ignore if */
      if (err) return done(err);
      console.log(res);

    })

  });
};
