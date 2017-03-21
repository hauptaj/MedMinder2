var app = angular.module("medMod");

app.controller("registrationController", function($scope, userFactory, $location) {

  $scope.pageClass = "registration-page";

  $scope.addUser= function(object){
    console.log('adduser function ran');
    // userFactory.addUser(object).then(function(){
    //   $scope.userlist = userFactory.updateUser();
    //   $location.path('/login');
    //   console.log('should redirect user');
    // });
    userFactory.addUser(object).then(function() {
      $scope.userlist = userFactory.updateUser();
    });
    $location.path('/login');
    console.log('should redirect');
  };


});
