var app = angular.module("medMod",["ngRoute", "ngAnimate"]);

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/login',{
    controller:'loginController',
    templateUrl:'view/login.html'
  })
  .when('/main',{
    controller:'mainController',
    templateUrl:'view/lovedOnes.html'
  })
  .when('/content',{
    controller:'contentController',
    templateUrl:'view/medList.html'
  })
  .when('/register',{
    controller:'registrationController',
    templateUrl: 'view/registration.html'
  })
  .otherwise({ redirectTo: '/login' });

  $locationProvider.hashPrefix('');

});

app.directive("flipper", function() {
  return {
    restrict: "E",
    template: "<div class='flipper' ng-transclude ng-class='{ flipped: flipped }'></div>",
    transclude: true,
    scope: {
      flipped: "="
    }
  };
});

app.directive("front", function() {
  return {
    restrict: "E",
    template: "<div class='front tile' ng-transclude></div>",
    transclude: true
  };
});

app.directive("back", function() {
  return {
    restrict: "E",
    template: "<div class='back tile' ng-transclude></div>",
    transclude: true
  }
});
