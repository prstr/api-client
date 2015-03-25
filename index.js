'use strict';

var request = require('request')
  , utils = require('./utils');

var ApiClient = module.exports = exports = function(conf) {
  if (!(this instanceof ApiClient))
    return new ApiClient(conf);
  this.store = conf.store;
  this.host = conf.host;
  this.publicKey = conf.publicKey;
  this.privateKey = conf.privateKey;
  this.secure = conf.secure;
};

Object.defineProperty(ApiClient.prototype, 'baseUrl', {
  get: function() {
    var protocol = this.secure ? 'https' : 'http';
    return protocol + '://' + this.host + '/api';
  }
});

Object.defineProperty(ApiClient.prototype, 'headers', {
  get: function() {
    var publicKey = this.publicKey
      , privateKey = this.privateKey
      , nonce = utils.randomString(32)
      , token = utils.sha256(nonce + ':' + privateKey);
    return {
      'API-Auth-PublicKey': publicKey,
      'API-Auth-Nonce': nonce,
      'API-Auth-Token': token
    };
  }
});

ApiClient.prototype.url = function(url) {
  var cli = this;
  return cli.baseUrl + '/' + url.replace(/^\//, '');
};

ApiClient.prototype.request = function(method, url, data) {
  var cli = this;
  return request.defaults({
    method: method ? method.toLowerCase() : undefined,
    url: url ? cli.url(url) : undefined,
    headers: cli.headers,
    body: data,
    json: true
  });
};

ApiClient.prototype.get = function(url, options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = {};
  }
  var r = this.request('get', url);
  r(options, function(err, res, data) {
    /* istanbul ignore if */
    if (err) return cb(err);
    if (res.statusCode >= 400)
      return cb(new Error('Server returned ' + res.statusCode));
    cb(null, data);
  })
};

ApiClient.prototype['delete'] = function(url, options, cb) {
  if (typeof options == 'function') {
    cb = options;
    options = {};
  }
  var r = this.request('delete', url);
  r(options, function(err, res, data) {
    /* istanbul ignore if */
    if (err) return cb(err);
    if (res.statusCode >= 400)
      return cb(new Error('Server returned ' + res.statusCode));
    cb(null, data);
  })
};

