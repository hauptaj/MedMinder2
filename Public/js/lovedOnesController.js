var app = angular.module("medMod");

app.controller("mainController", function($scope, dataFactory){

//initiates GET request in factory then runs the updateLovedOnes function that pulls the data from the factory
  dataFactory.getLovedOneInfo().then(function() {
    $scope.personList = dataFactory.updateLovedOnes();
    console.log($scope.personList);
  });

//initiates POST request in the factory and passes object to add
  $scope.addLovedOne = function(object) {
    dataFactory.addPerson(object).then(function() {
      $scope.personList = dataFactory.updateLovedOnes();
    });
  };

//initiates DELETE request in the factory and passes person id
  $scope.removeLovedOne = function(personid) {
    dataFactory.removePerson(personid).then(function(){
      $scope.personList = dataFactory.updateLovedOnes();
      });
  };

//initates PUT request in the factory and passes new object and person id
  $scope.alterLovedOne = function(newObject, personid){
    dataFactory.alterPerson(newObject, personid).then(function(){
      $scope.personList = dataFactory.updateLovedOnes();
    });
  };

});
