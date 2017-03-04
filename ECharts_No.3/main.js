let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4){
        if ((xhr.status >=200 && xhr.status < 300)||(xhr.status == 304)){
            let chinaJson = JSON.parse(xhr.responseText);
            echarts.registerMap('china', chinaJson);

            let myChart = echarts.init(document.getElementById('main'));
            let option = {
                series:[{
                    type:'map',
                    map:'china'
                }]
            };
            myChart.setOption(option);
        }else {
            alert("失败");
        }
    }
};
xhr.open('get', 'map/china.json', true);
xhr.send(null);
