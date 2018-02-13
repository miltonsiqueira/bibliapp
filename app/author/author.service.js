'use strict';

angular.module('app')
  .service('authorsService', ['$http', function($http) {

    var apiPrefix = 'https://bibliapp.herokuapp.com/api/';

    this.getAuthors = function() {
      return $http({
          method : 'GET',
          url : apiPrefix + 'authors'
      });
    };

    this.getAuthor = function(authorId) {
        return $http({
            method : 'GET',
            url : apiPrefix + 'authors/' + authorId
        });
    };

    this.addAuthor = function(firstName, lastName) {
        return $http({
            method : 'POST',
            url : apiPrefix + 'authors',
            data : {
                firstName : firstName,
                lastName: lastName
            }
        });
    };

    this.updateAuthor = function (id, firstName, lastName) {
      return $http({
          method : 'PUT',
          url : apiPrefix + 'authors/' + id,
          data : {
              firstName : firstName,
              lastName: lastName,
              id: id
          }
      });

    };

    this.deleteAuthor = function(id) {
        return $http({
            method : 'DELETE',
            url : apiPrefix + 'authors/' + id
        });
    };


  }]);
