var app = angular.module("medMod");

app.factory("medFactory", function($http){
  var medicine = [];

  return {
    getMedListInfo: getMedListInfo,
    updateMedList: updateMedList
  }

  function getMedListInfo() {
    var promise = $http({
      method: 'GET',
      url:'/meds'
    }).then(function successfulCallback(response){
      console.log(response);
      medicine = response.data;
    }, function(error){
      console.log("error");
    });
    return promise;
  }

  function updateMedList(){
    return medicine;
  }

});
