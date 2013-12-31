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
  .get('/tests/:subcategory/:uid', function(req, res) {
    //console.log('tra');
    query('SELECT t.*, ut.passed, (SELECT SUM(max_points) FROM  questions WHERE test_id = t.id) max_points FROM users_tests ut LEFT JOIN tests t ON ut.test_id = t.id WHERE t.subcategory_id = ' + req.params.subcategory + ' AND ut.user_id = ' + req.params.uid + ' ORDER BY t."order", t."id";', function(data) {
      var b = [];
      var answ = [];
      var rslt = [];
      for(var i = 0; i < data.length; i++) {
        data[i].sum = 0;
        if(data[i].passed) {
          b.push(function(k, callback) {
            query('SELECT SUM(uat.points) AS s FROM users_answers_text uat LEFT JOIN questions q ON q.id = uat.question_id AND q.test_id = ' + data[k].id, function(answers) {
              if(answers[0].s && parseInt(answers[0].s))
                data[k].sum += parseInt(answers[0].s);
              callback(undefined);
            }
          )}.bind(this, i));
          b.push(function(k, callback) {
            query('SELECT SUM(uata.points) AS s FROM users_answers_textarea uata LEFT JOIN questions q ON q.id = uata.question_id AND q.test_id = ' + data[k].id, function(answers) {
              if(answers[0].s && parseInt(answers[0].s))
                data[k].sum += parseInt(answers[0].s);
              callback(undefined);
            }
          )}.bind(this, i));
          b.push(function(k, callback) {
            query('SELECT SUM(answ.points) AS s FROM answers answ LEFT JOIN questions q ON q.id = answ.question_id AND q.test_id = ' + data[k].id + ' INNER JOIN users_answers_radio_checkbox uarch ON answ.id = uarch.answer_id', function(answers) {
              if(answers[0].s && parseInt(answers[0].s))
                data[k].sum += parseInt(answers[0].s);
              callback(undefined);
            }
          )}.bind(this, i));
        }
      }
      async.waterfall(b, function(err, result) {
        res.json({data : data});
      });
    });
  })
  .get('/questions/:test', function(req, res) {
    query('SELECT * FROM "questions" WHERE "test_id" = ' + req.params.test + ' ORDER BY "order", "id";', function(data) {
      var b = [];
      var answ = [];
      var rslt = [];
      for(var i = 0; i < data.length; i++)
        if(data[i].type == 'checkbox' || data[i].type == 'radio')
          b.push(function(k, callback) {
            query('SELECT * FROM "answers" WHERE "question_id" = ' + data[k].id + ' ORDER BY "order", "id";', function(answers) {
              for(var j = 0; j < answers.length; j++) {
                delete answers[j].points;
                if(data[k].type == 'checkbox')
                  answers[j].result = false;
              }
              answ.push(answers);
              callback(undefined);
            }
          )}.bind(this, i));
      async.waterfall(b, function(err, result) {
        for(var i = 0, j = 0; i < data.length; i++) {
          data[i].number = i + 1;
          if(data[i].type == 'text' || data[i].type == 'textarea')
            data[i].result = '';
          else
            data[i].answers = answ[j++];
          if(data[i].type == 'radio')
            data[i].result = '';
        } 
        res.json({data : data});
      });
    });
  })
  .get('/istestenabled/:test/:uid', function(req, res) {
    query("SELECT enabled FROM users_tests WHERE user_id = '" + req.params.uid + "' AND test_id = '" + req.params.test + "' LIMIT 1;", function(data) {
      res.json({enabled : data[0].enabled});
    });
  })
  .post('/sendanswersradiocheckbox', function(req, res) {
    query("INSERT INTO users_answers_radio_checkbox (user_id, question_id, answer_id) VALUES ('" + req.body.uid + "', '" + req.body.qid + "', '" + req.body.aid + "');", function(data) {
      res.json({success : true});
    });
  })
  .post('/sendanswerstext', function(req, res) {
    query("INSERT INTO users_answers_" + req.body.qtype + " (user_id, question_id, answer) VALUES ('" + req.body.uid + "', '" + req.body.qid + "', '" + req.body.answer + "');", function(data) {
      res.json({success : true});
    });
  })
  .post('/disableandpasstest', function(req, res) {
    query("UPDATE users_tests SET enabled = 'f', passed = 't' WHERE user_id = '" + req.body.uid + "' AND test_id = '" + req.body.tid + "';", function(data) {
      res.json({success : true});
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
        res.json({success : true, data : data[0]});
      }
    });
  })
  .post('/register', function(req, res) {
    query("SELECT * FROM users WHERE login = '" + req.body.login + "' LIMIT 1;", function(data) {
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
        });
      }
    });
  })
  .post('/adduser', function(req, res) {
    query("SELECT * FROM users WHERE login = '" + req.body.login + "' LIMIT 1;", function(data) {
      if(data.length != 0) {
        res.json({success : false});
        return;
      }
      query("INSERT INTO users (login, password, email, name, surname, patronymic, rights) VALUES ('" + req.body.login + "', '" + req.body.password + "', '" + req.body.email + "', '" + req.body.name + "', '" + req.body.surname + "', '" + req.body.patronymic + "', '" + req.body.rights + "');", function(data) {
        res.json({success : true});
      });
    });
  })
  .post('/profile', function(req, res) {
    query("SELECT * FROM users WHERE id = '" + req.body.id + "' LIMIT 1;", function(data) {
      if(data.length <= 0) {
        res.json({success : false});
        return;
      }
      else
        res.json({success : true, data : data[0]});
    });
  })
  .post('/saveprofilepw', function(req, res) {
    query("SELECT * FROM users WHERE id = '" + req.body.id + "' AND password = '" + req.body.password + "' LIMIT 1;", function(data) {
      if(data.length != 1) {
        res.json({success : false});
        return;
      }
      query("UPDATE users SET password = '" + req.body.newPassword + "', email = '" + req.body.email + "', name = '" + req.body.name + "', surname = '" + req.body.surname + "', patronymic = '" + req.body.patronymic + "' WHERE id = '" + req.body.id + "' AND password = '" + req.body.password + "';", function(data) {
          query("SELECT * FROM users WHERE id = '" + req.body.id + "' AND password = '" + req.body.newPassword + "' LIMIT 1;", function(data) {
            delete data[0].password;
            res.json({success : true, data : data[0]});
          });
      });
    });
  })
  .post('/saveprofile', function(req, res) {
    query("SELECT * FROM users WHERE id = '" + req.body.id + "' LIMIT 1;", function(data) {
      if(data.length != 1) {
        res.json({success : false});
        return;
      }
      query("UPDATE users SET email = '" + req.body.email + "', name = '" + req.body.name + "', surname = '" + req.body.surname + "', patronymic = '" + req.body.patronymic + "' WHERE id = '" + req.body.id + "';", function(data) {
          query("SELECT * FROM users WHERE id = '" + req.body.id + "' LIMIT 1;", function(data) {
            delete data[0].password;
            res.json({success : true, data : data[0]});
          });
      });
    });
  })
  .use(express.static(__dirname + '/public'))
  .listen(process.env.PORT || 8888);