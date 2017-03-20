var app = angular.module("medMod");

app.controller("registrationController", function($scope, userFactory) {

  $scope.addUser= function(object){
    userFactory.addUser(object).then(function(){
      $scope.userlist = userFactory.updateUser();

    });
  };
});
