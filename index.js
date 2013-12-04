var pg = require('pg');
var fs = require('fs');
var async = require('async');
var express = require('express');
var app = express();

var config = JSON.parse(fs.readFileSync('config/config.json', { encoding: "utf-8" }));
pg.defaults.port = '5432';
pg.defaults.host = '/var/run/postgresql';
pg.defaults.database = config.database;
pg.defaults.user = config.unix.username;
pg.defaults.password = config.unix.password;

app.use(express.favicon(__dirname + '/favicon.ico'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/lib', express.static(__dirname + '/lib'));

app.use(function(req, res, next) {
  if(req.url.indexOf('/data') == 0)
    return next();
  if(req.url == '/')
    req.url += 'index.html';
  if (req.url.indexOf('.') == -1)
      req.url += '.html';
    next();
});

app.get('/', function(req, res) {
  res.write('some text');
  res.end();
});

var connect = function(q, callback) {
  this.query(q, function(err, result) {
    if(err) {
      console.error(err);
      throw 'error running query!';
    }
    callback(null, result.rows);
  });
}

app.get('/data', function(req, res) {
  res.write('some text');
  var client = new pg.Client();
  client.connect(function(err) {
    if(err) {
      console.error('could not connect to postgres', err);
      throw 'error connecting to server!';
    }
    async.waterfall([
      function(callback){
        callback(null, "SELECT login FROM users WHERE id = 1");
      },
      connect.bind(client)
    ], function(err, result) {
      console.log(result);
      client.end();
    })
  });
  res.end();
});

app.use(express.static(__dirname + '/partials'));

app.listen(8888);