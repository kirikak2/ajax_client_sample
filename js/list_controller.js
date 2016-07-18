'use strict';

var app = angular.module("ajaxSample", [])
app.controller("ListController", ['$scope', '$http', function($scope, $http){
  $scope.searchParams = {};
  $scope.perOptions = [
    {name: "10件", value: 10 },
    {name: "25件", value: 25 },
    {name: "50件", value: 50 },
    {name: "100件", value: 100 },
    {name: "200件", value: 200 },
  ];

  $scope.init = function(){
    $scope.perOption = $scope.perOptions[2];
    $scope.search();
  }
  $scope.search = function(){
    $scope.searchParams["per"] = $scope.perOption.value;
    $http({
      method: 'GET',
      url: 'http://54.199.208.34:3000/addresses.json',
      params: $scope.searchParams,
    }).success(function(data, status, headers, config) {
      $scope.calc(data);
    })
  };

  $scope.calc = function(data) {
    $scope.total = data.total;
    $scope.searchParams["per"] = data.per;
    $scope.searchParams["page"] = data.page;
    $scope.results = data.results;
    $scope.totalPage = parseInt(data.total / data.per) + (data.total % data.per == 0 ? 0 : 1);
    $scope.perOption = $scope.searchFromPerOption(data.per);
  }

  $scope.searchFromPerOption = function(value) {
    var selectedObject;
    $.each($scope.perOptions, function(index, object){
      if(object.value == value){
        selectedObject = object;
      }
    });
    return selectedObject;
  }

  $scope.changeParams = function(name) {
    $scope.searchParams["page"] = 1;
    $scope.search();
  }

  $scope.paginationPrev = function() {
    if($scope.canPaginationPrev()) {
      $scope.searchParams["page"] = $scope.searchParams["page"] - 1;
      $scope.search();
    }
  }

  $scope.canPaginationPrev = function() {
    return $scope.searchParams["page"] > 1;
  }

  $scope.paginationNext = function() {
    if($scope.canPaginationNext()) {
      $scope.searchParams["page"] = $scope.searchParams["page"] + 1;
      $scope.search();
    }
  }

  $scope.canPaginationNext = function() {
    return $scope.searchParams["page"] < $scope.totalPage;
  }

  $scope.isPaginationActive = function(index) {
    return $scope.searchParams["page"] == index;
  }

  $scope.paginationPageRange = function(){
    var startPage = $scope.searchParams["page"] - 3;
    var endPage = $scope.searchParams["page"] + 3;
    if(startPage <= 0){
      var offset = 1 - startPage;
      endPage = endPage + offset;
      startPage = 1;
    }
    if(endPage >= $scope.totalPage){
      var offset = endPage - $scope.totalPage;
      startPage = startPage - offset >= 1 ? startPage - offset : 1;
      endPage = $scope.totalPage;
    }
    var range = [];
    for(var i = startPage; i <= endPage; i++){
      range.push(i);
    }
    return range;
  }

  $scope.paginationClick = function(page){
    $scope.searchParams["page"] = page;
    $scope.search();
  }
}]);
