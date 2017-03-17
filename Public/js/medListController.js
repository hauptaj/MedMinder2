var app = angular.module("medMod");
app.controller("contentController", function($scope, medFactory, $timeout, $location, sharedFactory) {

    $scope.personsPage = sharedFactory.passObject();

        //initiates GET request then runs the updateLovedOnes function (in factory2) that pulls the data from factory1
    medFactory.getMedListInfo($scope.personsPage.personid).then(function() {
      console.log($scope.personsPage.personid);
        $scope.medicine = medFactory.updateMedList();
    });

    $scope.addMed = function(med, personsid) {
        medFactory.findRx(med.name).then(function() {
            med.rxnumber = medFactory.getNewRx();
            medFactory.addMedicine(med, personsid).then(function() {
              console.log(personsid);
                $scope.medicine = medFactory.updateMedList();

                $scope.message = 'The drug you are about to add may have some potential interactions with other drugs on your list. Always check with your doctor before starting a new medication.';
                $scope.showMessage = true;
                $timeout(function() {
                    $scope.showMessage = false;
                }, 10000);

            });

          $scope.med.name = "";
          $scope.med.dosage = "";
          $scope.med.time = "";
        });
    }

    $scope.deleteMed = function(medId, personid) {
      console.log(personid);
        medFactory.deleteMedicine(medId, personid).then(function() {
            $scope.medicine = medFactory.updateMedList();
        });
    }

    $scope.updateMed = function(newMed, medId, personid) {
        medFactory.findRx(newMed.name).then(function() {
            newMed.rxnumber = medFactory.getNewRx();
            medFactory.updateMedicine(newMed, medId, personid).then(function() {
                $scope.medicine = medFactory.updateMedList();
            });
        });
    }

    $scope.update = function() {
        $scope.medicine = medFactory.updateMedList();
    }

});
