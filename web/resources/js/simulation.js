var simStatus = "stop";
var simLoaded = false;
var runOnce = false;
var callThread;
var delay = 0;
var cellSize = 15;
var cnvLstSet = false;
var ujson = new Object();
ujson.currentGrid = [[0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1]];
ujson.steps = 0;
ujson.time = 0.0;


function setSpeed(value) {
    delay = value * 100;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function setCanvasLst() {

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    var canvas = $('#drawArea')[0];
    var context = canvas.getContext('2d');

    canvas.addEventListener('click', function(evt) {


        var mousePos = getMousePos(canvas, evt);
        
        var posX = (Math.floor(mousePos.x / cellSize)) * cellSize;
        var posY = (Math.floor(mousePos.y / cellSize)) * cellSize;
        var row = (Math.floor(mousePos.x / cellSize));
        var col = (Math.floor(mousePos.x / cellSize));



        var ctx = canvas.getContext("2d");
        var p = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
        var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        if (hex === "#000000") {
            ctx.fillStyle = 'white';
            ujson.currentGrid[row][col]=1;
        }
        else {
            ctx.fillStyle = 'black';
            ujson.currentGrid[row][col]=0;
        }
        ctx.fillRect(posX, posY, cellSize, cellSize);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.strokeRect(posX, posY, cellSize, cellSize);
        
    }, false);
}



function runSim(array) {
    if (!cnvLstSet) {
        setCanvasLst();
        cnvLstSet = true;
    }
    var canvas = $('#drawArea')[0];
    var ctx = canvas.getContext("2d");
    var values = array;
    //var values = [[0,0,0,0,0],[0,0,0,1,1],[0,1,0,1,0],[0,0,0,0,0],[0,0,0,0,0]];
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
                if (row[j] === 1) {
                    ctx.fillStyle = 'black';
                } else {
                    ctx.fillStyle = 'white';
                }

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



function controlSimulation(status) {
    if ((status === 'play')) {
        simStatus = 'playing';
        runOnce = false;
        callJava();
    }

    if (status === 'pause')
        simStatus = 'paused';
    if (status === 'stop') {
        callJava();
        simStatus = 'stopped';
    }

    if (status === 'step') {
        simStatus = 'playing';
        runOnce = true;
        callJava();
    }

}


function callJava() {
//part1
    //var ujson = new Object();
    ujson.currentGrid = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
    ujson.steps = 0;
    ujson.time = 0.0;
    simLoaded = true;
    if(simStatus === 'playing') {
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
            runSim(ujson.currentGrid);
            document.getElementById("steps").innerHTML = ujson.steps;
            document.getElementById("time").innerHTML = ujson.time;
            if(runOnce === false){
                setTimeout(function(){
                callJava();
                },delay); 
//part2
            }
        },
        error: function(){
            alert("error occured");
        }
    });

    }



}