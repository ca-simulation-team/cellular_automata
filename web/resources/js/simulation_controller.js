

var simCtrl = angular.module('ca_app.simController', [])

simCtrl.controller('simulationControl', function($scope, $http) {
    $scope.simloaded = false;
    $scope.playEnabled = false;
    $scope.pauseEnabled = false;
    $scope.stopEnabled = false;
    $scope.stepEnabled = false;
    $scope.delay = 0;
    $scope.saveFilename = "default_simulation";
    $scope.inputFile = [];
    $scope.stateName = "";
    $scope.stateColor = "";
    $scope.isDynamic = true;
    $scope.rulePattern = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
    $scope.neighborhood = [[1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]];
    $scope.ruleCurrentState = 0;
    $scope.ruleNeighborState = 0;
    $scope.ruleNeighborCount = 0;
    $scope.ruleEqualityModifier = 0;
    $scope.ruleNextState = 0;
    $scope.ruleProbability = 100;
    $scope.rulesChanged = false;

    $scope.stateSelected = {};
    $scope.simObject = new Object();
    $scope.simObject.gridSize = 10;
    $scope.simObject.currentGrid = [];
    $scope.simObject.states = [];
    $scope.simObject.rules = [];
    $scope.simObject.cellSize = 15;
    $scope.simObject.steps = 0;
    $scope.simObject.timePassed = 0;
    $scope.sample = null;
    $scope.possibleNeighbors = [1, 2, 3, 4, 5, 6, 7, 8];
    var cnvLstSet = false;
    var defaultStateRemoved = false;
    var continous = true;
    var keepRunning = false;
    //for mouse events
    var mousePressed;
    //setupPieChart();
    var generationStatesCount = [];
    var JsonObj = null;

    $scope.createNewSim = function() {
        $scope.resetToDefault();
        $scope.simLoaded = true;

        //initiate grid
        for (i = 0; i < $scope.simObject.gridSize; i++) {
            var row = [];
            for (j = 0; j < $scope.simObject.gridSize; j++) {
                row.push(0);
            }
            $scope.simObject.currentGrid.push(row);
        }
        var defaultState = {stateIndex: 0, stateName: "Default", stateColor: "#FFFFFF", stateWeight: 1};
        $scope.simObject.states.push(defaultState);
        $scope.stateSelected = defaultState;
        runSim($scope.simObject.currentGrid);
        $scope.seedThis();
        $scope.playEnabled = true;
        $scope.stepEnabled = true;
        $scope.rulesChanged = true;
        setNeighborhoodCanvasLst();
    }
    
    $scope.addState = function() {
        if (defaultStateRemoved === false) {
            $scope.simObject.states.pop();
            defaultStateRemoved = true;
            var stateIndex = $scope.simObject.states.length;
            var state = {stateIndex: stateIndex, stateName: $scope.stateName, stateColor: $scope.stateColor, stateWeight: 1};
            $scope.simObject.states.push(state);
            $scope.stateSelected = state;
            runSim($scope.simObject.currentGrid);
        } else {
            var stateIndex = $scope.simObject.states.length;
            var state = {stateIndex: stateIndex, stateName: $scope.stateName, stateColor: $scope.stateColor, stateWeight: 1};
            $scope.simObject.states.push(state);
        }


    }

    $scope.addRule = function() {
        
        var rule = {currentState: $scope.ruleCurrentState.stateIndex, 
                    neighborState: $scope.ruleNeighborState.stateIndex, 
                    noOfNeighbors: $scope.ruleNeighborCount, 
                    equalityModifier: $scope.ruleEqualityModifier, 
                    nextState: $scope.ruleNextState.stateIndex, 
                    probability: $scope.ruleProbability, 
                    isDynamic: $scope.isDynamic,
                    rulePattern: [[$scope.rulePattern[0][0],$scope.rulePattern[0][1],$scope.rulePattern[0][2]],
                                 [$scope.rulePattern[1][0],$scope.rulePattern[1][1],$scope.rulePattern[1][2]],
                                 [$scope.rulePattern[2][0],$scope.rulePattern[2][1],$scope.rulePattern[2][2]]],
                    neighborhood: [[$scope.neighborhood[0][0],$scope.neighborhood[0][1],$scope.neighborhood[0][2]],
                                 [$scope.neighborhood[1][0],$scope.neighborhood[1][1],$scope.neighborhood[1][2]],
                                 [$scope.neighborhood[2][0],$scope.neighborhood[2][1],$scope.neighborhood[2][2]]],
                    collapsed: true};
        $scope.simObject.rules.push(rule);
        $scope.rulesChanged = true;
        //createDataForPieChart();
    }

    $scope.removeRule = function(index) {
        $scope.simObject.rules.splice(index, 1);
        $scope.rulesChanged = true;
    }


    $scope.controlSim = function(state) {
        if (state === 'playing') {
            $scope.playEnabled = false;
            $scope.pauseEnabled = true;
            $scope.stopEnabled = true;
            $scope.stepEnabled = false;
            timer.play(false);
            continous = true;
            keepRunning = true;
            runRequest();
        } else if (state === 'paused') {
            $scope.playEnabled = true;
            $scope.pauseEnabled = false;
            $scope.stopEnabled = true;
            $scope.stepEnabled = true;
            timer.pause();
            continous = true;
            keepRunning = false;
        } else if (state === 'stopped') {
            $scope.playEnabled = true;
            $scope.pauseEnabled = false;
            $scope.stopEnabled = false;
            $scope.stepEnabled = true;
            timer.stop();
            $scope.seconds = 0;
            $scope.minutes = 0;
            continous = false;
            keepRunning = false;
            $scope.simObject.steps = 0;
            runRequest();
        } else if (state === 'stepped') {
            continous = true;
            keepRunning = false;
            runRequest();
        }
    };

    $scope.setStateSelected = function(stateIndex, stateName, stateColor) {
        var state = {stateIndex: stateIndex, stateName: stateName, stateColor: stateColor, stateWeight: 1};
        $scope.stateSelected = state;
    }

    function setCanvasLst() {


        var canvas = $('#drawArea')[0];
        var context = canvas.getContext('2d');

        canvas.addEventListener('mousedown', function(evt) {
            if ($scope.playEnabled) {
                mousePressed = true;
                drawOnCanvas(evt);
            }
        }, false);

        canvas.addEventListener('mousemove', function(evt) {
            if ($scope.playEnabled) {
                if (mousePressed)
                    drawOnCanvas(evt);
            }
        }, false);

        canvas.addEventListener('mouseup', function(evt) {
            if ($scope.playEnabled) {
                mousePressed = false;
            }
        }, false);

        canvas.addEventListener('mouseleave', function(evt) {
            if ($scope.playEnabled) {
                mousePressed = false;
            }
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

        var posX = (Math.floor(mousePos.x / $scope.simObject.cellSize)) * $scope.simObject.cellSize;
        var posY = (Math.floor(mousePos.y / $scope.simObject.cellSize)) * $scope.simObject.cellSize;
        var row = (Math.floor(mousePos.y / $scope.simObject.cellSize));
        var col = (Math.floor(mousePos.x / $scope.simObject.cellSize));



        var ctx = canvas.getContext("2d");
        var p = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
        var hex = $scope.stateSelected.stateColor;
        var brush = $scope.brushsize;
        ctx.fillStyle = hex;

        $scope.simObject.currentGrid[row][col] = $scope.stateSelected.stateIndex;

        ctx.fillRect(posX, posY, $scope.simObject.cellSize, $scope.simObject.cellSize);



        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeRect(posX, posY, $scope.simObject.cellSize, $scope.simObject.cellSize);

    }

//    function countNumberOfStates(stateCode) {
//
//        var stateCount = 0;
//        for (var xx = 0; xx < $scope.simObject.gridSize; xx++) {
//
//            for (var col = 0; col < $scope.simObject.gridSize; col++) {
//                if ($scope.simObject.currentGrid[xx][col] == stateCode)
//                    stateCount++;
//            }
//
//        }
//
//        return  stateCount;
//
//    }


    $scope.drawFromCurrent = function() {
        runSim($scope.simObject.currentGrid);
    }


    $scope.updateGridSize = function() {

        if ($scope.simObject.gridSize > $scope.simObject.currentGrid.length) {
            var tempArray = [];
            for (var i = 0; i < $scope.simObject.gridSize; i++) {
                var row = [];
                for (var j = 0; j < $scope.simObject.gridSize; j++) {
                    row.push(0);
                }
                tempArray.push(row);
            }
            for (var x = 0; x < $scope.simObject.currentGrid; x++) {
                for (var y = 0; y < $scope.simObject.currentGrid; y++) {
                    tempArray[x][y] = $scope.simObject.currentGrid[x][y];
                }
            }

            $scope.simObject.currentGrid = tempArray;

        } else if ($scope.simObject.gridSize < $scope.simObject.currentGrid.length) {
            var amountToSubtract = $scope.simObject.currentGrid.length - $scope.simObject.gridSize;

            for (var i = 0; i < amountToSubtract; i++) {
                $scope.simObject.currentGrid.pop();
            }
        }
        runSim($scope.simObject.currentGrid);
        $scope.seedThis();
    }

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

        var width = values.length * $scope.simObject.cellSize;
        var height = values.length * $scope.simObject.cellSize;
        var isRunning = true;
        canvas.width = width;
        canvas.height = height;
        function drawca() {
            for (var i = 0; i < values.length; i++) {
                var row = values[i];
                for (var j = 0; j < row.length; j++) {
                    var hex = $scope.simObject.states[$scope.simObject.currentGrid[i][j]].stateColor;
                    ctx.fillStyle = hex;

                    ctx.fillRect(posX, posY, $scope.simObject.cellSize, $scope.simObject.cellSize);
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(posX, posY, $scope.simObject.cellSize, $scope.simObject.cellSize);
                    posX = posX + $scope.simObject.cellSize;
                }
                posX = 0;
                posY = posY + $scope.simObject.cellSize;
            }
        }
        drawca();
    }

    function setNeighborhoodCanvasLst() {
        var nbCellSize = 10;
        var posX = 0;
        var posY = 0;
        var canvas = $('#staticRuleDraw')[0];
        var ctx = canvas.getContext('2d');

        for (var i = 0; i < 3; i++) {

            for (var j = 0; j < 3; j++) {
                var hex = "white";
                ctx.fillStyle = hex;

                ctx.fillRect(posX, posY, nbCellSize, nbCellSize);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.strokeRect(posX, posY, nbCellSize, nbCellSize);
                posX = posX + nbCellSize;
            }
            posX = 0;
            posY = posY + nbCellSize;
        }

        canvas.addEventListener('mousedown', function(evt) {
            if ($scope.playEnabled) {
                mousePressed = true;
                drawOnNeighborhoodCanvas(evt);
            }
        }, false);

        canvas.addEventListener('mousemove', function(evt) {
            if ($scope.playEnabled) {
                if (mousePressed)
                    drawOnNeighborhoodCanvas(evt);
            }
        }, false);

        canvas.addEventListener('mouseup', function(evt) {
            if ($scope.playEnabled) {
                mousePressed = false;
            }
        }, false);

        canvas.addEventListener('mouseleave', function(evt) {
            if ($scope.playEnabled) {
                mousePressed = false;
            }
        }, false);



    }


    function drawOnNeighborhoodCanvas(evt) {

        var nbCellSize = 10;
        var canvas = $('#staticRuleDraw')[0];
        var currentState;
        var mousePos = getMousePos(canvas, evt);

        var posX = (Math.floor(mousePos.x / nbCellSize)) * nbCellSize;
        var posY = (Math.floor(mousePos.y / nbCellSize)) * nbCellSize;
        var row = (Math.floor(mousePos.y / nbCellSize));
        var col = (Math.floor(mousePos.x / nbCellSize));
        var ctx = canvas.getContext("2d");
        var hex = "white";




        hex = $scope.stateSelected.stateColor;
        currentState = 0;
        $scope.rulePattern[row][col] = $scope.stateSelected.stateIndex;


        ctx.fillStyle = hex;
        ctx.fillRect(posX, posY, nbCellSize, nbCellSize);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeRect(posX, posY, nbCellSize, nbCellSize);
        
    }

//    function gatherGenerationsStats() {
//
//        var genStatesStats = {};
//        for (var counter = 0; counter < statesLength; counter++)
//        {
//            var pieDat = {};
//            pieDat.value = countNumberOfStates($scope.simObject.states[counter].stateIndex);
//            pieDat.color = $scope.simObject.states[counter].stateColor;
//            pieDat.label = $scope.simObject.states[counter].stateName;
//
//            genStatesStats.push(pieDat);
//
//        }
//        generationStatesCount.push(genStatesStats);
//    }

//    $scope.createDataForPieChart = function() {
//
//        var data = [
//        ];
//
//
//        var statesLength = $scope.simObject.states.length;
//        for (var counter = 0; counter < statesLength; counter++)
//        {
//            var pieDat = {};
//            pieDat.value = countNumberOfStates($scope.simObject.states[counter].stateIndex);
//            pieDat.color = $scope.simObject.states[counter].stateColor;
//            pieDat.label = $scope.simObject.states[counter].stateName;
//
//            data.push(pieDat);
//
//        }
//        drawPieChart(data);
//
//        
//    }




    var runRequest = function() {
        var req = new Object();
        req.currentGrid = $scope.simObject.currentGrid;
        req.rules = $scope.simObject.rules;
        req.rulesChanged = $scope.rulesChanged;
        if (continous === true) {
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
        }).success(function(data) {
            
            $scope.simObject.currentGrid = data["currentGrid"];
            $scope.rulesChanged = false;
            $scope.simObject.steps++;
            if(data["time"] == null){
                alert('this is where it goes wrong');
            }
            $scope.simObject.timePassed = data["time"];
            
            runSim($scope.simObject.currentGrid);
//            gatherGenerationsStats();
            if (keepRunning === true) {
                setTimeout(function() {
                    runRequest();
                }, $scope.delay);
            }

        }).
                error(function(data, status, headers, config) {
//                    alert(status);

                });
    };


    $scope.setSelectedRule = function(index) {
        if ($scope.simObject.rules[index].collapsed === true) {
            $scope.simObject.rules[index].collapsed = false;
        } else if ($scope.simObject.rules[index].collapsed === false) {
            $scope.simObject.rules[index].collapsed = true;
        }
    };

    $scope.saveCurrent = function(){
        var fullName = $scope.saveFilename + '.bel';
        var toSave = angular.toJson($scope.simObject);
        var dl = document.createElement('a');
        dl.setAttribute('href', 'data:application/json;charset=utf-8,' + toSave);
        dl.setAttribute('download', fullName);
        dl.click();
       
    };
    
    

    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
        f = files[0];
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) { 
                JsonObj = e.target.result;

            };
        })(f);

        // Read in JSON as a data URL.
        reader.readAsText(f, 'UTF-8');
    }
    
    $scope.setFromFile = function(){
        $scope.createNewSim();
        $scope.simObject = angular.fromJson(JsonObj);
        $scope.seedThis();
        $scope.drawFromCurrent();
    }
    
    $scope.setFileListener = function(){
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
    }
    
    $scope.randomizeGrid = function(){
        var randomArray = [];
        for(var i = 0; i < $scope.simObject.states.length; i++){
            for(var j = 0; j < $scope.simObject.states[i].stateWeight; j++){
                randomArray.push($scope.simObject.states[i].stateIndex);
            }
        }
        
        for(var k = 0; k < $scope.simObject.currentGrid.length; k++){
            for(var l = 0; l < $scope.simObject.currentGrid.length; l++){
                var index = Math.floor(Math.random() * (randomArray.length - 0)) + 0;
                var stateTo = randomArray[index];
                $scope.simObject.currentGrid[k][l] = stateTo;
            }
        }
        $scope.drawFromCurrent();
    }
    
   $scope.seedThis = function(){
       var req = new Object();
       req.seedThis = true;
       req.currentGrid = $scope.simObject.currentGrid;
       var jsonReq = angular.toJson(req);
       $http({
            url: 'simController',
            method: "POST",
            data: jsonReq
        }).success(function(data) {
            //do nothing
        }).
                error(function(data, status, headers, config) {
                    alert(status);

                });
   }
   
   $scope.setAllToSelected = function(){
       for(var i = 0; i < $scope.simObject.currentGrid.length; i++){
           for(var j = 0; j < $scope.simObject.currentGrid.length; j++){
               $scope.simObject.currentGrid[i][j] = $scope.stateSelected.stateIndex;
           }
       }
       
       $scope.drawFromCurrent();
   }
   
   $scope.resetToDefault = function(){
       $scope.simloaded = false;
       $scope.playEnabled = false;
       $scope.pauseEnabled = false;
       $scope.stopEnabled = false;
       $scope.stepEnabled = false;
       $scope.delay = 0;
       $scope.inputFile = [];
       $scope.stateName = "";
       $scope.stateColor = "";
       $scope.isDynamic = true;
       $scope.rulePattern = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
       $scope.neighborhood = [[1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]];
       $scope.ruleCurrentState = 0;
       $scope.ruleNeighborState = 0;
       $scope.ruleNeighborCount = 0;
       $scope.ruleEqualityModifier = 0;
       $scope.ruleNextState = 0;
       $scope.ruleProbability = 100;
       $scope.rulesChanged = false;
       $scope.minutes = 0;
       $scope.seconds = 0;
       $scope.stateSelected = {};
       $scope.simObject = new Object();
       $scope.simObject.gridSize = 10;
       $scope.simObject.currentGrid = [];
       $scope.simObject.states = [];
       $scope.simObject.rules = [];
       $scope.simObject.cellSize = 15;
       $scope.simObject.steps = 0;
       $scope.simObject.timePassed = 0;
       $scope.resetTime = false;
       $scope.continueTime = true;
       cnvLstSet = false;
       defaultStateRemoved = false;
       continous = true;
       keepRunning = false;
   }
   
   $scope.reloadPage = function(){
       location.reload();
   }
   
   var golString = {"gridSize":30,"currentGrid":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,1,0,0,1,0],[0,0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],[0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0],[0,1,0,0,0,0,1,1,0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,0,1,0,0,1,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],[0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,1,0],[0,0,1,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0],[1,0,1,0,0,1,0,0,0,1,1,1,0,0,0,0,0,1,1,0,1,1,0,0,1,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],[0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,1,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0],[0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,1],[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0],[0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,1],[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0],[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],[0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"states":[{"stateIndex":0,"stateName":"dead","stateColor":"#c0c0c0","stateWeight":5},{"stateIndex":1,"stateName":"alive","stateColor":"#00ff00","stateWeight":1}],"rules":[{"currentState":1,"neighborState":1,"noOfNeighbors":3,"equalityModifier":"1","nextState":0,"probability":100,"isDynamic":true,"rulePattern":[[0,0,0],[0,0,0],[0,0,0]],"neighborhood":[[1,1,1],[1,1,1],[1,1,1]],"collapsed":true},{"currentState":1,"neighborState":1,"noOfNeighbors":4,"equalityModifier":"2","nextState":0,"probability":100,"isDynamic":true,"rulePattern":[[0,0,0],[0,0,0],[0,0,0]],"neighborhood":[[1,1,1],[1,1,1],[1,1,1]],"collapsed":true},{"currentState":0,"neighborState":1,"noOfNeighbors":3,"equalityModifier":"0","nextState":1,"probability":100,"isDynamic":true,"rulePattern":[[0,0,0],[0,0,0],[0,0,0]],"neighborhood":[[1,1,1],[1,1,1],[1,1,1]],"collapsed":true}],"cellSize":15,"steps":0,"timePassed":0};
   var infString = {"gridSize":40,"currentGrid":[[0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,0,2,0,0,0,0,0,0,0,2,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0],[2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,2,0,0,0,0,0,2,0,2,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,2,0,0,0,2,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,2,0,0,0,0,1,0,0,2,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,0],[0,2,0,0,1,0,0,0,0,2,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0],[0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1,0,0,2,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],[0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,2,0,0],[0,0,0,0,2,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,1,0,0,0],[0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0],[0,1,0,0,0,2,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,2,1,2,0,0,0,0,0,0,0,2,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,2,0,0,0],[0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,2,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,2,0,0,0,0,0],[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0],[0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0],[0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0]],"states":[{"stateIndex":0,"stateName":"healthy","stateColor":"#00ff00","stateWeight":30},{"stateIndex":1,"stateName":"infected","stateColor":"#808040","stateWeight":1},{"stateIndex":2,"stateName":"dead","stateColor":"#c0c0c0","stateWeight":2},{"stateIndex":3,"stateName":"zombie","stateColor":"#ff0000","stateWeight":0}],"rules":[{"currentState":0,"neighborState":1,"noOfNeighbors":1,"equalityModifier":"2","nextState":1,"probability":100,"isDynamic":true,"rulePattern":[[0,0,0],[0,0,0],[0,0,0]],"neighborhood":[[1,1,1],[1,1,1],[1,1,1]],"collapsed":true},{"currentState":1,"neighborState":1,"noOfNeighbors":4,"equalityModifier":"2","nextState":2,"probability":100,"isDynamic":true,"rulePattern":[[0,0,0],[0,0,0],[0,0,0]],"neighborhood":[[1,1,1],[1,1,1],[1,1,1]],"collapsed":true},{"currentState":2,"neighborState":1,"noOfNeighbors":2,"equalityModifier":"2","nextState":3,"probability":50,"isDynamic":true,"rulePattern":[[0,0,0],[0,0,0],[0,0,0]],"neighborhood":[[1,1,1],[1,1,1],[1,1,1]],"collapsed":true},{"currentState":3,"neighborState":2,"noOfNeighbors":3,"equalityModifier":"0","nextState":0,"probability":100,"isDynamic":true,"rulePattern":[[0,0,0],[0,0,0],[0,0,0]],"neighborhood":[[1,1,1],[1,1,1],[1,1,1]],"collapsed":true}],"cellSize":15,"steps":1,"timePassed":0};
   $scope.loadExample = function(){
       if($scope.sample === 'gol'){
           $scope.createNewSim();
           $scope.simObject = angular.fromJson(golString);
           $scope.seedThis();
           $scope.drawFromCurrent();
       } else if($scope.sample ===  'inf'){
           $scope.simObject = angular.fromJson(infString);
           $scope.createNewSim();
           $scope.seedThis();
           $scope.drawFromCurrent();
       }
   }
   
   $scope.minutes = 0;
   $scope.seconds = 0;
   $scope.increaseTime = function(){
       if($scope.seconds < 60){
           $scope.seconds++;
       } else {
           $scope.minutes++;
       }
   };
   var timer = $.timer(function() {
                $scope.increaseTime();
        });
   timer.set({ time : 1000, autostart : false });
});

