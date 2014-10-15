var simStatus = "stop";
var simLoaded = false;
var runOnce = false;
var callThread;
var delay = 0;
var cellSize = 15;
var cnvLstSet = false;
var canvasChanged = false;
var ujson = new Object();

//ujson.currentGrid = [[0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1]];

ujson.neighbourhoodGrid = [[0,0,0,0,0],
                           [0,1,1,1,0],
                           [0,1,0,1,0],
                           [0,1,1,1,0],
                           [0,0,0,0,0]];

ujson.currentGrid = [[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

ujson.steps = 0;
ujson.time = 0.0;
ujson.isRunning = true;
ujson.gridUpdated = false;
function setSpeed(value) {
    delay = value * 100;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

//function setCanvasLst() {
//
//    function getMousePos(canvas, evt) {
//        var rect = canvas.getBoundingClientRect();
//        return {
//            x: evt.clientX - rect.left,
//            y: evt.clientY - rect.top
//        };
//    }
//    
//    var canvas = $('#drawArea')[0];
//    
//    var context = canvas.getContext('2d');
//
//
//    //not sure how to do that! - Vadim
//    canvas.addEventListener('mousedown', function(evt) {
//
//
//        canvas.addEventListener('mousemove',drawOnCanvas(evt), false);
//    }, false);
//
//
//
//
//    
//    
//    function drawOnCanvas(evt) {
//
//        var mousePos = getMousePos(canvas, evt);
//
//        var posX = (Math.floor(mousePos.x / cellSize)) * cellSize;
//        var posY = (Math.floor(mousePos.y / cellSize)) * cellSize;
//        var row = (Math.floor(mousePos.x / cellSize));
//        var col = (Math.floor(mousePos.x / cellSize));
//
//
//
//        var ctx = canvas.getContext("2d");
//        var p = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
//        var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
//        if (hex === "#000000") {
//            ctx.fillStyle = 'white';
//            ujson.currentGrid[row][col] = 0;
//        }
//        else {
//            ctx.fillStyle = 'black';
//            ujson.currentGrid[row][col] = 1;
//        }
//        ctx.fillRect(posX, posY, cellSize, cellSize);
//        ctx.strokeStyle = 'black';
//        ctx.lineWidth = 1;
//        ctx.strokeRect(posX, posY, cellSize, cellSize);
//        ujson.gridUpdated = true;
//
//
//    }
//
//
//}

function createNeighbourhood()
{
    if((simStatus === 'stop'))
    {
            document.getElementById("drawArea").style.display = "none";
            document.getElementById("neighbourhoodButton").style.display = "block";
            document.getElementById("drawNeighbourhood").style.display = "block";
            document.getElementById("playBtn").disabled = true;
            document.getElementById("pauseBtn").disabled = true;
            document.getElementById("stopBtn").disabled = true;
            document.getElementById("resumeBtn").disabled = true;
            drawNeighbourhoodGrid();  
            intitialiseNeighbourhoodDrawing();
            alert("Click a square to enabe/disable it form the neighbourhood, black = included white = not included");
        }
        else
        {
            alert("You can not edit a neighbourhood mid-way through a simulation, please start a new simulation then edit the neighbourhood first.");
        }
}

function createdNeighbourhood()
{
            document.getElementById("drawArea").style.display = "block";
            document.getElementById("neighbourhoodButton").style.display = "none";
            document.getElementById("drawNeighbourhood").style.display = "none";
            document.getElementById("playBtn").disabled = false;
            document.getElementById("pauseBtn").disabled = false;
            document.getElementById("stopBtn").disabled = false;
            document.getElementById("resumeBtn").disabled = false;
            alert("Your changes have been applied");
}

CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};

function drawNeighbourhoodGrid()
{
    var canvas = $('#drawNeighbourhood')[0];
    var ctx = canvas.getContext("2d");
    var ctx2 = canvas.getContext("2d");
    
    ctx.clear();
    
    for(var x = 0; x < 5; x++)
    {
        for(var y = 0; y < 5; y++)
        {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(x*40, y*40, 40,40);
            if(ujson.neighbourhoodGrid[x][y] === 1)
            { 
                ctx2.fillStyle = 'black';
                ctx2.fillRect(x*40, y*40, 40,40);
            }
        }
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(81,81,38,38);
    ctx.font = "10px Arial";
    ctx.strokeText("Cell",92,105);
}

function drawInitialGrid()
{
    var canvas = $('#drawArea')[0];
    var ctx = canvas.getContext("2d");
    
    for(var x = 0; x < 30; x++)
    {
        for(var y = 0; y < 30; y++)
        {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(x*14, y*14, 14,14);
        }
    }
}

function intitialiseNeighbourhoodDrawing()
{
    var canvas = document.getElementById("drawNeighbourhood");
    canvas.addEventListener("mousedown", doMouseDown, false);
}

function doMouseDown(event)
{    
    var canvas_x = event.pageX - 358;
    var canvas_y = event.pageY - 129;
    
    var newX = 0;
    var newY = 0;
    newX = canvas_x % 40;
    newY = canvas_y % 40;
    var x = (canvas_x - newX) / 40;
    var y = (canvas_y - newY) / 40;    
    
    if(ujson.neighbourhoodGrid[x][y] === 1 || (x === 2 && y === 2))
    {
        ujson.neighbourhoodGrid[x][y] = 0;
    }
    else
    {
        ujson.neighbourhoodGrid[x][y] = 1;
    }
        
    drawNeighbourhoodGrid();
    
}

//function runSim(array) {
//    if (!cnvLstSet) {
//        setCanvasLst();
//        cnvLstSet = true;
//    }
//    var canvas = $('#drawArea')[0];
//    var ctx = canvas.getContext("2d");
//    var values = array;
//    //var values = [[0,0,0,0,0],[0,0,0,1,1],[0,1,0,1,0],[0,0,0,0,0],[0,0,0,0,0]];
//    var posX = 0;
//    var posY = 0;
//
//    var width = values.length * cellSize;
//    var height = values.length * cellSize;
//    var isRunning = true;
//    canvas.width = width;
//    canvas.height = height;
//
//    function drawca() {
//        for (var i = 0; i < values.length; i++) {
//            var row = values[i];
//            for (var j = 0; j < row.length; j++) {
//                if (row[j] === 1) {
//                    ctx.fillStyle = 'black';
//                } else {
//                    ctx.fillStyle = 'white';
//                }
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
//    }
//    drawca();
//}



function controlSimulation(status) {
    
    if (status === 'play') 
    {
        simStatus = 'playing';
        runOnce = false;
        document.getElementById("resumeBtn").disabled = true;
        callJava();
    }
    if (status === 'pause')
    {
        simStatus = 'paused';
        document.getElementById("resumeBtn").disabled = false;
    }
    if (status === 'stop') 
    {
        ujson.isRunning = false;
        simStatus = 'stopped';
        document.getElementById("resumeBtn").disabled = false;
    }
    if (status === 'step') 
    {
        simStatus = 'playing';
        runOnce = true;
        callJava();
    }

}

function callJava() {
//part1
    //var ujson = new Object();

    ujson.steps = 0;
    ujson.time = 0.0;
    simLoaded = true;
    if (simStatus === 'playing') {
        $.ajax({
            url: 'MasonRequest',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(ujson),
            contentType: 'application/json',
            success: function(data) {
                ujson.currentGrid = data["currentGrid"];
                ujson.isRunning = data["isRunning"];
                ujson.steps = data["steps"];
                ujson.time = data["time"];
                ujson.gridUpdated = data["gridUpdated"];
                runSim(ujson.currentGrid);
                document.getElementById("steps").innerHTML = ujson.steps;
                document.getElementById("time").innerHTML = ujson.time;
                if (runOnce === false) {
                    setTimeout(function() {
                        callJava();
                    }, delay);
//part2
                }
            },
            error: function() {
                alert("error occured");
            }
        });

    }
//    if (simStatus === 'stopped')
//    {
//
//        ujson.currentGrid = [[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
//        $.ajax({
//            url: 'MasonRequest',
//            type: 'POST',
//            dataType: 'json',
//            data: JSON.stringify(ujson),
//            contentType: 'application/json',
//            success: function(data) {
//                ujson.currentGrid = data["currentGrid"];
//                ujson.isRunning = data["isRunning"];
//                ujson.steps = data["steps"];
//                ujson.time = data["time"];
//                runSim(ujson.currentGrid);
//                document.getElementById("steps").innerHTML = ujson.steps;
//                document.getElementById("time").innerHTML = ujson.time;
//
//
//            },
//            error: function() {
//                alert("error occured");
//            }
//        });
//    }
    }
    
