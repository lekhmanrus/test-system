'use strict';

angular.module('test.controllers', [])
  .controller('mainCtrl', ['$scope', 'l10n', '$route', '$location', '$rootScope', function($scope, l10n, $route, $location, $rootScope) {
    l10n.setLocale('uk-UA');
    $scope.loginFlag = false;
    $rootScope = 'trah';
    if(sessionStorage['login-data-username'] != undefined && sessionStorage['login-data-username'].length > 0 && sessionStorage['login-data-password'] != undefined && sessionStorage['login-data-password'].length > 0)
      $scope.loginFlag = true;
    $scope.page = null;
    $scope.$on('$routeChangeSuccess', function() {
      $scope.page = $location.path();
    });
    $scope.exit = function() {
      delete sessionStorage['login-data-username'];
      delete sessionStorage['login-data-password'];
      location.reload();
    }
    $scope.goHome = function() {
      $location.path('/');
    }
  }])
  .controller('indexCtrl', ['$scope', '$timeout', 'l10n', function($scope, $timeout, l10n) {
    l10n.setLocale('uk-UA');
  }])
  .controller('loginCtrl', ['$scope', '$timeout', 'l10n', function($scope, $timeout, l10n) {
    l10n.setLocale('uk-UA');
    $scope.login = sessionStorage['login-data-username'];
    $scope.password = sessionStorage['login-data-password'];
    $scope.output = "test";
    $scope.signIn = function() {
      $.get("/login/" + $scope.login + "/" + $scope.password, function(data) {
        $timeout(function() {
          if(data.length == 1) {
            sessionStorage['login-data-username'] = $scope.login;
            sessionStorage['login-data-password'] = $scope.password;
            $scope.output = data[0].name + " " + data[0].surname;
            location.reload();
          }
        });
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
      //$.post("/register/" + $scope.login + "/" + $scope.password + "/" + $scope.email + "/" + $scope.name + "/" + $scope.surname + "/" + $scope.patronymic, function(data) {
      $http.post("/register", params, function(data) {
        sessionStorage['login-data-username'] = $scope.login;
        sessionStorage['login-data-password'] = $scope.password;
        $timeout(function() {
          if(data.length == 1) {
            alert(data[0].name + " " + data[0].surname);
            sessionStorage['login-data-username'] = $scope.login;
            sessionStorage['login-data-password'] = $scope.password;
          }
        });
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