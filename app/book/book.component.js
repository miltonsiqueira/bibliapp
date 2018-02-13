(function() {
  'use strict';

  angular.
  module('app').
  component('book', {
    templateUrl: 'book/book.component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: ['$log', 'booksService', function($log, booksService) {
      var $ctrl = this,
        getAuthorFullName = function(authorId) {
          // TODO
            return "TODO";
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
          $ctrl.authorFullName = getAuthorFullName($ctrl.authorId);
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
            $ctrl.close();
          };

        if ($ctrl.isUpdate) {
          booksService.updateBook($ctrl.id, $ctrl.bookTitle, $ctrl.authorId)
            .then(operationSucessed, operationFailed);
        } else {
          booksService.addBook($ctrl.title, $ctrl.authorId)
            .then(operationSucessed, operationFailed);
        }

      };

      $ctrl.cancel = function() {
        $ctrl.dismiss();
      };

    }]
  });

})();
