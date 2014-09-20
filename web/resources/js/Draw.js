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
    var cellWidth = 40;
    var cellHeight = 40;
    var columns = 4;
    var rows = 4;
    var width = cellWidth * columns;
    var height = cellHeight * rows;
    canvas.width = width;
    canvas.height = height;
    for(var i = 0; i < columns; i++){
        for(var j = 0; j < rows; j++){
            ctx.rect(posX,posY,cellWidth,cellHeight);
            ctx.strokeStyle = "black";
            ctx.stroke();
//            if(posX === 80 && posY === 40){
//                ctx.fillStyle = 'blue';
//                ctx.fill();
//            }
            posX = posX + cellWidth;
            ctx.font = '12pt Calibri';
            ctx.fillStyle = 'green';
            ctx.fillText(posX, posX, posY);
        }
        posX = 0;
        posY = posY + cellHeight;
        ctx.font = '12pt Calibri';
        ctx.fillStyle = 'green';
        ctx.fillText(posY, posX + 10, posY + 10);
    }
    
    
});
