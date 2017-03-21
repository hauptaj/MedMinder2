var app = angular.module("medMod");

app.factory("userFactory", function($http) {
  var users = [];
  //Quotation versus array

  return {
    addUser: addUser,
    updateUser: updateUser,
    getUserInfo: getUserInfo

  }

function updateUser() {
  console.log('this function is running');
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

function getUserInfo(user){
  console.log(user);
  var promise = $http({
    method: 'GET',
    url: '/login/'+ user.username + '/' + user.password,
    params: {
      username: user.username,
      password: user.password
    }

 }).then(function successCallback(response) {
    console.log(response.data[0].userid);
    users = response.data[0].userid;
  }, function(error) {
    console.log(error);
  });
  return promise;
}





});
