'use strict';

angular.module('test', ['test.filters', 'test.services', 'test.directives', 'test.controllers', 'ui.bootstrap', 'l10n', 'l10n-tools', 'test.languages']);/*.
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/canvas', {templateUrl: 'partials/canvas.html', controller: 'canvasCtrl'});
    //$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/canvas'});
  }]);*/