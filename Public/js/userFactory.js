var app = angular.module("medMod");

app.factory("userFactory", function($http) {
  var users = [];

  return {
    addUser: addUser,
    updateUser: updateUser

  }

function updateUser() {
  return users;
}

function addUser(object) {
  var promise = $http({
    method: 'POST',
    url: '/users-add',
    data: {
      firstname: object.firstname,
      lastname: object.lastname,
      email: object.email,
      password: object.password,
      username: object.username
    }
  }).then(function successfullCallback(response) {
    users = response.data;
  }, function(error) {
    console.log(error);
  });
    return promise;
}





});
