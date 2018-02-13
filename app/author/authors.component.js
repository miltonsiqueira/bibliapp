'use strict';

angular.
  module('app').
  component('authors', {
    templateUrl: 'author/authors.component.html',
    bindings: {
      resolve: '<',
      modalInstance: '<'
    },
    controller: ['$log', '$uibModal', '$window', 'authorsService',
      function($log, $uibModal, $window, authorsService) {
        var $ctrl = this,
          completedName = function(author) {
            return author.firstName + ' ' + author.lastName;
          },
          authorToString = function(author) {
            return author.id + ':' + author.firstName + ':' + author.lastName;
          };

        $ctrl.$onInit = function () {
          if ($ctrl.resolve && $ctrl.resolve.modalData){
              $ctrl.isModal = true;
          }
        };
        $ctrl.deleteAuthor = function (author) {
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
                    message: 'Are you sure to delete the author "' +
                      completedName(author) + '"?'
                  };
                }
              }
            }).
            result.then(function() {
              authorsService.deleteAuthor(author.id)
                .then(function success(response) {
                    $log.info('Author deleted ' + authorToString(author));
                    var index = $ctrl.authors.indexOf(author);
                    if (index !== -1) {
                     $ctrl.authors.splice(index, 1);
                    }
                },
                function error (response) {
                  $log.error('Author cannot be deleted ' + authorToString(author));
                });

            }, function () {

            });

          }

        };


        $ctrl.updateAuthor = function (author){
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

          }, function () {

          });
        };

        $ctrl.insertAuthor = function (author){
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
            $ctrl.getAuthors();

          }, function () {

          });
        };

        $ctrl.getAuthors = function () {
          authorsService.getAuthors()
            .then(function success(response) {
                $ctrl.authors = response.data;
                if (!$ctrl.authors) {
                  $ctrl.errorMessage = 'Authors not found';
                  $log.warn($ctrl.errorMessage);
                }
                $ctrl.configPagination();
            },
            function error (response) {
                $ctrl.errorMessage = 'Error getting users!';
                $log.error($ctrl.errorMessage);
            });
        };

        $ctrl.selectAuthor = function (author) {
          $ctrl.modalInstance.close(author);
        };
        $ctrl.configPagination = function () {
          $ctrl.pagination = {
            currentPage: 0,
            maxSize: 0,
            totalPerPage: 5,
            displayItems: []
          };

          if($ctrl.authors) {
            $ctrl.pagination.currentPage = 1;
            //$ctrl.pagination.displayItems = $ctrl.authors.slice(0, $ctrl.pagination.totalPerPage);
          }
          $log.info("displayItems:" + $ctrl.pagination.displayItems);
        };
        $ctrl.pageChanged = function () {
          $log.info("Current page is " + $ctrl.pagination.currentPage);
        };

        $ctrl.getAuthors();

      }
    ]
  });
