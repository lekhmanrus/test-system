'use strict';

var query = require('./js/query.js');
var express = require('express');
var app = express();

app.use(express.json());

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

app.post('/register', function(req, res) {
  query("SELECT * FROM users WHERE login = '" + req.params.login + "' AND password = '" + req.params.password + "'", function(data) {
    if(data.length != 0) {
      res.json({error : 1});
      return;
    }
    console.log("INSERT INTO users (login, password, email, name, surname, patronymic) VALUES ('" + req.params.login + "', '" + req.params.password + "', '" + req.params.email + "', '" + req.params.name + "', '" + req.params.surname + "', '" + req.params.patronymic + "');");

    query("INSERT INTO users (login, password, email, name, surname, patronymic) VALUES ('" + req.params.login + "', '" + req.params.password + "', '" + req.params.email + "', '" + req.params.name + "', '" + req.params.surname + "', '" + req.params.patronymic + "');", function(data) {
      res.json({success : 1});
    });
  });
});

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8888);