'use strict';
var bookServices = angular.module('bookServices', ['ngResource']);

//service to pass book data between controllers and views
bookServices.service('bookSelect', function(){
  //the book for the detail page
  this.currentBookObj;
  this.allBooks;
    //returns value
    this.getProperty = function () {
      return this.currentBookObj;
    };
    //sets value;
    this.setProperty = function(currValue) {
      this.currentBookObj = currValue;
      this.currentCat = currValue.genre.category;
    };
});

bookServices.factory('Book', ['$resource', function($resource){
    return $resource('books/books.json', {}, {
      query: {method:'GET', isArray:true}
    })
  }]);
