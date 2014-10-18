

var simCtrl = angular.module('ca_app.simController', [])

simCtrl.controller('simulationControl', function($scope, $http) {
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
    $scope.simObject.gridSize = 20;
    $scope.simObject.currentGrid = [];
    $scope.simObject.states = [];
    $scope.simObject.rules = [];
    $scope.possibleNeighbors = [1, 2, 3, 4, 5, 6, 7, 8];
    var cnvLstSet = false;
    var cellSize = 25;
    var defaultStateRemoved = false;
    var continous = true;
    var keepRunning = false;
    //for mouse events
    var mousePressed;



    $scope.createNewSim = function() {
        $scope.simLoaded = true;

        //initiate grid
        for (i = 0; i < $scope.simObject.gridSize; i++) {
            row = [];
            for (j = 0; j < $scope.simObject.gridSize; j++) {
                row.push(0);
            }
            $scope.simObject.currentGrid.push(row);
        }
        var defaultState = {stateIndex: 0, stateName: "Default", stateColor: "#FFFFFF"};
        $scope.simObject.states.push(defaultState);
        $scope.stateSelected = defaultState;
        runSim($scope.simObject.currentGrid);
        $scope.setTestData();
    }

    $scope.addState = function() {
        if (defaultStateRemoved === false) {
            $scope.simObject.states.pop();
            defaultStateRemoved = true;
            var stateIndex = $scope.simObject.states.length;
            var state = {stateIndex: stateIndex, stateName: $scope.stateName, stateColor: $scope.stateColor};
            $scope.simObject.states.push(state);
            $scope.stateSelected = state;
            runSim($scope.simObject.currentGrid);
        } else {
            var stateIndex = $scope.simObject.states.length;
            var state = {stateIndex: stateIndex, stateName: $scope.stateName, stateColor: $scope.stateColor};
            $scope.simObject.states.push(state);
        }

    }

    $scope.addRule = function() {
        var rule = {currentState: $scope.ruleCurrentState.stateIndex, neighborState: $scope.ruleNeighborState.stateIndex, noOfNeighBors: $scope.ruleNeighborCount, equalityModifier: $scope.ruleEqualityModifier, nextState: $scope.ruleNextState.stateIndex};
        $scope.simObject.rules.push(rule);
    }

    $scope.controlSim = function(state){
        if(state === 'playing'){
            continous = true;
            keepRunning = true;
            runRequest();
        } else if(state === 'paused'){
            continous = false;
            keepRunning = false;
        } else if(state === 'stopped'){
            continous = false;
            keepRunning = false;
            runRequest();
        } else if(state === 'stepped'){
            continous = true;
            keepRunning = false;
            runRequest();
        }
    };
    
    $scope.setStateSelected = function() {
        $scope.stateSelected = true;
    }

    function setCanvasLst() {


        var canvas = $('#drawArea')[0];
        var context = canvas.getContext('2d');

        canvas.addEventListener('mousedown', function(evt) {
            mousePressed = true;
            drawOnCanvas(evt);
        }, false);

        canvas.addEventListener('mousemove', function(evt) {
            if (mousePressed)
                drawOnCanvas(evt);
        }, false);

        canvas.addEventListener('mouseup', function(evt) {
            mousePressed = false;
        }, false);

        canvas.addEventListener('mouseleave', function(evt) {
            mousePressed = false;
        }, false);


    }
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    function drawOnCanvas(evt) {
        var canvas = $('#drawArea')[0];

        var mousePos = getMousePos(canvas, evt);

        var posX = (Math.floor(mousePos.x / cellSize)) * cellSize;
        var posY = (Math.floor(mousePos.y / cellSize)) * cellSize;
        var row = (Math.floor(mousePos.x / cellSize));
        var col = (Math.floor(mousePos.y / cellSize));



        var ctx = canvas.getContext("2d");
        var p = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
        var hex = $scope.stateSelected.stateColor;

        ctx.fillStyle = hex;
        if ($scope.simObject.currentGrid[row] !== undefined)
        $scope.simObject.currentGrid[row][col] = $scope.stateSelected.stateIndex;

        ctx.fillRect(posX, posY, cellSize, cellSize);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeRect(posX, posY, cellSize, cellSize);
         
        //drawCanvasFromSimobject();

    }
     
    
//    function drawCanvasFromSimobject() {
//        var posX = 0;
//        var posY = 0;
//        var canvas = $('#drawArea')[0];
//        var ctx = canvas.getContext("2d");
//
//        for (var col = 0; col < $scope.simObject.gridSize; col++) {
//            
//            for (var row = 0; row < $scope.simObject.gridSize; row++) {
//                
//                
//                var hex = $scope.simObject.states[$scope.simObject.currentGrid[col][row]].stateColor;
//                
//                ctx.fillStyle = hex;
//
//                ctx.fillRect(posX, posY, cellSize, cellSize);
//                ctx.strokeStyle = 'black';
//                ctx.lineWidth = 1;
//                ctx.strokeRect(posX, posY, cellSize, cellSize);
//                posX = posX + cellSize;
//            }
//            posX = 0;
//            posY = posY + cellSize;
//        }
//       }

    function runSim(array) {
        if (!cnvLstSet) {
            setCanvasLst();
            cnvLstSet = true;
        }
        var canvas = $('#drawArea')[0];
        var ctx = canvas.getContext("2d");
        var values = array;
        var posX = 0;
        var posY = 0;

        var width = values.length * cellSize;
        var height = values.length * cellSize;
        var isRunning = true;
        canvas.width = width;
        canvas.height = height;
        function drawca() {
            for (var i = 0; i < values.length; i++) {
                var row = values[i];
                for (var j = 0; j < row.length; j++) {
                    var hex = $scope.simObject.states[$scope.simObject.currentGrid[i][j]].stateColor;
                    ctx.fillStyle = hex;

                    ctx.fillRect(posX, posY, cellSize, cellSize);
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(posX, posY, cellSize, cellSize);
                    posX = posX + cellSize;
                }
                posX = 0;
                posY = posY + cellSize;
            }
        }
        drawca();
    }
    
    
    var runRequest = function(){
        var req = new Object();
        req.currentGrid = $scope.simObject.currentGrid;
        req.rules = $scope.simObject.rules;
        if(continous === true){
            req.stop = false;
        } else {
            req.stop = true;
        }
        req.steps = 0;
        req.time = 0;
        var jsonReq = angular.toJson(req);

        $http({
                url: 'simController',
                method: "POST",
                data: jsonReq
}           ).success(function(data) {
                
                $scope.simObject.currentGrid = data["currentGrid"];
                runSim($scope.simObject.currentGrid);
            if(keepRunning === true){
                runRequest();
            }
            
        }).
        error(function(data, status, headers, config) {
            alert(status);
            
        });
    }
    
    $scope.setTestData = function(){
        var state1 = {stateIndex: 0, stateName: "dead", stateColor: "white"};
        $scope.simObject.states[0] = state1;
        var state2 = {stateIndex: 1, stateName: "alive", stateColor: "black"};
        $scope.simObject.states.push(state2);
        
        var rule1 = {currentState: 1, neighborState: 1, noOfNeighbors: 3, equalityModifier: 1, nextState: 0};
        $scope.simObject.rules.push(rule1);
        var rule2 = {currentState: 1, neighborState: 1, noOfNeighbors: 4, equalityModifier: 2, nextState: 0};
        $scope.simObject.rules.push(rule2);
        var rule3 = {currentState: 0, neighborState: 1, noOfNeighbors: 3, equalityModifier: 0, nextState: 1};
        $scope.simObject.rules.push(rule3);
    }
});

