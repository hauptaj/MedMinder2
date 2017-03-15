var app = angular.module("medMod");


//control video speed
app.controller("loginController", function($scope){

  var vid = document.getElementById("my-video");
  vid.playbackRate = 0.7;
});
