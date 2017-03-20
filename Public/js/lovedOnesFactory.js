var app = angular.module("medMod");


app.factory("dataFactory", function($http) {
  var lovedones = [];

  return {
    getLovedOneInfo: getLovedOneInfo,
    updateLovedOnes: updateLovedOnes,
    addPerson: addPerson,
    removePerson: removePerson,
    alterPerson:alterPerson
  }

//sending GET request from /lovedones url
  function getLovedOneInfo(userid) {
    console.log("loFactory.getLOInfo", userid);
    var promise = $http({
      method: 'GET',
      url: '/lovedones/' + userid,
      params: {
        userid: userid
      }
    }).then(function successfulCallback(response) {
      console.log(response);
      lovedones = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

//return the information from GET request
  function updateLovedOnes() {
    return lovedones;
  }

  function addPerson(object) {
    var promise = $http({
      method: 'POST',
      url: '/lovedones-add',
      data: {
        name: object.name,
        weight: object.weight,
        age: object.age
      }
    }).then(function successfulCallback(response) {
      lovedones = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  function removePerson(personid){
    var promise = $http({
      method: 'DELETE',
      url:'/lovedones-delete/'+ personid
    }).then(function successfulCallback(response){
      lovedones = response.data;
    }, function(error){
      console.log(error);
    });
    return promise;
    }

//initiates the PUT request to the server
  function alterPerson(newObject, personid){
    var promise = $http({
      method: 'PUT',
      url:'/lovedones-edit/'+ personid,
      data: newObject
    }).then(function successfulCallback(response){
      lovedones = response.data;
    }, function(error){
      console.log(error);
    });
    return promise;
  }

});
