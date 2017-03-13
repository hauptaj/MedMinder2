var app = angular.module("medMod");


app.factory("dataFactory", function($http) {
  var lovedones = [];

  return {
    getLovedOneInfo: getLovedOneInfo,
    updateLovedOnes: updateLovedOnes
  }

  function getLovedOneInfo() {
    var promise = $http({
      method: 'GET',
      url: '/lovedones'
    }).then(function successfulCallback(response) {
      console.log(response.data);
      lovedones = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  function updateLovedOnes() {
    return lovedones;
  }


});
