'use strict';

angular.module('test.controllers', []).
  controller('loginCtrl', ['$scope', '$timeout', 'l10n', function($scope, $timeout, l10n) {
    l10n.setLocale('uk-UA');
    $scope.login = "";
    $scope.password = "";
    $scope.output = "test";
    $scope.a = function() {
      $.get("/login/" + $scope.login + "/" + $scope.password, function(data) {
        $timeout(function() {
          console.log($scope.login);
          console.log($scope.password);
          console.log(data);
          $scope.output = data;
        });
      });
    }
    /*$scope.singleModel = 1;
    $scope.radioModel = 'Middle';
    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };*/
  }]);