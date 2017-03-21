var app = angular.module("medMod");


//control video speed
app.controller("loginController", function($scope, userFactory, sharedFactory, $location){

  $scope.pageClass = "login-page";


  $scope.moveAndUse = function(user) {
    console.log(user);
    userFactory.getUserInfo(user).then(function(){
      $scope.userid = userFactory.updateUser();
      console.log($scope.userid);
      sharedFactory.takeUser($scope.userid);
      $location.path('/main');
    });


 };

  var vid = document.getElementById("my-video");
  vid.playbackRate = 0.7;


});
