'use strict';

/* Controllers */
var reedsyBooksControllers = angular.module('bookControllers', ['ngResource','ui.filters']);

reedsyBooksControllers.controller('BookListCtrl', ['$scope', '$http', 'bookSelect', 'Book', '$routeParams', '$rootScope','$filter',
  function($scope, $http, bookSelect, Book, $routeParams, $rootScope, $filter) {

    //calls query to make http request to JSON file
    $scope.books = Book.query();
	
	$scope.currentPage = 0;
    $scope.pageSize = 10;

    //sets the filterBy to all as default and on 'all' selection
    
	//$scope.orderProp = '';
	//$scope.orderG='';
    $scope.query='';
	//currentObj is called in book-list.html when a user clicks to link to the detail page
    
	$scope.currentObj = function(book){
      //sets the currentBookObj to the object clicked 
      bookSelect.setProperty(book);
    }
	$scope.numberOfPages=function(){
		var myFilteredData = $filter('filter')($scope.books,$scope.orderProp =='' ?  undefined : $scope.orderProp,true);
        myFilteredData = $filter('filter')(myFilteredData,$scope.orderG == '' ? undefined : $scope.orderG  ,true);
        myFilteredData = $filter('filter')(myFilteredData,$scope.query);
		return Math.ceil(myFilteredData.length/$scope.pageSize);                
    }

	$scope.convertPublishedDate=function(previousDate){
        var current=new Date();
        var previous=new Date(previousDate);
    	var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + ' seconds ago';   
        }

        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }

        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }

        else if (elapsed < msPerMonth) {
             return '' + Math.round(elapsed/msPerDay) + ' days ago';   
        }

        else if (elapsed < msPerYear) {
             return '' + Math.round(elapsed/msPerMonth) + ' months ago';   
        }

        else {
             return '' + Math.round(elapsed/msPerYear ) + ' years ago';   
        }

    }

    //sets suggested books limit to 3 
    $scope.limit = 3;

}]);

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
reedsyBooksControllers.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});


reedsyBooksControllers.controller('BookDetailCtrl', ['$scope', 'bookSelect', '$location', '$routeParams', '$http',
  function($scope, $routeParams, $http, bookSelect, Book, $location) {

    //sets book variable to the current book 
    $scope.book = $routeParams.currentBookObj;      
        
    //creates contents obj to be used in bookdetail for ngrepeat on contents
    $scope.contents = {};
    for (var key in $scope.book.introduction) {
      $scope.contents[key] = $scope.book.introduction[key].content;
    };    

}]);

//redirects to landing page on refresh from detail view
reedsyBooksControllers.controller('topController', ['$location', function($location){
  $location.path("/")
}]);





