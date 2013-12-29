'use strict';

var query = require('./js/query.js');
var express = require('express');
var async = require('async');
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
      var b = [];
      var answ = [];
      var rslt = [];
      for(var i = 0; i < data.length; i++)
        if(data[i].type == 'radio' || data[i].type == 'checkbox')
          b.push(function(k, callback) {
            query('SELECT * FROM "answers" WHERE "question_id" = ' + data[k].id + ' ORDER BY "order", "id";', function(answers) {
              for(var j = 0; j < answers.length; j++) {
                delete answers[j].points;
                answers[j].result = false;
              }
              answ.push(answers);
              callback(undefined);
            }
          )}.bind(this, i));
      async.waterfall(b, function(err, result) {
        for(var i = 0, j = 0; i < data.length; i++) {
          data[i].number = i + 1;
          //data[i].answers = answ[i];
          if(data[i].type == 'text' || data[i].type == 'textarea')
            data[i].result = '';
          else
            data[i].answers = answ[j++];
        }
        res.json({data : data});
      });
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
        /*query("SELECT r.title FROM rights r INNER JOIN users_rights ur ON r.id = ur.right_id INNER JOIN users u ON u.rights = ur.user_rights WHERE u.id = '" + data[0].id + "';", function(rights) {
          data[0].rights = new Array(rights.length);
          for(var i = 0; i < rights.length; i++)
            data[0].rights[i] = rights[i].title;
          res.json({success : true, data : data[0]});
        });*/
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
            /*query("SELECT r.title FROM rights r INNER JOIN users_rights ur ON r.id = ur.right_id INNER JOIN users u ON u.rights = ur.user_rights WHERE u.id = '" + data[0].id + "';", function(rights) {
              data[0].rights = new Array(rights.length);
              for(var i = 0; i < rights.length; i++)
                data[0].rights[i] = rights[i].title;
              res.json({success : true, data : data[0]});
            });*/
            res.json({success : true, data : data[0]});
          });
      });
    });
  })
  .post('/user', function(req, res) {
    query("SELECT * FROM users WHERE id = '" + req.body.id + "' LIMIT 1;", function(data) {
      if(data.length != 1) {
        res.json({success : false});
        return;
      }
      else {
        delete data[0].password;
        query("SELECT r.category, r.url, r.title FROM rights r INNER JOIN users_rights ur ON r.id = ur.right_id INNER JOIN users u ON u.rights = ur.user_rights WHERE u.id = '" + data[0].id + "' ORDER BY r.category, r.order;", function(rights) {
          var cats = [];
          for(var i = 0; i < rights.length; i++)
            cats[rights[i].category] = rights[i].category;
          if(cats.length > 0)
            query('SELECT id, title FROM rights_categories WHERE id IN (' + cats.toString().substr(1) + ') ORDER BY "order", "id";', function(c) {
              var actions = [];
              for(var i = 0; i < c.length; i++) {
                actions[i] = {};
                actions[i].rights = [];
                actions[i].title = c[i].title;
                actions[i].id = c[i].id;
                for(var j = 0; j < rights.length; j++)
                  if(rights[j].category == c[i].id)
                    actions[i].rights.push(rights[j]);
              }
              res.json({success : true, data : data[0], actions : actions});
            });
          else
            res.json({success : true, data : data[0], actions : undefined});
          //res.json({success : true, data : data[0], cats : cats});
        });
      }
    });
  })
  .use(express.static(__dirname + '/public'))
  .listen(process.env.PORT || 8888);