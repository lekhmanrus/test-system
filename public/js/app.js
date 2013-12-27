'use strict';

angular.module('test', ['ngRoute', 'test.filters', 'test.services', 'test.directives', 'test.controllers', 'ui.bootstrap', 'l10n', 'l10n-tools', 'test.languages']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/register', {templateUrl: 'partials/register.html', controller: 'registerCtrl'})
                  .when('/about', {templateUrl: 'partials/about.html', controller: 'aboutCtrl'})
                  .when('/contact', {templateUrl: 'partials/contact.html', controller: 'contactCtrl'})
                  .when('/404', {templateUrl: 'partials/404.html', controller: '404Ctrl'})
                  .otherwise({redirectTo: '/404'});

    var user = JSON.parse(sessionStorage['user'] || '{}')
    if(user && user.id > 0)
      $routeProvider.when('/', {templateUrl: 'partials/index.html', controller: 'indexCtrl'})
                    .when('/register', {templateUrl: 'partials/index.html', controller: 'indexCtrl'});
  }]);