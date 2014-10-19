var pieChart;
    var pieData = [
        {
            value: data,
            color: "#878BB6"
        }


    ];
function  setupPieChart(data) {
    var pieOptions = {
        segmentShowStroke: false,
        animateScale: true
    };
    var pieData = [
        {
            value: data,
            color: "#878BB6"
        }


    ];
    var canvas = document.getElementById("myChart").getContext("2d");
    pieChart = new Chart(canvas).Pie(data, pieOptions);



}
function updatePieChart(data) {
    pieChart.removeData(0);
    
    pieChart.addData(data);

    
}
function reloadPieChart(){
    
    pieChart.update();
}
