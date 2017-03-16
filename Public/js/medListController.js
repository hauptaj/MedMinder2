var app = angular.module("medMod");
app.controller("contentController", function($scope, medFactory, $timeout, $location) {

    medFactory.getMedListInfo().then(function() {
        $scope.medicine = medFactory.updateMedList();
    });

    $scope.addMed = function(med) {
        medFactory.findRx(med.name).then(function() {
            med.rxnumber = medFactory.getNewRx();
            medFactory.addMedicine(med).then(function() {
                $scope.medicine = medFactory.updateMedList();

                $scope.med.name = '';
                $scope.med.dosage = '';
                $scope.med.time = '';

                $scope.message = 'WARNING: The drug you are about to add may have some potential interactions with other drugs on your list. Always check with your doctor before starting a new medication.';
                $scope.showMessage = true;
                $timeout(function() {
                    $scope.showMessage = false;
                }, 10000);

            });

        });
    }

    $scope.deleteMed = function(medId) {
        medFactory.deleteMedicine(medId).then(function() {
            $scope.medicine = medFactory.updateMedList();
        });
    }

    $scope.updateMed = function(newMed, medId) {
        medFactory.findRx(newMed.name).then(function() {
            newMed.rxnumber = medFactory.getNewRx();
            medFactory.updateMedicine(newMed, medId).then(function() {
                $scope.medicine = medFactory.updateMedList();
            });
        });
    }

    $scope.update = function() {
        $scope.medicine = medFactory.updateMedList();
    }

});
