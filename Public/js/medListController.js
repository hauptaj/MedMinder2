var app = angular.module("medMod");
app.controller("contentController", function($scope, medFactory, $timeout, $location){

  medFactory.getMedListInfo().then(function(){
    $scope.medicine = medFactory.updateMedList();
  });

  // $scope.addMed = function(med) {
  //   medFactory.addMedicine(med).then(function() {
  //     medFactory.findRx(med.name);
  //   });
  // }

  $scope.addMed = function(med){
    medFactory.findRx(med.name).then(function(){
      med.rxnumber = medFactory.getNewRx();
      medFactory.addMedicine(med).then(function() {
        $scope.medicine = medFactory.updateMedList();
      });

    });
  }

  $scope.deleteMed = function(medId) {
    medFactory.deleteMedicine(medId).then(function() {
      $scope.medicine = medFactory.updateMedList();
    });
  }

  $scope.updateMed = function(newMed,medId) {
    medFactory.findRx(newMed.name).then(function(){
      newMed.rxnumber = medFactory.getNewRx();
      medFactory.updateMedicine(newMed,medId).then(function(){
        $scope.medicine = medFactory.updateMedList();
      });
    });
  }

  $scope.update = function() {
    $scope.medicine = medFactory.updateMedList();
  }

});
