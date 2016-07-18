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
    });
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

  $scope.dataCreateInit = function() {
    $scope.record = {};
  }

  $scope.dataCreate = function() {
    $http({
      method: 'POST',
      url: 'http://54.199.208.34:3000/addresses.json',
      data: {data: JSON.stringify($scope.record) }
    }).success(function(data, status, headers, config) {
      $scope.search();
      $("#create").modal('hide');
    });
  }

  $scope.dataDeleteInit = function(record) {
    $scope.record = record;
  }

  $scope.dataDelete = function(record) {
    $http({
      method: 'DELETE',
      url: 'http://54.199.208.34:3000/addresses/' + record.id + '.json'
    }).success(function(data, status, headers, config) {
      $scope.search();
      $("#delete").modal('hide');
    });
  }

  $scope.dataUpdateInit = function(record) {
    $scope.record = record;
  }

  $scope.dataUpdate = function(record) {
    var new_record = {
      name: record.name,
      name_kana: record.name_kana,
      gender: record.gender,
      phone: record.phone,
      mail: record.mail,
      zipcode: record.zipcode,
      address1: record.address1,
      address2: record.address2,
      address3: record.address3,
      address4: record.address4,
      address5: record.address5,
      age: record.age
    }
    $http({
      method: 'PUT',
      url: 'http://54.199.208.34:3000/addresses/' + record.id + '.json',
      data: {data: JSON.stringify(new_record) }
    }).success(function(data, status, headers, config) {
      $scope.search();
      $("#update").modal('hide');
    });
  }
}]);
