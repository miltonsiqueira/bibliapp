'use strict';

angular.
  module('app').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/book', {
          template: '<book-list></book-list>'
        }).
        when('/book/:bookId', {
          template: '<book-detail></book-detail>'
        }).
        when('/author', {
          template: '<author-list></author-list>'
        }).
        when('/author/:authorId', {
          template: '<author-detail></author-detail>'
        }).
        otherwise('/book');
    }
  ]);
