'use strict';

angular.module('app')
  .service('authorsService', ['$http', '$log', function($http, $log) {

    var apiPrefix = 'https://bibliapp.herokuapp.com/api/';

    this.getAuthorFullName = function(author) {
      return author.firstName + ' ' + author.lastName;
    };

    this.getAuthors = function() {
      $log.info("Calling api GET " + apiPrefix + 'authors');
      return $http({
        method: 'GET',
        url: apiPrefix + 'authors'
      });
    };

    this.getAuthor = function(authorId) {
      $log.info("Calling api GET " + apiPrefix + 'authors/' + authorId);
      return $http({
        method: 'GET',
        url: apiPrefix + 'authors/' + authorId
      });
    };

    this.addAuthor = function(firstName, lastName) {
      $log.info("Calling api POST " + apiPrefix + 'authors');
      return $http({
        method: 'POST',
        url: apiPrefix + 'authors',
        data: {
          firstName: firstName,
          lastName: lastName
        }
      });
    };

    this.updateAuthor = function(id, firstName, lastName) {
      $log.info("Calling api PUT " + apiPrefix + 'authors/' + id);
      return $http({
        method: 'PUT',
        url: apiPrefix + 'authors/' + id,
        data: {
          firstName: firstName,
          lastName: lastName,
          id: id
        }
      });

    };

    this.deleteAuthor = function(id) {
      $log.info("Calling api DELETE " + apiPrefix + 'authors/' + id);
      return $http({
        method: 'DELETE',
        url: apiPrefix + 'authors/' + id
      });
    };


  }]);
