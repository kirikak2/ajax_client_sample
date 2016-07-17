'use strict';

var app = angular.module("ajaxSample", [])
app.controller("ListController", ['$scope', '$http', function($scope, $http){
  $scope.searchParams = {};
  $scope.search = function(){
    $http({
      method: 'GET',
      url: 'http://54.199.208.34:3000/addresses.json',
      params: $scope.searchParams,
    }).success(function(data, status, headers, config) {
      $scope.results = data.results;
    })
  };
}]);
