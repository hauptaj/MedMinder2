var app = angular.module("medMod");

app.controller("mainController", function($scope, dataFactory, sharedFactory, $location){

//initiates GET request in factory1 then runs the updateLovedOnes function that pulls the data from factory2
  dataFactory.getLovedOneInfo().then(function() {
    $scope.personList = dataFactory.updateLovedOnes();
    console.log($scope.personList);
  });

//initiates POST request in the factory1 and passes object to add
  $scope.addLovedOne = function(object) {
    dataFactory.addPerson(object).then(function() {
      $scope.personList = dataFactory.updateLovedOnes();
      $scope.object.name = '';
      $scope.object.weight = '';
      $scope.object.age = '';

    });
  };

//initiates DELETE request in the factory1 and passes person id
  $scope.removeLovedOne = function(personid) {
    dataFactory.removePerson(personid).then(function(){
      $scope.personList = dataFactory.updateLovedOnes();
      });
  };

//initates PUT request in the factory1 and passes new object and person id
  $scope.alterLovedOne = function(newObject, personid){
    dataFactory.alterPerson(newObject, personid).then(function(){
      $scope.personList = dataFactory.updateLovedOnes();
    });
  };

  $scope.moveAndLoad = function(personObject) {
    console.log(personObject);
    sharedFactory.takeObject(personObject);
    $location.path('/content');
  };

  $scope.switchForms = function() {
    var topForm = document.getElementById('personView');
    var bottomForm = document.getElementById('editView');
    console.log(topForm);
    console.log(bottomForm);
    topForm.classList.add('slideRight');
    bottomForm.classList.add('slideLeft');

  };

});
