var app = angular.module("medMod");

app.controller("mainController", function($scope, dataFactory){

  dataFactory.getLovedOneInfo().then(function() {
    $scope.personList = dataFactory.updateLovedOnes();
    console.log($scope.personList);
  });

  $scope.addLovedOne = function(object) {
    dataFactory.addPerson(object).then(function() {
      $scope.personList = dataFactory.updateLovedOnes();
    });
  };
  
});
