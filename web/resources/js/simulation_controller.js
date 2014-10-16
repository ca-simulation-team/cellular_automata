

var simCtrl = angular.module('ca_app.simController', [])

simCtrl.controller('simulationControl', function($scope) {
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
    $scope.simObject.gridSize = 30;
    $scope.simObject.currentGrid = [];
    $scope.simObject.states = [];
    $scope.simObject.rules = [];
    $scope.possibleNeighbors = [1, 2, 3, 4, 5, 6, 7, 8];
    var cnvLstSet = false;
    var defaultStateRemoved = false;
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
        var rule = {currentState: $scope.ruleCurrentState.stateIndex, neighborState: $scope.ruleNeighborState.stateIndex, neighborCount: $scope.ruleNeighborCount, equalityModifier: $scope.ruleEqualityModifier, nextState: $scope.ruleNextState.stateIndex};
        $scope.simObject.rules.push(rule);
    }

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
        var col = (Math.floor(mousePos.x / cellSize));



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

//        drawCanvasFromSimobject();



    }
// we need to fix this
//    function drawCanvasFromSimobject() {
//        var posX = 0;
//        var posY = 0;
//        var canvas = $('#drawArea')[0];
//        var ctx = canvas.getContext("2d");
//
//        for (var col = 0; col < $scope.simObject.gridSize; i++) {
//            
//            for (var row = 0; row < $scope.simObject.gridSize; j++) {
//                
//                
//                var stateN = $scope.simObject.currentGrid[row][col];
//                alert($scope.simObject.states);
//                var state = $scope.simObject.states[stateN];
//                
//                var hex = state.stateColor;
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
    //   }

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
        var hex = $scope.stateSelected.stateColor; //!fix this!!!
        function drawca() {
            for (var i = 0; i < values.length; i++) {
                var row = values[i];
                for (var j = 0; j < row.length; j++) {

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
});

