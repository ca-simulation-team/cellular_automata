var simCtrl = angular.module('ca_app.simController', [])

simCtrl.controller('simulationControl', function($scope){
    $scope.simloaded = false;
    
    $scope.stateName = "";
    $scope.stateColor = "";
    
    $scope.ruleCurrentState = 0;
    $scope.ruleNeighborState = 0;
    $scope.ruleNeighborCount = 0;
    $scope.ruleEqualityModifier = 0;
    $scope.ruleNextState = 0;
    
    $scope.stateSelected = {};
    $scope.simObject = new Object();
    $scope.simObject.gridSize = 60;
    $scope.simObject.currentGrid = [];
    $scope.simObject.states = [];
    $scope.simObject.rules = [];
    $scope.possibleNeighbors = [1,2,3,4,5,6,7,8];
    $scope.createNewSim = function(){
        $scope.simLoaded = true;
        
        //initiate grid
        for(i = 0; i < $scope.simObject.gridSize; i++){
            row = [];
            for(j = 0; j < $scope.simObject.gridSize; j++){
                row.push(0);
            }
            $scope.simObject.currentGrid.push(row);
        }
        
        //draw grid
    }
    
    $scope.addState = function(){
        var stateIndex = $scope.simObject.states.length + 1;
        var state = {stateIndex: stateIndex, stateName : $scope.stateName, stateColor : $scope.stateColor};
        $scope.simObject.states.push(state);
    }
    
    $scope.addRule = function(){
       var rule = {currentState : $scope.ruleCurrentState.stateIndex, neighborState : $scope.ruleNeighborState.stateIndex, neighborCount : $scope.ruleNeighborCount, equalityModifier : $scope.ruleEqualityModifier, nextState : $scope.ruleNextState.stateIndex};
       $scope.simObject.rules.push(rule); 
    }
    
    $scope.setStateSelected = function(){
        $scope.stateSelected = true;
    }
});

