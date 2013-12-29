'use strict';

angular.module('test', ['ngRoute', 'test.filters', 'test.services', 'test.directives', 'test.controllers', 'ui.bootstrap', 'l10n', 'l10n-tools', 'test.languages', '$strap.directives', 'toaster']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/register', {templateUrl: 'partials/register.html', controller: 'registerCtrl'})
                  .when('/about', {templateUrl: 'partials/about.html', controller: 'aboutCtrl'})
                  .when('/contact', {templateUrl: 'partials/contact.html', controller: 'contactCtrl'})
                  .when('/404', {templateUrl: 'partials/404.html', controller: '404Ctrl'})
                  .when('/category/:category', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/category/:category/:subcategory', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/category/:category/:subcategory/test/:test', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/adduser', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/edituser', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/deleteuser', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/menageanswers', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/menagequestions', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/menagetests', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/menagesubcategories', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/menagecategories', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/addrights', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/editrights', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .when('/admin/:category/deleterights', {templateUrl: 'partials/login.html', controller: 'loginCtrl'})
                  .otherwise({redirectTo: '/404'});

    var user = JSON.parse(sessionStorage['user'] || '{}')
    if(user && user.id > 0)
      $routeProvider.when('/', {templateUrl: 'partials/categories.html', controller: 'categoriesCtrl'})
                    .when('/register', {templateUrl: 'partials/categories.html', controller: 'categoriesCtrl'})
                    .when('/category/:category', {templateUrl: 'partials/subcategories.html', controller: 'subcategoriesCtrl'})
                    .when('/category/:category/:subcategory', {templateUrl: 'partials/tests.html', controller: 'testsCtrl'})
                    .when('/category/:category/:subcategory/test/:test', {templateUrl: 'partials/questions.html', controller: 'questionsCtrl'})
                    .when('/admin/:category/adduser', {templateUrl: 'partials/adduser.html', controller: 'addUserCtrl'})
                    .when('/admin/:category/edituser', {templateUrl: 'partials/edituser.html', controller: 'editUserCtrl'})
                    .when('/admin/:category/deleteuser', {templateUrl: 'partials/deleteuser.html', controller: 'deleteUserCtrl'})
                    .when('/admin/:category/menageanswers', {templateUrl: 'partials/menageanswers.html', controller: 'menageAnswersCtrl'})
                    .when('/admin/:category/menagequestions', {templateUrl: 'partials/menagequestions.html', controller: 'menageQuestionsCtrl'})
                    .when('/admin/:category/menagetests', {templateUrl: 'partials/menagetests.html', controller: 'menageTestsCtrl'})
                    .when('/admin/:category/menagesubcategories', {templateUrl: 'partials/menagesubcategories.html', controller: 'menageSubcategoriesCtrl'})
                    .when('/admin/:category/menagecategories', {templateUrl: 'partials/menagecategories.html', controller: 'menageCategoriesCtrl'})
                    .when('/admin/:category/addrights', {templateUrl: 'partials/addrights.html', controller: 'addRightsCtrl'})
                    .when('/admin/:category/editrights', {templateUrl: 'partials/editrights.html', controller: 'editRightsCtrl'})
                    .when('/admin/:category/deleterights', {templateUrl: 'partials/deleterights.html', controller: 'deleteRightsCtrl'});
  }]);