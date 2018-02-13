'use strict';

angular.module('app')
  .service('booksService', ['$http', function($http) {

    var apiPrefix = 'https://bibliapp.herokuapp.com/api/';

    this.getBooks = function() {
      return $http({
          method : 'GET',
          url : apiPrefix + 'books'
      });
    };

    this.getBook = function(bookId) {
        return $http({
            method : 'GET',
            url : apiPrefix + 'books/' + bookId
        });
    };

    this.addBook = function(title, authorId) {
        return $http({
            method : 'POST',
            url : apiPrefix + 'books',
            data : {
                title : title,
                authorId: authorId
            }
        });
    };

    this.updateBook = function (id, title, authorId) {
      return $http({
          method : 'PUT',
          url : apiPrefix + 'books/' + id,
          data : {
              title : title,
              authorId: authorId,
              id: id
          }
      });

    };

    this.deleteBook = function(id) {
        return $http({
            method : 'DELETE',
            url : apiPrefix + 'books/' + id
        });
    };


  }]);
