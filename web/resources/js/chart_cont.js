var pieChart;

function  setupPieChart(data) {
    
    var pieOptions = {
        
        segmentShowStroke: true,
        animateScale: true,
        animationSteps: 50,
        animationEasing : "easeOutBounce",
        segmentStrokeColor : "#ececec"
    };
    

    
    var canvas = document.getElementById("myChart").getContext("2d");
    
    pieChart = new Chart(canvas).Pie(data, pieOptions);
    


}
function drawPieChart(data) {
    pieChart.destroy();
    setupPieChart(data);
    
}

