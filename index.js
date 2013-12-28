'use strict';

var query = require('./js/query.js');
var express = require('express');
var app = express();

app.use(express.json())
  .use(express.favicon(__dirname + '/public/favicon.ico'))
  .get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
  })
  .get('/category/:category', function(req, res) {
    query('SELECT * FROM "categories" WHERE "id" = ' + req.params.category + ' LIMIT 1;', function(data) {
      res.json({data : data[0]});
    });
  })
  .get('/subcategory/:subcategory', function(req, res) {
    query('SELECT * FROM "subcategories" WHERE "id" = ' + req.params.subcategory + ' LIMIT 1;', function(data) {
      res.json({data : data[0]});
    });
  })
  .get('/test/:test', function(req, res) {
    query('SELECT * FROM "tests" WHERE "id" = ' + req.params.test + ' LIMIT 1;', function(data) {
      res.json({data : data[0]});
    });
  })
  .get('/categories', function(req, res) {
    query('SELECT * FROM "categories" ORDER BY "order", "id";', function(data) {
      res.json({data : data});
    });
  })
  .get('/subcategories/:category', function(req, res) {
    query('SELECT * FROM "subcategories" WHERE "category_id" = ' + req.params.category + ' ORDER BY "order", "id";', function(data) {
      res.json({data : data});
    });
  })
  .get('/tests/:subcategory', function(req, res) {
    query('SELECT * FROM "tests" WHERE "subcategory_id" = ' + req.params.subcategory + ' ORDER BY "order", "id";', function(data) {
      res.json({data : data});
    });
  })
  .get('/questions/:test', function(req, res) {
    query('SELECT * FROM "questions" WHERE "test_id" = ' + req.params.test + ' ORDER BY "order", "id";', function(data) {
      for(var i = 0; i < data.length;) {
        query('SELECT * FROM "answers" WHERE "question_id" = ' + data[i].id + ' ORDER BY "order", "id";', function(answers) {
          /*data[i].answers = new Array(answers.length);
          for(var j = 0; j < answers.length; j++) {
            delete answers[j].points;
            data[i].answers[j] = answers[j]
          }
          console.log(answers);*/
          console.log(data[i]);
        });
        data[i].number = ++i;
      }
      //console.log(data);
      res.json({data : data});
    });
  })
  .post('/login', function(req, res) {
    query("SELECT * FROM users WHERE login = '" + req.body.login + "' AND password = '" + req.body.password + "' LIMIT 1;", function(data) {
      if(data.length != 1) {
        res.json({success : false});
        return;
      }
      else {
        delete data[0].password;
        query("SELECT r.title FROM rights r INNER JOIN users_rights ur ON r.id = ur.right_id INNER JOIN users u ON u.rights = ur.user_rights WHERE u.id = '" + data[0].id + "';", function(rights) {
          data[0].rights = new Array(rights.length);
          for(var i = 0; i < rights.length; i++)
            data[0].rights[i] = rights[i].title;
          res.json({success : true, data : data[0]});
        });
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
            query("SELECT r.title FROM rights r INNER JOIN users_rights ur ON r.id = ur.right_id INNER JOIN users u ON u.rights = ur.user_rights WHERE u.id = '" + data[0].id + "';", function(rights) {
              data[0].rights = new Array(rights.length);
              for(var i = 0; i < rights.length; i++)
                data[0].rights[i] = rights[i].title;
              res.json({success : true, data : data[0]});
            });
          });
      });
    });
  })
  .use(express.static(__dirname + '/public'))
  .listen(process.env.PORT || 8888);