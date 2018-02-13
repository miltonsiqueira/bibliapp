(function() {
  'use strict';

  angular.
  module('app').
  component('book', {
    templateUrl: 'book/book.component.html',
    bindings: {
      resolve: '<',
      modalInstance: '<'
    },
    controller: ['$log', '$uibModal', 'booksService', 'authorsService',
      function($log, $uibModal, booksService, authorsService) {
        var $ctrl = this,
          getAuthor = function() {

            authorsService.getAuthor($ctrl.authorId)
              .then(function success(response) {
                  $ctrl.authorFullName = authorsService.getAuthorFullName(response.data);
                },
                function error(response) {
                  $log.error('Cannot retrieving authorId ' + $ctrl.authorId);
                });
          };

        $ctrl.$onInit = function() {

          $ctrl.isUpdate = $ctrl.resolve && $ctrl.resolve.data &&
            $ctrl.resolve.data.book;



          if ($ctrl.isUpdate) {
            $ctrl.title = "Book - Update";
            $ctrl.book = $ctrl.resolve.data.book;
            $ctrl.id = $ctrl.book.id;
            $ctrl.bookTitle = $ctrl.book.title;
            $ctrl.authorId = $ctrl.book.authorId;
            if ($ctrl.authorId) {
              getAuthor();
            }
          } else {
            $ctrl.title = "Book - Insert";

          }

        };

        $ctrl.ok = function() {
          var operationFailed = function(response) {
              self.errorMessage = response.status;
              $log.error(self.errorMessage);

              $uibModal.open({
                component: 'dialogConfirmation',
                size: 'sm',
                keyboard: true,
                resolve: {
                  data: function() {
                    return {
                      title: 'Operation failed',
                      message: self,
                      isOnlyOk: true
                    };
                  }
                }
              });
            },
            operationSucessed = function(response) {
              if ($ctrl.isUpdate) {
                $ctrl.book.title = $ctrl.bookTitle;
                $ctrl.book.authorId = $ctrl.authorId;
              }
              $ctrl.modalInstance.close();
            };

          if ($ctrl.isUpdate) {
            booksService.updateBook($ctrl.id, $ctrl.bookTitle, $ctrl.authorId)
              .then(operationSucessed, operationFailed);
          } else {
            booksService.addBook($ctrl.bookTitle, $ctrl.authorId)
              .then(operationSucessed, operationFailed);
          }

        };

        $ctrl.cancel = function() {
          $ctrl.modalInstance.dismiss();
        };

        $ctrl.selectAuthor = function() {
          $uibModal.open({
            component: 'authors',
            keyboard: true,
            resolve: {
              modalData: function() {
                return {
                  titleModal: 'Selecione a author for the book'
                };
              }
            }
          }).
          result.then(function(author) {
            $ctrl.authorFullName = authorsService.getAuthorFullName(author);
            $ctrl.authorId = author.id;
          }, function() {
            $log.debug('Modal cancel');
          });

        };

      }
    ]
  });

})();
