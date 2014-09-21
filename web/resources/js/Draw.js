/*
This file manipulates the HTML5 canvas based on information provided by a JSON
file.

@Author Nawaz Gayoom
@version 0.1 - 11/09/2014: Created.
 */

//$(document).ready(function () {
    function drawca(){
    var canvas = document.getElementById("simArea");
    var ctx = canvas.getContext("2d");
    var values = [[0,0,1,0,0],[0,1,0,0,1],[0,0,0,1,0],[1,0,0,1,1],[0,0,0,0,1]];
    var posX = 0;
    var posY = 0;
    var cellSize = 40;
//    var columns = 4;
//    var rows = 4;
    var width = cellSize * 5;
    var height = cellSize * 5;
    canvas.width = width;
    canvas.height = height;
    
    for(var i = 0; i < values.length; i++){
        var row = values[i];
        for(var j = 0; j < row.length; j++){
            if(row[j] === 1){
                ctx.fillStyle = 'black';
            } else {
                ctx.fillStyle = 'white';
            }
            
            ctx.fillRect(posX, posY, cellSize, cellSize);
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 1;
            ctx.strokeRect(posX, posY, cellSize, cellSize);
            posX = posX + cellSize;
        }
        posX = 0;
        posY = posY + cellSize;
    }
    
//    for(var i = 0; i < columns; i++){
//        for(var j = 0; j < rows; j++){
//            ctx.fillRect(posX,posY,cellWidth,cellHeight);
//            ctx.strokeStyle = "black";
//            ctx.stroke();
//            if(posX === 80 && posY === 40){
//                ctx.fillStyle = 'blue';
//                ctx.fill();
//            }
//            posX = posX + cellWidth;
//            
//        }
//        posX = 0;
//        posY = posY + cellHeight;
//        
//    }
    
    }
//});
