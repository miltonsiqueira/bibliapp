'use strict';

angular.
  module('app').
  component('books', {
    templateUrl: 'book/books.component.html',
    controller: ['$log', '$uibModal', '$window', 'booksService',
      function($log, $uibModal, $window, booksService) {
        var $ctrl = this,
          bookToString = function(book) {
            return book.id + ':' + book.title + ':' + book.authorId;
          };


        $ctrl.deleteBook = function (book) {
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

            });

          }

        };


        $ctrl.updateBook = function (book){
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

          }, function () {

          });
        };

        $ctrl.insertBook = function (book){
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
            $ctrl.getBooks();

          }, function () {

          });
        };

        $ctrl.getBooks = function () {
          booksService.getBooks()
            .then(function success(response) {
                $ctrl.books = response.data;
                if (!$ctrl.books) {
                  $ctrl.errorMessage = 'Books not found';
                  $log.warn($ctrl.errorMessage);
                }
                $ctrl.configPagination();
            },
            function error (response) {
                $ctrl.errorMessage = 'Error getting users!';
                $log.error($ctrl.errorMessage);
            });
        };
        $ctrl.configPagination = function () {
          $ctrl.pagination = {
            currentPage: 0,
            maxSize: 0,
            totalPerPage: 5,
            displayItems: []
          };

          if($ctrl.books) {
            $ctrl.pagination.currentPage = 1;
            //$ctrl.pagination.displayItems = $ctrl.bookes.slice(0, $ctrl.pagination.totalPerPage);
          }
          $log.info("displayItems:" + $ctrl.pagination.displayItems);
        };
        $ctrl.pageChanged = function () {
          $log.info("Current page is " + $ctrl.pagination.currentPage);
        };

        $ctrl.getBooks();


      }
    ]
  });
