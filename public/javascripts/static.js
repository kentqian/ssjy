$(document).ready(function () {
	$(document).ready(function () {
    var pieData = [{
                value : 150,
                color : "#F38630",
                label : '续报人数',
            },
                  {
                value : 150,
                color : "#F34353",
                label : '未续报人数',
            }];

    var myPie = new Chart(document.getElementById("myChart").getContext("2d")).Pie(pieData);
});
});
