'use strict';

var query = require('./js/query.js');
var express = require('express');
var app = express();

app.use(express.json())
  .use(express.favicon(__dirname + '/public/favicon.ico'))
  .get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
  })
  .get('/data', function(req, res) {
    query("SELECT login FROM users WHERE id = 1", function(data) {
      res.json(data);
    });
  })
  .post('/login', function(req, res) {
    query("SELECT * FROM users WHERE login = '" + req.body.login + "' AND password = '" + req.body.password + "' LIMIT 1;", function(data) {
      if(data.length == 0) {
        res.json({success : false});
        return;
      }
      else {
        delete data[0].password;
        res.json({success : true, data : data[0]});
      }
    });
  })
  .post('/register', function(req, res) {
    query("SELECT * FROM users WHERE login = '" + req.body.login + "' AND password = '" + req.body.password + "' LIMIT 1;", function(data) {
      if(data.length != 0) {
        res.json({success : false});
        return;
      }
      query("INSERT INTO users (login, password, email, name, surname, patronymic) VALUES ('" + req.body.login + "', '" + req.body.password + "', '" + req.body.email + "', '" + req.body.name + "', '" + req.body.surname + "', '" + req.body.patronymic + "');", function(data) {
          query("SELECT * FROM users WHERE login = '" + req.body.login + "' AND password = '" + req.body.password + "' LIMIT 1;", function(data) {
            delete data[0].password;
            res.json({success : true, data : data[0]});
          });
      });
    });
  })
  .use(express.static(__dirname + '/public'))
  .listen(process.env.PORT || 8888);