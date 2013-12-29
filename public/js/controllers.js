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
            toaster.pop('error', "Помилка", "З Вашим обліковим записом виникли проблеми. Повторіть спробу пізніше.");
            $scope.loginFlag = false;
          }
        },
        function() {
          toaster.pop('error', "Помилка", "Повторіть спробу пізніше.");
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
            toaster.pop('error', "Помилка", "Введений логін та/або пароль невірні. Спробуйте ще раз.");
          $scope.$parent.loading = false;
        },
        function() {
          toaster.pop('error', "Помилка", "Повторіть спробу пізніше.");
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
        toaster.pop('warning', "Помилка", "Логін має містити щонайменше 6 символів.");
        $scope.$parent.loading = false;
        return;
      }
      if($scope.password != $scope.confirm) {
        toaster.pop('warning', "Помилка", "Невірно введено повторення паролю.");
        $scope.$parent.loading = false;
        return;
      }
      if($scope.password.length < 6) {
        toaster.pop('warning', "Помилка", "Пароль має містити щонайменше 6 символів.");
        $scope.$parent.loading = false;
        return;
      }
      if($scope.email == undefined || !$scope.email) {
        toaster.pop('warning', "Помилка", "Некорректно вказано e-mail адресу.");
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
            toaster.pop('success', "Привіт, " + data.data.data.name + " " + data.data.data.surname, "Ласкаво просимо до системи тестування test-system.");
            sessionStorage['user'] = JSON.stringify(data.data.data);
            location.reload();
          }
          else
            toaster.pop('error', "Помилка", "Повторіть спробу пізніше.");
          $scope.$parent.loading = false;
      },
      function() {
        toaster.pop('error', "Помилка", "Повторіть спробу пізніше.");
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
    $.get("/tests/" +  $scope.subcategory, function(data) {
      $timeout(function() {
        $scope.tests = data.data;
        $scope.$parent.loading = false;
      });
    });
  }])
  .controller('questionsCtrl', ['$scope', '$timeout', '$routeParams', 'l10n', function($scope, $timeout, $routeParams, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
    $scope.$parent.loading = true;
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
        console.log($scope.questions);
        $scope.$parent.loading = false;
      });
    });
  }])
  .controller('addUserCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('editUserCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('deleteUserCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }])
  .controller('menageAnswersCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
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
  .controller('404Ctrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale($scope.$parent.language.locale);
  }]);