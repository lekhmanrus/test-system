'use strict';

var query = require('./js/query.js');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/data', function(req, res) {
  query("SELECT login FROM users WHERE id = 1", function(data) {
    res.json(data);
  });
});

app.get('/login/:login/:password', function(req, res) {
  query("SELECT * FROM users WHERE login = '" + req.params.login + "' AND password = '" + req.params.password + "'", function(data) {
    res.json(data);
  });
});

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8888);