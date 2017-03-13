var app = angular.module("medMod");
app.controller("contentController", function($scope, medFactory){

  medFactory.getMedListInfo().then(function(){
    $scope.medicine = medFactory.updateMedList();
  });


});
