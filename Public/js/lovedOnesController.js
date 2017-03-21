var app = angular.module("medMod");

app.controller("mainController", function($scope, dataFactory, sharedFactory, $location){

  dataFactory.getLovedOneInfo(sharedFactory.passUser()).then(function() {
    $scope.personList = dataFactory.updateLovedOnes();
  });

  $scope.userId = sharedFactory.passUser();
  $scope.addLovedOne = function(object) {
    object.userid = sharedFactory.passUser();
    dataFactory.addPerson(object).then(function() {
      $scope.personList = dataFactory.updateLovedOnes();
      $scope.object.name = '';
      $scope.object.weight = '';
      $scope.object.age = '';
    });
  };

  $scope.removeLovedOne = function(personid, userId) {
    dataFactory.removePerson(personid, userId).then(function(){
      $scope.personList = dataFactory.updateLovedOnes();
    });
  };

  $scope.alterLovedOne = function(newObject, personid, userId){
    dataFactory.alterPerson(newObject, personid, userId).then(function(){
      $scope.personList = dataFactory.updateLovedOnes();
    });
  };

  $scope.moveAndLoad = function(personObject) {
    sharedFactory.takeObject(personObject);
    $location.path('/content');
  };

  $scope.switchForms = function() {
    var topForm = document.getElementById('personView');
    var bottomForm = document.getElementById('editView');
    topForm.classList.add('slideRight');
    bottomForm.classList.add('slideLeft');
  };

});
