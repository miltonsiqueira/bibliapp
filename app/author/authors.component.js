'use strict';

angular.
  module('app').
  component('authors', {
    templateUrl: 'author/authors.component.html',
    controller: ['$log', '$uibModal', '$window', 'authorsService',
      function($log, $uibModal, $window, authorsService) {
        var self = this,
          completedName = function(author) {
            return author.firstName + ' ' + author.lastName;
          },
          authorToString = function(author) {
            return author.id + ':' + author.firstName + ':' + author.lastName;
          };


        self.deleteAuthor = function (author) {
          $log.info($uibModal);
          if (author) {
            $uibModal.open({
              component: 'dialogConfirmation',
              size: 'sm',
              keyboard: true,
              resolve: {
                data: function() {
                  return {
                    title: 'Confirm delete',
                    message: 'Are you sure to delete author "' +
                      completedName(author) + '"?'
                  };
                }
              }
            }).
            result.then(function() {
              authorsService.deleteAuthor(author.id)
                .then(function success(response) {
                    $log.info('Author deleted ' + authorToString(author));
                    // TODO remove from the list the author deleted
                },
                function error (response) {
                  $log.error('Author cannot be deleted ' + authorToString(author));
                });

            }, function () {
              $log.debug('Modal cancel');
            });

          }

        };


        self.updateAuthor = function (author){
          $uibModal.open({
            component: 'author',
            keyboard: true,
            resolve: {
              data: function() {
                return {
                  author: author
                };
              }
            }
          }).
          result.then(function() {
            // TODO update list with the author updated

          }, function () {
            $log.debug('Modal cancel');
          });
        };

        self.insertAuthor = function (author){
          $uibModal.open({
            component: 'author',
            keyboard: true,
            resolve: {
              data: function() {
                return {
                };
              }
            }
          }).
          result.then(function() {
            // TODO update list with the author updated

          }, function () {
            $log.debug('Modal cancel');
          });
        };

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
                $log.error(self.errorMessage);
            });
        };

        self.getAuthors();

      }
    ]
  });
