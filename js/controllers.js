'use strict';

angular.module('test.controllers', []).
  controller('mainCtrl', ['$scope', 'l10n', function($scope, l10n) {
    l10n.setLocale('uk-UA');
    /*$scope.singleModel = 1;
    $scope.radioModel = 'Middle';
    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };*/
  }]);