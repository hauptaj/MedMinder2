var app = angular.module("medMod");

app.factory("sharedFactory", function() {
  var storedPerson = {};

  return {
    takeObject: takeObject,
    passObject: passObject
  }

  function takeObject(personObject) {
    storedPerson = personObject;
    console.log(storedPerson);
  }

  function passObject() {
    console.log(storedPerson);
    return storedPerson;
  }

});
