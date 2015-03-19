'use strict';

var fs = require('fs')
  , request = require('request')
  , path = require('path')
  , utils = require('./utils');

var ApiClient = module.exports = exports = function(store) {
  this.store = store;
};

ApiClient.getClient = function(dir, cb) {

  if (typeof(dir) == 'function') {
    cb = dir;
    dir = process.cwd();
  }

  fs.readFile(path.join(dir, 'prostore.json'), 'utf-8', function(err, text) {
    if (err) return cb(err);
    try {
      cb(null, new ApiClient(JSON.parse(text)));
    } catch (e) {
      cb(e);
    }
  });
};

Object.defineProperty(ApiClient.prototype, 'baseUrl', {
  get: function() {
    var protocol = this.store.secure ? 'https' : 'http';
    return protocol + '://' + this.store.host + '/api';
  }
});

Object.defineProperty(ApiClient.prototype, 'headers', {
  get: function() {
    var publicKey = this.store.publicKey
      , privateKey = this.store.privateKey
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
    body: data
  });
};

ApiClient.prototype.json = function(method, url, data, cb) {
  if (typeof(data) == 'function') {
    cb = data;
  }
  this.request(method, url, data)({ json: true }, cb);
};

ApiClient.prototype.getJSON = function(url, data, cb) {
  return this.json('get', url, data, cb);
};
