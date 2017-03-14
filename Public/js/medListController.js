var app = angular.module("medMod");
app.controller("contentController", function($scope, medFactory){

  medFactory.getMedListInfo().then(function(){
    $scope.medicine = medFactory.updateMedList();
  });

  $scope.addMed = function(med) {
    medFactory.addMedicine(med).then(function() {
      $scope.medicine = medFactory.updateMedList();
    });
  }

  $scope.deleteMed = function(medId) {
    medFactory.deleteMedicine(medId).then(function() {
      $scope.medicine = medFactory.updateMedList();
    });
  }
$scope.updateMed = function(newMed,medId) {
  medFactory.updateMedicine(newMed,medId).then(function(){
    $scope.medicine = medFactory.updateMedList();
  });
}

});
