var app = angular.module("medMod");

app.factory("medFactory", function($http){
  var medicine = [];
  var newRx = 0;

  return {
    getMedListInfo: getMedListInfo,
    updateMedList: updateMedList,
    addMedicine: addMedicine,
    deleteMedicine: deleteMedicine,
    updateMedicine: updateMedicine,
    findRx: findRx,
    updateRxNumber: updateRxNumber,
    sendRxArray: sendRxArray
  }

  function getMedListInfo() {
    var promise = $http({
      method: 'GET',
      url:'/meds'
    }).then(function successfulCallback(response){
      // console.log(response);
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
      // console.log(response);
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
      // console.log(response);
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
      // console.log(response);
      medicine = response.data;
    }, function(error){
      console.log("error");
    });
    return promise;
  }



  function findRx(medName){
    var promise = $http({
      method: 'GET',
      url: 'https://rxnav.nlm.nih.gov/REST/rxcui.json?name=' + medName
    }).then(function successfulCallback(response) {
      var updateMed = {};
      updateMed.name = medName;
      updateMed.rxnumber = response.data.idGroup.rxnormId[0];
      // updateRxNumber(updateMed);
      newRx = Number(response.data.idGroup.rxnormId[0]);
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  function updateRxNumber(updateMed) {
    var promise = $http({
      method: 'PUT',
      url:'/rx-add/',
      data: {
        name: updateMed.name,
        rxnumber: updateMed.rxnumber
      }
    }).then(function successfulCallback(response){
      // console.log(response);
      medicine = response.data;
    }, function(error){
      console.log("error");
    });
    return promise;
  }

  function sendRxArray(medList){
    findDrugInteraction(setMasterList(medList));
  }

  function setMasterList(medList){
    var rxList = [];
    rxList.push(newRx);
    console.log(rxList);
    for(var i = 0; i< medList.length; i++){
      rxList.push(medList[i].rxnumber);
    }
    console.log(rxList);
    var list = rxList.join("+");
    console.log(list);
    return list;

  }

  function findDrugInteraction(list){
    var promise = $http({
      method: 'GET',
      url:'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=' + list
    }).then(function successfulCallback(response){
      console.log(response);
    }, function(error){
      console.log("error");
    });
    return promise;
  }

  function updateMedList(){
    console.log("updateMedList run");
    return medicine;
  }

  function getNewRx() {
    return newRx;
  }

});
