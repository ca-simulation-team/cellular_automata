


function runSim(array){
    var canvas = $('#drawArea')[0];
    var ctx = canvas.getContext("2d");
    var values = array;
    //var values = [[0,0,0,0,0],[0,0,0,1,1],[0,1,0,1,0],[0,0,0,0,0],[0,0,0,0,0]];
    var posX = 0;
    var posY = 0;
    var cellSize = 15;
    var width = values.length * cellSize;
    var height = values.length * cellSize;
    var isRunning = true;
    canvas.width = width;
    canvas.height = height;
    function drawca(){
	for(var i = 0; i < values.length; i++){
	    var row = values[i];
	    for(var j = 0; j < row.length; j++){
		if(row[j] === 1){
		    ctx.fillStyle = 'black';
		} else {
		    ctx.fillStyle = 'white';
		}
    
		ctx.fillRect(posX, posY, cellSize, cellSize);
		ctx.strokeStyle = 'green';
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




function callJava(run){
    
    var ujson = new Object();
    ujson.currentGrid = [[0,0,0,0,0],[0,0,0,1,1],[0,1,0,1,0],[0,0,0,0,0],[0,0,0,0,0]];
    ujson.isRunning = false;
    ujson.steps = 0;
    ujson.time = 0.0;
    var isRunning = run;

   
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
            if(isRunning){
                callJava(true);
            }
	},
	error: function(){
	    alert("error error error");
	}
    });
    
    
}