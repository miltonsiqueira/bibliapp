(function() {
  'use strict';

  angular.
  module('app').
  component('dialogConfirmation', {
    templateUrl: 'shared/dialog-confirmation.component.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: ['$log', function($log) {
      var $ctrl = this;
      $ctrl.$onInit = function () {

        if ($ctrl.resolve && $ctrl.resolve.data &&
            $ctrl.resolve.data.title && $ctrl.resolve.data.message) {

          $ctrl.title = $ctrl.resolve.data.title;
          $ctrl.message = $ctrl.resolve.data.message;
          $ctrl.isOnlyOk = $ctrl.resolve.data.isOnlyOk;
          
        } else {
          $ctrl.title = undefined;
          $ctrl.message = undefined;
          $log.error('Invalid resolve');
        }

      };

      $ctrl.ok = function () {
        $ctrl.close();
      };

      $ctrl.cancel = function () {
        $ctrl.dismiss();
      };

    }]
  });

})();
