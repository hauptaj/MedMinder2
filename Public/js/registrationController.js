var app = angular.module("medMod");

app.controller("registrationController", function($scope, userFactory, $location) {

  $scope.pageClass = "registration-page";

  $scope.addUser= function(object){
    userFactory.addUser(object).then(function() {
      $scope.userlist = userFactory.updateUser();
    });
    $location.path('/login');
    console.log('should redirect');
  };


});
