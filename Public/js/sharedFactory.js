var app = angular.module("medMod");

app.factory("sharedFactory", function() {
  var storedPerson = {};
  var storedUser = "";

  return {
    takeObject: takeObject,
    passObject: passObject,
    passUser: passUser,
    takeUser: takeUser
  }
//take the patient details from the patient table
  function takeObject(personObject) {
    storedPerson = personObject;
  }

//pass the patient details to the medListController
  function passObject() {
    return storedPerson;
  }
//take the userid from the user table
  function takeUser(userid) {
    storedUser = userid;
  }
//pass the userid to the lovedOnesController
  function passUser() {
    return storedUser;
  }

});
