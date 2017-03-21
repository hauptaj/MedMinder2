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
    console.log(storedPerson);
  }

  function passObject() {
    console.log(storedPerson);
    return storedPerson;
  }


  function takeUser(userid) {
    storedUser = userid;
    console.log("takeUser", storedUser);
  }

 // get the user id out of this factory (what was stored earlier)
  function passUser() {
    console.log("passUser", storedUser);
    return storedUser;
  }

});
