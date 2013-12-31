'use strict';

angular.module('test.controllers', [])
  .controller('mainCtrl', ['$scope', 'l10n', '$route', '$location', '$http', 'toaster', function($scope, l10n, $route, $location, $http, toaster) {
    var defaultLang = "ua";
    $scope.languages = {
      ua : {name : 'ua', image : 'ua.gif', locale : 'uk-UA'},
      ru : {name : 'ru', image : 'ru.gif', locale : 'ru-RU'},
      us : {name : 'us', image : 'us.gif', locale : 'en-US'}
    };
    $scope.language = $scope.languages[defaultLang];
    if(sessionStorage['language'])
      $scope.language = JSON.parse(sessionStorage['language'] || $scope.languages[defaultLang]);
    l10n.setLocale($scope.language.locale);
    $scope.setLanguage = function(lang) {
      $scope.loading = true;
      sessionStorage['language'] = JSON.stringify($scope.languages[lang]);
      location.reload();
      $scope.loading = false;
    }
    $scope.search = {q : ""};
    $scope.loading = false;
    $scope.loginFlag = false;
    $scope.actions = undefined;
    $scope.user = JSON.parse(sessionStorage['user'] || '{}');
    if($scope.user && $scope.user.id && $scope.user.id > 0) {
      $http.post("/user", {id : $scope.user.id})
        .then(function(data) {
          if(data.data.success) {
            $scope.loginFlag = true;
            $scope.user = data.data.data;
            $scope.actions = data.data.actions;
            sessionStorage['user'] = JSON.stringify(data.data.data);
          }
          else {
            toaster.pop('error', l10n.get('main.error'), l10n.get('main.error-auth'));
            $scope.loginFlag = false;
          }
        },
        function() {
          toaster.pop('error', l10n.get('main.error'), l10n.get('main.error-attempt'));
        });
    }
    
    $scope.page = null;
    $scope.$on('$routeChangeSuccess', function() {
      $scope.page = $location.path();
    });
    $scope.logout = function() {
      $scope.loading = true;
      delete sessionStorage['user'];
      $scope.user = null;
      location.reload();
      $scope.loading = false;
    }
    $scope.goHome = function() {
      $scope.goFullScreenViaWatcher();
      $location.path('/');
    }
  }])
  .controller('loginCtrl', ['$scope', 'l10n', '$http', 'toaster', function($scope, l10n, $http, toaster) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.user = sessionStorage['user'];
    $scope.output = "test";
    $scope.signIn = function() {
      $scope.$parent.loading = true;
      var params = {
        login : $scope.login, 
        password : $scope.password,
      };
      $http.post("/login", params)
        .then(function(data) {
          if(data.data.success) {
            sessionStorage['user'] = JSON.stringify(data.data.data);
            location.reload();
          }
          else
            toaster.pop('error', l10n.get('login.error'), l10n.get('login.error-log-pass'));
          $scope.$parent.loading = false;
        },
        function() {
          toaster.pop('error', l10n.get('login.error'), l10n.get('login.error-attempt'));
          $scope.$parent.loading = false;
        });
    }
  }])
  .controller('registerCtrl', ['$scope', 'l10n', '$http', 'toaster', function($scope, l10n, $http, toaster) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.login = "";
    $scope.password = "";
    $scope.confirm = "";
    $scope.email = "";
    $scope.name = "";
    $scope.surname = "";
    $scope.patronymic = "";
    $scope.register = function() {
      $scope.$parent.loading = true;
      if($scope.login.length < 6) {
        toaster.pop('warning', l10n.get('registration.error'), l10n.get('registration.error-log-lenght'));
        $scope.$parent.loading = false;
        return;
      }
      if($scope.password != $scope.confirm) {
        toaster.pop('warning', l10n.get('registration.error'), l10n.get('registration.error-pass-repeat'));
        $scope.$parent.loading = false;
        return;
      }
      if($scope.password.length < 6) {
        toaster.pop('warning', l10n.get('registration.error'), l10n.get('registration.error-pass-lenght'));
        $scope.$parent.loading = false;
        return;
      }
      if($scope.email == undefined || !$scope.email) {
        toaster.pop('warning', l10n.get('registration.error'), l10n.get('registration.error-email'));
        $scope.$parent.loading = false;
        return;
      }
      var params = {
        login : $scope.login, 
        password : $scope.password,
        email : $scope.email,
        name : $scope.name,
        surname : $scope.surname,
        patronymic : $scope.patronymic
      };
      $http.post("/register", params)
        .then(function(data) {
          if(data.data.success) {
            toaster.pop('success', l10n.get('registration.hello') + data.data.data.name + " " + data.data.data.surname, l10n.get('registration.hello-msg'));
            sessionStorage['user'] = JSON.stringify(data.data.data);
            location.reload();
          }
          else
            toaster.pop('error', l10n.get('registration.error'), l10n.get('registration.error-attempt'));
          $scope.$parent.loading = false;
      },
      function() {
        toaster.pop('error', l10n.get('registration.error'), l10n.get('registration.error-attempt'));
        $scope.$parent.loading = false;
      });
    }
  }])
  .controller('aboutCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('contactCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('categoriesCtrl', ['$scope', '$timeout', 'l10n', function($scope, $timeout, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.$parent.search.q = "";
    $scope.$parent.loading = true;
    $scope.categories = [];
    $.get("/categories", function(data) {
      $timeout(function() {
        $scope.categories = data.data;
        $scope.$parent.loading = false;
      });
    });
  }])
  .controller('subcategoriesCtrl', ['$scope', '$timeout', '$routeParams', 'l10n', function($scope, $timeout, $routeParams, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.$parent.search.q = "";
    $scope.$parent.loading = true;
    $scope.category = $routeParams.category;
    $scope.subcategories = [];
    $.get("/category/" +  $scope.category, function(data) {
      $timeout(function() {
        $scope.category = data.data;
      });
    });
    $.get("/subcategories/" +  $scope.category, function(data) {
      $timeout(function() {
        $scope.subcategories = data.data;
        $scope.$parent.loading = false;
      });
    });
  }])
  .controller('testsCtrl', ['$scope', '$timeout', '$routeParams', 'l10n', function($scope, $timeout, $routeParams, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.$parent.search.q = "";
    $scope.$parent.loading = true;
    $scope.category = $routeParams.category;
    $scope.subcategory = $routeParams.subcategory;
    $scope.tests = [];
    $.get("/category/" +  $scope.category, function(data) {
      $timeout(function() {
        $scope.category = data.data;
      });
    });
    $.get("/subcategory/" +  $scope.subcategory, function(data) {
      $timeout(function() {
        $scope.subcategory = data.data;
      });
    });
    $.get("/tests/" +  $scope.subcategory + "/" + $scope.user.id, function(data) {
      $timeout(function() {
        $scope.tests = data.data;
        for(var i = 0; i < $scope.tests.length; i++)
          if($scope.tests[i].sum < 0)
            $scope.tests[i].sum = 0;
          else if($scope.tests[i].sum > $scope.tests[i].max_points)
            $scope.tests[i].sum = $scope.tests[i].max_points;
        $scope.$parent.loading = false;
      });
    });
  }])
  .controller('questionsCtrl', ['$scope', '$timeout', '$routeParams', 'l10n', '$http', 'toaster', '$location', function($scope, $timeout, $routeParams, l10n, $http, toaster, $location) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.$parent.loading = true;
    $scope.category = $routeParams.category;
    $scope.subcategory = $routeParams.subcategory;
    $scope.test = $routeParams.test;
    $scope.enabled = false;
    $scope.questions = [];
    $.get("/istestenabled/" +  $scope.test + "/" +  $scope.$parent.user.id, function(data) {
      $timeout(function() {
        $scope.enabled = data.enabled;
        if($scope.enabled) {
          $.get("/category/" +  $scope.category, function(data) {
            $timeout(function() {
              $scope.category = data.data;
            });
          });
          $.get("/subcategory/" +  $scope.subcategory, function(data) {
            $timeout(function() {
              $scope.subcategory = data.data;
            });
          });
          $.get("/test/" +  $scope.test, function(data) {
            $timeout(function() {
              $scope.test = data.data;
            });
          });
          $.get("/questions/" +  $scope.test, function(data) {
            $timeout(function() {
              $scope.questions = data.data;
              for(var i = 0; i < $scope.questions.length; i++)
                $scope.questions[i].answered = false;
              $scope.$parent.loading = false;
            });
          });
          $scope.valueNow = 0;
          $scope.answered = 0;
          $scope.change = function(qid) {
            var qpos = 0;
            for(var i = 0; i < $scope.questions.length; i++)
              if($scope.questions[i].id == qid) {
                qpos = i;
                break;
              }
            if($scope.questions[qpos].type == 'checkbox') {
              var flag = false;
              for(var i = 0; i < $scope.questions[qpos].answers.length; i++)
                if($scope.questions[qpos].answers[i].result) {
                  flag = true;
                  break;
                }
              if(flag)
                $scope.questions[qpos].answered = true;
              else
                $scope.questions[qpos].answered = false;
            }
            else {
              if($scope.questions[qpos].result && $scope.questions[qpos].result.length > 0)
                $scope.questions[qpos].answered = true;
              else
                $scope.questions[qpos].answered = false;
            }
            $scope.answered = 0;
            for(var i = 0; i < $scope.questions.length; i++)
              if($scope.questions[i].answered)
                $scope.answered++;
            $scope.valueNow = $scope.answered / $scope.questions.length * 100;
            if($scope.valueNow > 100)
              $scope.valueNow = 100;
            if($scope.valueNow < 0)
              $scope.valueNow = 0;
          }
          $scope.commit = function() {
            if($scope.questions.length != $scope.answered)
              return;
            for(var i = 0; i < $scope.questions.length; i++) {
              $scope.$parent.loading = true;
              if($scope.questions[i].type == 'radio') {
                if($scope.questions[i].result && $scope.questions[i].result.length > 0) {
                  var params = {
                    uid : $scope.$parent.user.id, 
                    qid : $scope.questions[i].id,
                    aid : $scope.questions[i].result
                  };
                  $http.post("/sendanswersradiocheckbox", params)
                    .then(function(data) {
                      if(!data.data.success)
                        toaster.pop('error', l10n.get('registration.error'), "Сталася помилка. Повторіть спробу пізніше.");
                      $scope.$parent.loading = false;
                    },
                    function() {
                      toaster.pop('error', l10n.get('registration.error'), l10n.get('registration.error-attempt'));
                      $scope.$parent.loading = false;
                    });
                }
              }
              else if($scope.questions[i].type == 'checkbox') {
                for(var j = 0; j < $scope.questions[i].answers.length; j++)
                  if($scope.questions[i].answers[j].result) {
                    var params = {
                      uid : $scope.$parent.user.id, 
                      qid : $scope.questions[i].id,
                      aid : $scope.questions[i].answers[j].id
                    };
                    $http.post("/sendanswersradiocheckbox", params)
                      .then(function(data) {
                        if(!data.data.success)
                          toaster.pop('error', l10n.get('registration.error'), "Сталася помилка. Повторіть спробу пізніше.");
                        $scope.$parent.loading = false;
                      },
                      function() {
                        toaster.pop('error', l10n.get('registration.error'), l10n.get('registration.error-attempt'));
                        $scope.$parent.loading = false;
                      });
                  }
              }
              else if($scope.questions[i].type == 'text' || $scope.questions[i].type == 'textarea')
                if($scope.questions[i].result && $scope.questions[i].result.length > 0) {
                  var params = {
                    qtype : $scope.questions[i].type,
                    uid : $scope.$parent.user.id, 
                    qid : $scope.questions[i].id,
                    answer : $scope.questions[i].result
                  };
                  $http.post("/sendanswerstext", params)
                    .then(function(data) {
                      if(!data.data.success)
                        toaster.pop('error', l10n.get('registration.error'), "Сталася помилка. Повторіть спробу пізніше.");
                      $scope.$parent.loading = false;
                    },
                    function() {
                      toaster.pop('error', l10n.get('registration.error'), l10n.get('registration.error-attempt'));
                      $scope.$parent.loading = false;
                    });
                }
            }
            $scope.$parent.loading = true;
            var params = {
              uid : $scope.$parent.user.id, 
              tid : $routeParams.test
            };
            $http.post("/disableandpasstest", params)
              .then(function(data) {
                if(!data.data.success)
                  toaster.pop('error', l10n.get('registration.error'), "Сталася помилка. Повторіть спробу пізніше.");
                $scope.$parent.loading = false;
                $location.path('/category/' + $routeParams.category + '/' + $routeParams.subcategory);
              },
              function() {
                toaster.pop('error', l10n.get('registration.error'), l10n.get('registration.error-attempt'));
                $scope.$parent.loading = false;
              });
          }
        }
        else
          $.get("/markoftest/" + $routeParams.test, function(data) {
            $timeout(function() {
              $scope.result = data;
              if($scope.result.sum < 0)
                $scope.result.sum = 0;
              else if($scope.result.sum > $scope.result.max)
                $scope.result.sum = $scope.result.max;
              $scope.$parent.loading = false;
            });
          });
      });
    });
  }])
  .controller('addUserCtrl', ['$scope', 'l10n', '$http', 'toaster', function($scope, l10n, $http, toaster) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.login = "";
    $scope.password = "";
    $scope.confirm = "";
    $scope.email = "";
    $scope.name = "";
    $scope.surname = "";
    $scope.patronymic = "";
    $scope.rights = 1;
    $scope.addUser = function() {
      $scope.$parent.loading = true;
      var params = {
        login : $scope.login, 
        password : $scope.password,
        email : $scope.email,
        name : $scope.name,
        surname : $scope.surname,
        patronymic : $scope.patronymic,
        rights : $scope.rights
      };
      $http.post("/adduser", params)
        .then(function(data) {
          if(data.data.success)
            toaster.pop('success', "Успішно", "Користувач <strong><u>" + $scope.login + "</u></strong> був успішно створений. <br /> Пароль: <strong><u>" + $scope.password + '</u><strong>.', null, 'trustedHtml');
          else
            toaster.pop('error', l10n.get('registration.error'), "Користвуач з таким логіном вже існує.");
          $scope.$parent.loading = false;
      },
      function() {
        toaster.pop('error', l10n.get('registration.error'), l10n.get('registration.error-attempt'));
        $scope.$parent.loading = false;
      });
    }
  }])
  .controller('editUserCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('deleteUserCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('menageAnswersCtrl', ['$scope', '$timeout', 'l10n', '$http', 'toaster', function($scope, $timeout, l10n, $http, toaster) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.answers = [];
    $.get("/uncheckedanswers", function(data) {
      $timeout(function() {
        $scope.answers = data.data;
        console.log($scope.answers);
      });
    });
    $scope.mark = function(aid) {
      var apos = 0;
      for(var i = 0; i < $scope.answers.length; i++)
        if($scope.answers[i].id == aid) {
          apos = i;
          break;
        }
      if(parseInt($scope.answers[i].points) > $scope.answers[i].max_points)
        $scope.answers[i].points = $scope.answers[i].max_points;
      $http.post("/markanswer", {
        id : $scope.answers[apos].id,
        table : $scope.answers[apos].table,
        points : $scope.answers[apos].points
      })
        .then(function(data) {
          if(data.data.success) {
            toaster.pop('success', "Успішно", "Відпоідь оцінена.");
            location.reload();
          }
          else
            toaster.pop('error', l10n.get('registration.error'), "Сталася помилка. Повторіть спробу пізніше.");
          $scope.$parent.loading = false;
        },
        function() {
          toaster.pop('error', l10n.get('registration.error'), l10n.get('registration.error-attempt'));
          $scope.$parent.loading = false;
        });
    }
  }])
  .controller('menageQuestionsCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('menageTestsCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('menageSubcategoriesCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('menageCategoriesCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('addRightsCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('editRightsCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('deleteRightsCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('profileCtrl', ['$scope', 'l10n', '$http', 'toaster', '$routeParams', function($scope, l10n, $http, toaster, $routeParams) {
    l10n.setLocale($scope.$parent.language.locale);
    $http.post("/profile", {id : $routeParams.uid})
      .then(function(data) {
        if(data.data.success)
          $scope.profile = data.data.data;
        else
          toaster.pop('error', l10n.get('main.error'), l10n.get('main.error-attempt'));
      },
      function() {
        toaster.pop('error', l10n.get('main.error'), l10n.get('main.error-attempt'));
      });
  }])
  .controller('settingsCtrl', ['$scope', 'l10n', '$http', 'toaster', '$routeParams', '$location', function($scope, l10n, $http, toaster, $routeParams, $location) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.changePassword = false;
    $http.post("/profile", {id : $scope.$parent.user.id})
      .then(function(data) {
        if(data.data.success)
          $scope.profile = data.data.data;
        else
          toaster.pop('error', l10n.get('main.error'), l10n.get('main.error-attempt'));
      },
      function() {
        toaster.pop('error', l10n.get('main.error'), l10n.get('main.error-attempt'));
      });
    $scope.save = function() {
      $scope.$parent.loading = true;
      if($scope.profile.email == undefined || !$scope.profile.email) {
        toaster.pop('warning', l10n.get('registration.error'), l10n.get('registration.error-email'));
        $scope.$parent.loading = false;
        return;
      }
      if($scope.changePassword) {
        $scope.$parent.loading = true;
        if($scope.newPassword != $scope.confirmNewPassword) {
          toaster.pop('warning', l10n.get('registration.error'), l10n.get('registration.error-pass-repeat'));
          $scope.$parent.loading = false;
          return;
        }
        if($scope.newPassword.length < 6) {
          toaster.pop('warning', l10n.get('registration.error'), l10n.get('registration.error-pass-lenght'));
          $scope.$parent.loading = false;
          return;
        }
        $http.post("/saveprofilepw", {
          id : $scope.$parent.user.id,
          email : $scope.profile.email,
          name : $scope.profile.name,
          surname : $scope.profile.surname,
          patronymic : $scope.profile.patronymic,
          password : $scope.password,
          newPassword : $scope.newPassword
        })
          .then(function(data) {
            if(data.data.success) {
              toaster.pop('success', "Успішно", "Ваш профіль успішно відредаговано.");
              sessionStorage['user'] = JSON.stringify(data.data.data);
              $location.path('/profile/' + $scope.$parent.user.id);
            }
            else
              toaster.pop('error', l10n.get('main.error'), l10n.get('main.error-attempt'));
            $scope.$parent.loading = false;
          },
          function() {
            toaster.pop('error', l10n.get('main.error'), l10n.get('main.error-attempt'));
            $scope.$parent.loading = false;
          });
      }
      else
        $http.post("/saveprofile", {
          id : $scope.$parent.user.id,
          email : $scope.profile.email,
          name : $scope.profile.name,
          surname : $scope.profile.surname,
          patronymic : $scope.profile.patronymic
        })
          .then(function(data) {
            if(data.data.success) {
              toaster.pop('success', "Успішно", "Ваш профіль успішно відредаговано.");
              sessionStorage['user'] = JSON.stringify(data.data.data);
              $location.path('/profile/' + $scope.$parent.user.id);
            }
            else
              toaster.pop('error', l10n.get('main.error'), l10n.get('main.error-attempt'));
            $scope.$parent.loading = false;
          },
          function() {
            toaster.pop('error', l10n.get('main.error'), l10n.get('main.error-attempt'));
            $scope.$parent.loading = false;
          });
    }
  }])
  .controller('404Ctrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }]);