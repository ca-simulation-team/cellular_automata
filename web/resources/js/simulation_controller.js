angular.module('ca_app.simController', [])
.controller('simulationControl', function($scope){
    $scope.simloaded = false;
    $scope.gridWidth = 100;
    $scope.gridHeight = 100;
    
    $scope.createNewSim = function(){
        $scope.simLoaded = true;
    }
});

