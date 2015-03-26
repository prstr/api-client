'use strict';

var crypto = require('crypto');

/**
 * @module utils
 * @private
 */

/**
 * Returns SHA256 hash of `str`
 * @param {string} str
 * @returns {string}
 */
exports.sha256 = function(str) {
  var p = crypto.createHash('sha256');
  p.update(str, 'utf-8');
  return p.digest('hex');
};

/**
 * Returns random string of specified `length`.
 *
 * @param {number} length
 * @returns {string}
 */
exports.randomString = function(length) {
  var CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890_';
  var result = '';
  for (var i = 0; i < length; i++)
    result += CHARS[Math.floor(Math.random() * CHARS.length)];
  return result;
};
