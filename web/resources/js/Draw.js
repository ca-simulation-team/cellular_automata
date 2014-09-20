/*
This file manipulates the HTML5 canvas based on information provided by a JSON
file.

@Author Nawaz Gayoom
@version 0.1 - 11/09/2014: Created.
 */

$(document).ready(function () {
    
    var canvas = document.getElementById("simArea");
    var ctx = canvas.getContext("2d");
    
    var posX = 0;
    var posY = 0;
    var cellWidth = 20;
    var cellHeight = 20;
    var columns = 20;
    var rows = 20;
    var width = cellWidth * columns;
    var height = cellHeight * rows;
    canvas.width = width;
    canvas.height = height;
    for(var i = 0; i < columns; i++){
        for(var j = 0; j < rows; j++){
            ctx.rect(posX,posY,cellWidth,cellHeight);
            ctx.strokeStyle = "black";
            ctx.stroke();
            if(posX === 40 && posY=== 40){
                ctx.fillStyle = 'black';
                ctx.fill();
            }
            posX = posX + cellWidth;
        }
        posX = 0;
        posY = posY + cellHeight;
    }
    
    
});
