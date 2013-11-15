'use strict';

/* Directives */


angular.module('test.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text('Version; ' + version);
    };
  }]);
