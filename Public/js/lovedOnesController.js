var app = angular.module("medMod");

app.controller("mainController", function($scope, dataFactory){

//initiates GET request in factory then runs the updateLovedOnes function that pulls the data from the factory
  dataFactory.getLovedOneInfo().then(function() {
    $scope.personList = dataFactory.updateLovedOnes();
    console.log($scope.personList);
  });

  $scope.addLovedOne = function(object) {
    dataFactory.addPerson(object).then(function() {
      $scope.personList = dataFactory.updateLovedOnes();
    });
  };

  $scope.removeLovedOne = function(personid) {
    dataFactory.removePerson(personid).then(function(){
      $scope.personList = dataFactory.updateLovedOnes();
      });
  };

//initates PUT request in the factory that updates the object at a specific id
  $scope.alterLovedOne = function(newObject, personid){
    dataFactory.alterPerson(newObject, personid).then(function(){
      $scope.personList = dataFactory.updateLovedOnes();
    });
  };

});
