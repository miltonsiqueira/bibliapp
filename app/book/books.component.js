'use strict';

angular.
  module('app').
  component('books', {
    templateUrl: 'book/books.component.html',
    controller: ['$log', '$uibModal', '$window', 'booksService',
      function($log, $uibModal, $window, booksService) {
        var self = this,
          bookToString = function(book) {
            return book.id + ':' + book.title + ':' + book.authorId;
          };


        self.deleteBook = function (book) {
          $log.info($uibModal);
          if (book) {
            $uibModal.open({
              component: 'dialogConfirmation',
              size: 'sm',
              keyboard: true,
              resolve: {
                data: function() {
                  return {
                    title: 'Confirm delete',
                    message: 'Are you sure to delete the book "' +
                      book.title + '"?'
                  };
                }
              }
            }).
            result.then(function() {
              booksService.deleteBook(book.id)
                .then(function success(response) {
                    $log.info('Book deleted ' + bookToString(book));
                    // TODO remove from the list the book deleted
                },
                function error (response) {
                  $log.error('Book cannot be deleted ' + bookToString(book));
                });

            }, function () {
              $log.debug('Modal cancel');
            });

          }

        };


        self.updateBook = function (book){
          $uibModal.open({
            component: 'book',
            keyboard: true,
            resolve: {
              data: function() {
                return {
                  book: book
                };
              }
            }
          }).
          result.then(function() {
            // TODO update list with the book updated

          }, function () {
            $log.debug('Modal cancel');
          });
        };

        self.insertBook = function (book){
          $uibModal.open({
            component: 'book',
            keyboard: true,
            resolve: {
              data: function() {
                return {
                };
              }
            }
          }).
          result.then(function() {
            // TODO update list with the book updated

          }, function () {
            $log.debug('Modal cancel');
          });
        };

        self.getBooks = function () {
          booksService.getBooks()
            .then(function success(response) {
                self.books = response.data;
                if (!self.books) {
                  self.errorMessage = 'Books not found';
                  $log.warn(self.errorMessage);
                }
            },
            function error (response) {
                self.errorMessage = 'Error getting users!';
                $log.error(self.errorMessage);
            });
        };

        self.getBooks();

      }
    ]
  });
