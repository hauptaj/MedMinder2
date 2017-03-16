var app = angular.module("medMod");

//This factory communicates with the server concerning altering the medicine table
//and also accesses RxCui numbers through an API
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
    // updateRxNumber: updateRxNumber,
    // sendRxArray: sendRxArray,
    getNewRx: getNewRx
    }

  //Send a Get Request to Server to Query Table Information
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

  //Send a POST Request to Server to Add Med to Table
  function addMedicine(med) {
    var promise = $http({
      method: 'POST',
      url:'/meds-add',
      data: {
        name: med.name,
        dosage: med.dosage,
        time: med.time,
        rxnumber: med.rxnumber
      }
    }).then(function successfulCallback(response){
      // console.log(response);

      medicine = response.data;

    }, function(error){
      console.log("error");
    });
    return promise;
    return "alert";
  }

  //Send a DELETE Request to Server to Delete Med from Table
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

  //Send a PUT Request to Server to Update Medicine on Tabl
  function updateMedicine(newMed,medId) {
    var promise = $http({
      method: 'PUT',
      url:'/meds-update/'+ medId,
      data: {
        name: newMed.name,
        dosage: newMed.dosage,
        time: newMed.time,
        rxnumber: newMed.rxnumber
      }
    }).then(function successfulCallback(response){
      // console.log(response);
      medicine = response.data;
    }, function(error){
      console.log("error");
    });
    return promise;
  }


  //Send a Get Request to RxNorm Api that return RxCui number for Medicine
  function findRx(medName){
    var promise = $http({
      method: 'GET',
      url: 'https://rxnav.nlm.nih.gov/REST/rxcui.json?name=' + medName
    }).then(function successfulCallback(response) {
      newRx = Number(response.data.idGroup.rxnormId[0]);
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  //Returns medicine list to controller.
  function updateMedList(){
    console.log("updateMedList run");
    return medicine;
  }

  //Returns RxCui number to controller to be added to Medicine Object
  function getNewRx() {
    return newRx;
  }


  // //Stretch Goal Below
  // function sendRxArray(medList){
  //   findDrugInteraction(setMasterList(medList));
  // }
  //
  // function setMasterList(medList){
  //   var rxList = [];
  //   rxList.push(newRx);
  //   console.log(rxList);
  //   for (var i = 0; i< medList.length; i++){
  //     rxList.push(medList[i].rxnumber);
  //   }
  //   console.log(rxList);
  //   var list = rxList.join("+");
  //   console.log(list);
  //   return list;
  // }
  //
  // function findDrugInteraction(list){
  //   var promise = $http({
  //     method: 'GET',
  //     url:'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=' + list
  //   }).then(function successfulCallback(response){
  //     console.log(response);
  //     console.log(response.data.fullInteractionTypeGroup[0].fullInteractionType[0].interactionPair[0].severity);
  //     var interactionLoop = response.data.fullInteractionTypeGroup[0].fullInteractionType;
  //
  //     for (var i = 0; i < interactionLoop.length; i++) {
  //       if (interactionLoop[i].interactionPair[0].severity === "N/A") {
  //         console.log("No issue");
  //       } else if (interactionLoop[i].interactionPair[0].severity = "High") {
  //         console.log("Issue!");
  //       }
  //     }
  //
  //   }, function(error){
  //     console.log("error");
  //   });
  //   return promise;
  // }

});
