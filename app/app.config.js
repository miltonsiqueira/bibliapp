'use strict';

angular.
  module('app').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/book', {
          template: '<books></books>'
        }).
        when('/book/:bookId', {
          template: '<book></book>'
        }).
        when('/author', {
          template: '<authors></authors>'
        }).
        when('/author/:authorId', {
          template: '<author></author>'
        }).
        otherwise('/author');
    }
  ]);
