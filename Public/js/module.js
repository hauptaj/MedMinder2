var app = angular.module("medMod",["ngRoute"]);

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/login',{
    controller:'loginController',
    templateUrl:'view/login.html'
  })
  .when('/main',{
    controller:'mainController',
    templateUrl:'view/main.html'
  })
  .when('/content',{
    controller:'contentController',
    templateUrl:'view/content.html'
  })
  .otherwise({ redirectTo: '/login' });

  $locationProvider.hashPrefix('');
  
});
