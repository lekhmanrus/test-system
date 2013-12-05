'use strict';

var fs = require('fs');
var pg = require('pg');
var async = require('async');

var config = JSON.parse(fs.readFileSync('config/config.json', { encoding: "utf-8" }));
pg.defaults.port = '5432';
pg.defaults.host = '/var/run/postgresql';
pg.defaults.database = config.database;
pg.defaults.user = config.unix.username;
pg.defaults.password = config.unix.password;
var client = new pg.Client();

var exec = function(q, callback) {
  this.query(q, function(err, result) {
    if(err) {
      console.error(err);
      throw 'error exec query!';
    }
    callback(null, result.rows);
  });
}

var query = function(q, callback) {
  client.connect(function(err) {
    if(err) {
      console.error('could not connect to postgres', err);
      throw 'error connecting to server!';
    }
    async.waterfall([
      function(callback){
        callback(null, q);
      },
      exec.bind(client)
    ], function(err, result) {
      callback(result);
      client.end();
    })
  });
}

module.exports = query;