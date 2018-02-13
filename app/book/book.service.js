'use strict';

angular.module('app')
  .service('booksService', ['$http', '$log', function($http, $log) {

    var apiPrefix = 'https://bibliapp.herokuapp.com/api/';

    this.getBooks = function() {
      $log.info("API GET " + apiPrefix + 'books');
      return $http({
        method: 'GET',
        url: apiPrefix + 'books'
      });
    };

    this.getBook = function(bookId) {
      $log.info("API GET " + apiPrefix + 'books/' + bookId);
      return $http({
        method: 'GET',
        url: apiPrefix + 'books/' + bookId
      });
    };

    this.addBook = function(title, authorId) {
      $log.info("API POST " + apiPrefix + 'books');
      return $http({
        method: 'POST',
        url: apiPrefix + 'books',
        data: {
          title: title,
          authorId: authorId
        }
      });
    };

    this.updateBook = function(id, title, authorId) {
      $log.info("API PUT " + apiPrefix + 'books/' + id);
      return $http({
        method: 'PUT',
        url: apiPrefix + 'books/' + id,
        data: {
          title: title,
          authorId: authorId,
          id: id
        }
      });

    };

    this.deleteBook = function(id) {
      $log.info("API DELETE " + apiPrefix + 'books/' + id);
      return $http({
        method: 'DELETE',
        url: apiPrefix + 'books/' + id
      });
    };


  }]);
