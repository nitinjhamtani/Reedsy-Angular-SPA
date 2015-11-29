'use strict';

/* App Module */

var bookApp = angular.module('bookApp', [
  'ngRoute',
  'bookControllers', 
  'bookServices'
]);

bookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/books', {
        templateUrl: 'partials/book-list.html',
        controller: 'BookListCtrl'
      }).
      when('/books/:book', {
        templateUrl: 'partials/book-detail.html',
        controller: 'BookDetailCtrl'
      }).
      otherwise({
        redirectTo: '/books'
      });
  }]);
