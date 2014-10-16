var simCtrl = angular.module('ca_app.simController', [])

simCtrl.controller('simulationControl', function($scope, draw_service){
    $scope.simloaded = false;
    $scope.stateName = "";
    $scope.stateColor = "";
    $scope.ruleCurrentState = 0;
    $scope.ruleNeighborState = 0;
    $scope.ruleNeighborCount = 0;
    $scope.ruleEqualityModifier = 0;
    $scope.ruleNextState = 0;
    $scope.possibleNeighbors = [1,2,3,4,5,6,7,8];
    var defaultStateRemoved = false;
    
    $scope.createNewSim = function(){
        $scope.simLoaded = true;
        
        //initiate grid
        for(i = 0; i < draw_service.simObject.gridSize; i++){
            row = [];
            for(j = 0; j < draw_service.simObject.gridSize; j++){
                row.push(0);
            }
            draw_service.simObject.currentGrid.push(row);
        }
        var defaultState = {stateIndex : 0, stateName : "Default", stateColor : "#FFFFFF"};
        draw_service.simObject.states.push(defaultState);
        draw_service.stateSelected = defaultState;
        draw_service.drawCurrentCAGrid;
    }
    
    $scope.addState = function(){
        if(defaultStateRemoved === false){
            draw_service.simObject.states.pop();
            defaultStateRemoved = true;
            var stateIndex = draw_service.simObject.states.length;
            var state = {stateIndex: stateIndex, stateName : $scope.stateName, stateColor : $scope.stateColor};
            draw_service.simObject.states.push(state);
            draw_service.stateSelected = state;
            draw_service.drawCurrentCAGrid;
        } else {
            var stateIndex = draw_service.simObject.states.length;
            var state = {stateIndex: stateIndex, stateName : $scope.stateName, stateColor : $scope.stateColor};
            draw_service.simObject.states.push(state);
        }
    }
    
    $scope.addRule = function(){
       var rule = {currentState : $scope.ruleCurrentState.stateIndex, neighborState : $scope.ruleNeighborState.stateIndex, neighborCount : $scope.ruleNeighborCount, equalityModifier : $scope.ruleEqualityModifier, nextState : $scope.ruleNextState.stateIndex};
       draw_service.simObject.rules.push(rule); 
    }
});

simCtrl.service('draw_service', function(){
    //data
    var simObject = new Object();
    simObject.gridSize = 30;
    simObject.currentGrid = [];
    simObject.states = [];
    simObject.rules = [];
    var cellSize = 20;
    var isMouseListening = false;
    
    var stateSelected = {};
    
    var setMouseListener = function(){
        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
        var canvas = $('#drawArea')[0];
        var context = canvas.getContext('2d');
        canvas.addEventListener('mousedown', function(evt) {
           canvas.addEventListener('mousemove',drawOnCanvas(evt), false);
        }, false);

        function drawOnCanvas(evt) {

            var mousePos = getMousePos(canvas, evt);

            var posX = (Math.floor(mousePos.x / cellSize)) * cellSize;
            var posY = (Math.floor(mousePos.y / cellSize)) * cellSize;
            var row = (Math.floor(mousePos.x / cellSize));
            var col = (Math.floor(mousePos.x / cellSize));



            var ctx = canvas.getContext("2d");
            var p = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
            var hex = stateSelected.stateColor;

            ctx.fillStyle = hex;
            simObject.currentGrid[row][col] = stateSelected.stateIndex;

            ctx.fillRect(posX, posY, cellSize, cellSize);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.strokeRect(posX, posY, cellSize, cellSize);


        }
    }
    
    var drawCurrentCAGrid = function(){
        if (!isMouseListening) {
            setMouseListener();
            isMouseListening = true;
        }
        var canvas = $('#drawArea')[0];
        var ctx = canvas.getContext("2d");
        var values = simObject.currentGrid;
        var posX = 0;
        var posY = 0;

        var width = values.length * cellSize;
        var height = values.length * cellSize;
        canvas.width = width;
        canvas.height = height;
        var hex = stateSelected.stateColor;
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

    var getGrid = function(){
        angular.toJson(simObject.currentGrid);
    }
});

simCtrl.service('draw_service', function(){
    //data
var simObject = new Object();
simObject.gridSize = 30;
simObject.currentGrid = [];
simObject.states = [];
simObject.rules = [];
var cellSize = 20;
var isMouseListening = false;

var stateSelected = {};

var setMouseListener = function() {
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    var canvas = $('#drawArea')[0];
    var context = canvas.getContext('2d');
    canvas.addEventListener('mousedown', function(evt) {
        canvas.addEventListener('mousemove', drawOnCanvas(evt), false);
    }, false);

    function drawOnCanvas(evt) {

        var mousePos = getMousePos(canvas, evt);

        var posX = (Math.floor(mousePos.x / cellSize)) * cellSize;
        var posY = (Math.floor(mousePos.y / cellSize)) * cellSize;
        var row = (Math.floor(mousePos.x / cellSize));
        var col = (Math.floor(mousePos.x / cellSize));



        var ctx = canvas.getContext("2d");
        var p = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
        var hex = stateSelected.stateColor;

        ctx.fillStyle = hex;
        simObject.currentGrid[row][col] = stateSelected.stateIndex;

        ctx.fillRect(posX, posY, cellSize, cellSize);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeRect(posX, posY, cellSize, cellSize);


    }
}

var drawCurrentCAGrid = function() {
    if (!isMouseListening) {
        setMouseListener();
        isMouseListening = true;
    }
    var canvas = $('#drawArea')[0];
    var ctx = canvas.getContext("2d");
    var values = simObject.currentGrid;
    var posX = 0;
    var posY = 0;

    var width = values.length * cellSize;
    var height = values.length * cellSize;
    canvas.width = width;
    canvas.height = height;
    var hex = stateSelected.stateColor;
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

var getGrid = function() {
    angular.toJson(simObject.currentGrid);
}
})