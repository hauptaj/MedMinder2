var app = angular.module("medMod");

app.factory("medFactory", function($http){
  var medicine = [];

  return {
    getMedListInfo: getMedListInfo,
    updateMedList: updateMedList,
    addMedicine: addMedicine,
    deleteMedicine: deleteMedicine,
    updateMedicine: updateMedicine
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

  function addMedicine(med) {
    var promise = $http({
      method: 'POST',
      url:'/meds-add',
      data: {
        name: med.name,
        dosage: med.dosage,
        time: med.time
      }
    }).then(function successfulCallback(response){
      console.log(response);
      medicine = response.data;
    }, function(error){
      console.log("error");
    });
    return promise;
  }

  function deleteMedicine(medId) {
    var promise = $http({
      method: 'DELETE',
      url:'/meds-delete/' + medId
    }).then(function successfulCallback(response){
      console.log(response);
      medicine = response.data;
    }, function(error){
      console.log("error");
    });
    return promise;
  }


  function updateMedicine(newMed,medId) {
    var promise = $http({
      method: 'PUT',
      url:'/meds-update/'+ medId,
      data: {
        name: newMed.name,
        dosage: newMed.dosage,
        time: newMed.time
      }
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
