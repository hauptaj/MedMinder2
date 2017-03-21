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
    var promise = $http({
      method: 'GET',
      url: '/lovedones/' + userid,
      params: {
        userid: userid
      }
    }).then(function successfulCallback(response) {
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
        age: object.age,
        userid: object.userid
      }
    }).then(function successfulCallback(response) {
      lovedones = response.data;
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  function removePerson(personid, userId){
    var promise = $http({
      method: 'DELETE',
      url:'/lovedones-delete/'+ personid + '/' + userId
    }).then(function successfulCallback(response){
      lovedones = response.data;
    }, function(error){
      console.log(error);
    });
    return promise;
    }

//initiates the PUT request to the server
  function alterPerson(newObject, personid, userId){
    var promise = $http({
      method: 'PUT',
      url:'/lovedones-edit/'+ personid + '/' + userId,
      data: newObject
    }).then(function successfulCallback(response){
      lovedones = response.data;
    }, function(error){
      console.log(error);
    });
    return promise;
  }

});
