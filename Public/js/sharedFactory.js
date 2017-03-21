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

  function takeObject(personObject) {
    storedPerson = personObject;
  }

  function passObject() {
    return storedPerson;
  }

  function takeUser(userid) {
    storedUser = userid;
  }

  function passUser() {
    return storedUser;
  }

});
