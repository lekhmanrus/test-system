'use strict';

angular.module('test.controllers', [])
  .controller('mainCtrl', ['$scope', 'l10n', '$route', '$location', function($scope, l10n, $route, $location) {
    l10n.setLocale('uk-UA');
    $scope.loginFlag = false;
    $scope.user = JSON.parse(sessionStorage['user'] || '{}');
    if($scope.user && $scope.user.id && $scope.user.id > 0)
      $scope.loginFlag = true;
    $scope.page = null;
    $scope.$on('$routeChangeSuccess', function() {
      $scope.page = $location.path();
    });
    $scope.exit = function() {
      delete sessionStorage['user'];
      $scope.user = null;
      location.reload();
    }
    $scope.goHome = function() {
      $location.path('/');
    }
  }])
  .controller('indexCtrl', ['$scope', '$timeout', 'l10n', function($scope, $timeout, l10n) {
    l10n.setLocale('uk-UA');
  }])
  .controller('loginCtrl', ['$scope', '$timeout', 'l10n', '$http', function($scope, $timeout, l10n, $http) {
    l10n.setLocale('uk-UA');
    $scope.user = sessionStorage['user'];
    $scope.output = "test";
    $scope.signIn = function() {
      var params = {
        login : $scope.login, 
        password : $scope.password,
        email : $scope.email,
        name : $scope.name,
        surname : $scope.surname,
        patronymic : $scope.patronymic
      };
      $http.post("/login", params)
        .then(function(data) {
          if(data.data.success) {
            alert(data.data.data.name + " " + data.data.data.surname);
            sessionStorage['user'] = JSON.stringify(data.data.data);
            location.reload();
          };
        },
        function() {
          alert("Error.");
        });
    }
  }])
  .controller('registerCtrl', ['$scope', 'l10n', '$http', function($scope, l10n, $http) {
    l10n.setLocale('uk-UA');
    $scope.login = "";
    $scope.password = "";
    $scope.confirm = "";
    $scope.email = "";
    $scope.name = "";
    $scope.surname = "";
    $scope.patronymic = "";
    $scope.register = function() {
      if($scope.password != $scope.confirm) {

        return;
      }
      if($scope.password.length < 6) {

        return;
      }
      if($scope.login.length < 6) {

        return;
      }
      if($scope.email == undefined || !$scope.email) {

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
            alert(data.data.data.name + " " + data.data.data.surname);
            sessionStorage['user'] = JSON.stringify(data.data.data);
            location.reload();
          };
      },
      function() {
        alert("Error.");
      });
    }
  }])
  .controller('aboutCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale('uk-UA');
  }])
  .controller('contactCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale('uk-UA');
  }])
  .controller('404Ctrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale('uk-UA');
  }]);