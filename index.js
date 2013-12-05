'use strict';

var query = require('./include/query.js');
var express = require('express');
var app = express();

app.use(express.favicon(__dirname + '/favicon.ico'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/lib', express.static(__dirname + '/lib'));
app.use('/locale', express.static(__dirname + '/locale'));

app.get('/data', function(req, res) {
  query("SELECT login FROM users WHERE id = 1", function(data) {
    res.json(data);
  });
});

app.use(function(req, res, next) {
  if(req.url == '/')
    req.url += 'index.html';
  if (req.url.indexOf('.') == -1)
      req.url += '.html';
    next();
});

/*app.get('/', function(req, res) {
  res.write('some text');
  res.end();
});*/

app.use(express.static(__dirname + '/partials'));

app.listen(8888);