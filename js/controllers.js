'use strict';

angular.module('test.controllers', []).
  controller('mainCtrl', ['$scope', 'version', function($scope, version) {
    $scope = {
      version : version,
      func : function() {alert(1)};
    }
  }]);