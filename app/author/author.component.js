(function() {
  'use strict';

  angular.
  module('app').
  component('author', {
    templateUrl: 'author/author.component.html',
    bindings: {
      resolve: '<',
      modalInstance: '<'
    },
    controller: ['$log', 'authorsService', function($log, authorsService) {
      var $ctrl = this;

      $ctrl.$onInit = function() {

        $ctrl.isUpdate = $ctrl.resolve && $ctrl.resolve.data &&
          $ctrl.resolve.data.author;



        if ($ctrl.isUpdate) {
          $ctrl.title = "Author - Update";
          $ctrl.author = $ctrl.resolve.data.author;
          $ctrl.id = $ctrl.author.id;
          $ctrl.firstName = $ctrl.author.firstName;
          $ctrl.lastName = $ctrl.author.lastName;
        } else {
          $ctrl.title = "Author - Insert";

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
              $ctrl.author.firstName = $ctrl.firstName;
              $ctrl.author.lastName = $ctrl.lastName;
            }
            $ctrl.modalInstance.close();
          };

        if ($ctrl.isUpdate) {
          authorsService.updateAuthor($ctrl.id, $ctrl.firstName, $ctrl.lastName)
            .then(operationSucessed, operationFailed);
        } else {
          authorsService.addAuthor($ctrl.firstName, $ctrl.lastName)
            .then(operationSucessed, operationFailed);
        }

      };

      $ctrl.cancel = function() {
        $ctrl.modalInstance.dismiss();
      };

    }]
  });

})();
