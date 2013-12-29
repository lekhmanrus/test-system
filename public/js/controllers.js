'use strict';

angular.module('test.controllers', [])
  .controller('mainCtrl', ['$scope', 'l10n', '$route', '$location', function($scope, l10n, $route, $location) {
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
      sessionStorage['language'] = JSON.stringify($scope.languages[lang]);
      location.reload();
    }
    $scope.loginFlag = false;
    $scope.user = JSON.parse(sessionStorage['user'] || '{}');
    if($scope.user && $scope.user.id && $scope.user.id > 0)
      $scope.loginFlag = true;
    $scope.page = null;
    $scope.$on('$routeChangeSuccess', function() {
      $scope.page = $location.path();
    });
    $scope.logout = function() {
      delete sessionStorage['user'];
      $scope.user = null;
      location.reload();
    }
    $scope.goHome = function() {
      $location.path('/');
    }
  }])
  .controller('indexCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale('uk-UA');
  }])
  .controller('loginCtrl', ['$scope', 'l10n', '$http', 'toaster', function($scope, l10n, $http, toaster) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.user = sessionStorage['user'];
    $scope.output = "test";
    $scope.signIn = function() {
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
            toaster.pop('error', "Помилка", "Введений логін та/або пароль невірні. Спробуйте ще раз.");
        },
        function() {
          toaster.pop('error', "Помилка", "Повторіть спробу пізніше.");
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
      if($scope.login.length < 6) {
        toaster.pop('warning', "Помилка", "Логін має містити щонайменше 6 символів.");
        return;
      }
      if($scope.password != $scope.confirm) {
        toaster.pop('warning', "Помилка", "Невірно введено повторення паролю.");
        return;
      }
      if($scope.password.length < 6) {
        toaster.pop('warning', "Помилка", "Пароль має містити щонайменше 6 символів.");
        return;
      }
      if($scope.email == undefined || !$scope.email) {
        toaster.pop('warning', "Помилка", "Некорректно вказано e-mail адресу.");
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
            toaster.pop('success', "Привіт, " + data.data.data.name + " " + data.data.data.surname, "Ласкаво просимо до системи тестування test-system.");
            sessionStorage['user'] = JSON.stringify(data.data.data);
            location.reload();
          }
          else
            toaster.pop('error', "Помилка", "Повторіть спробу пізніше.");
      },
      function() {
        toaster.pop('error', "Помилка", "Повторіть спробу пізніше.");
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
    $scope.categories = [];
    $.get("/categories", function(data) {
      $timeout(function() {
        $scope.categories = data.data;
      });
    });
  }])
  .controller('subcategoriesCtrl', ['$scope', '$timeout', '$routeParams', 'l10n', function($scope, $timeout, $routeParams, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
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
      });
    });
  }])
  .controller('testsCtrl', ['$scope', '$timeout', '$routeParams', 'l10n', function($scope, $timeout, $routeParams, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
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
    $.get("/tests/" +  $scope.subcategory, function(data) {
      $timeout(function() {
        $scope.tests = data.data;
      });
    });
  }])
  .controller('questionsCtrl', ['$scope', '$timeout', '$routeParams', 'l10n', function($scope, $timeout, $routeParams, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.category = $routeParams.category;
    $scope.subcategory = $routeParams.subcategory;
    $scope.test = $routeParams.test;
    $scope.questions = [];
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
      });
    });
  }])
  .controller('404Ctrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }]);