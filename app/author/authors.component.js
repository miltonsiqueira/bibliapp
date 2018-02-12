'use strict';

angular.
  module('app').
  component('authors', {
    templateUrl: 'author/authors.template.html',
    controller: ['$log', 'authorsService',
      function($log, authorsService) {
        var self = this;

        self.getAuthors = function () {
          authorsService.getAuthors()
          .then(function success(response) {
              self.authors = response.data;
              if (!self.authors) {
                self.errorMessage = 'Authors not found';
                $log.warn(self.errorMessage);
              }
          },
          function error (response) {
              self.errorMessage = 'Error getting users!';
          });
        };

        self.getAuthors();

      }
    ]
  });
