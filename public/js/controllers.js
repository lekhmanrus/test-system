'use strict';

angular.module('test.controllers', [])
  .controller('loginCtrl', ['$scope', '$timeout', 'l10n', function($scope, $timeout, l10n) {
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
          if(data.length == 1)
            $scope.output = data[0].name + " " + data[0].surname;
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
  }])
  .controller('aboutCtrl', ['$scope', 'l10n', function($scope, l10n) {

  }])
  .controller('contactCtrl', ['$scope', 'l10n', function($scope, l10n) {

  }])
  .controller('404Ctrl', ['$scope', 'l10n', function($scope, l10n) {

  }]);