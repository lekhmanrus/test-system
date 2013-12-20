'use strict';

angular.module('test.controllers', [])
  .controller('mainCtrl', ['$scope', 'l10n', '$route', '$location', function($scope, l10n, $route, $location) {
    l10n.setLocale('uk-UA');
    $scope.page = null;
    $scope.$on('$routeChangeSuccess', function() {
      $scope.page = $location.path();
    });
    $scope.goHome = function() {
      $location.path('/');
    }
  }])
  .controller('loginCtrl', ['$scope', '$timeout', 'l10n', function($scope, $timeout, l10n) {
    l10n.setLocale('uk-UA');
    $scope.login = sessionStorage['login-data-username'];
    $scope.password = sessionStorage['login-data-password'];
    $scope.output = "test";
    $scope.signIn = function() {
      $.get("/login/" + $scope.login + "/" + $scope.password, function(data) {
        sessionStorage['login-data-username'] = $scope.login;
        sessionStorage['login-data-password'] = $scope.password;
        $timeout(function() {
          if(data.length == 1)
            $scope.output = data[0].name + " " + data[0].surname;
        });
      });
    }
  }])
  .controller('registerCtrl', ['$scope', 'l10n', function($scope, l10n) {
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
      $.get("/register/" + $scope.login + "/" + $scope.password + "/" + $scope.email + "/" + $scope.name + "/" + $scope.surname + "/" + $scope.patronymic, function(data) {
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

  }])
  .controller('contactCtrl', ['$scope', 'l10n', function($scope, l10n) {

  }])
  .controller('404Ctrl', ['$scope', 'l10n', function($scope, l10n) {

  }]);