let myChart = echarts.init(document.getElementById("main"));
let option = {
    title:{text:"Company"},
    legend:{
        data:['日K','MA5','MA10','MA20','MA30']
    },
    tooltip:{
        trigger:'axis',
        padding:15,
    },
    grid:[{
        left:'10%',
        right:'8%',
        height:'50%'
    },{
        left:'10%',
        right:'8%',
        top:'60%',
        height:'16%'
    }],//坐标系
    xAxis:[{
        type:'category',
        data:[],
        boundaryGap:false,
        axisLine:{onZero:false},
        splitLine:{show:false},
        min:'dataMin',
        max:'dataMax'
    },{
        type:'category',
        gridIndex:1,
        data:[],
        axisLine:{onZero:false},
    }],
    yAxis:[{
        scale:true,
        splitArea:{
            show:true
        }
    },{
        scale: true,
        gridIndex: 1,
        axisLabel:{show:false},
        axisLine:{show:false},
        axisTick:{show:false},
        splitLine:{show:false}
    }],
    series:[{
        name:'日K',
        type:'candlestick',
        data:[],
        itemStyle:{
            normal:{
                color0:'#0CF49B'
            }
        }
    },{
        name:"MA5",
        type:'line',
        smooth:true,
        data:[],
        lineStyle:{
            normal:{opacity:0.5}
        }
    },{
        name:"MA10",
        type:'line',
        smooth:true,
        data:[],
        lineStyle:{
            normal:{opacity:0.5}
        }
    },{
        name:"MA20",
        type:'line',
        smooth:true,
        data:[],
        lineStyle:{
            normal:{opacity:0.5}
        }
    },{
        name:"MA30",
        type:'line',
        smooth:true,
        data:[],
        lineStyle:{
            normal:{opacity:0.5}
        }
    },{
        name:'volume',
        type:'bar',
        data:[],
        xAxisIndex:1,
        yAxisIndex:1,
    }],
    dataZoom:[{
        type:"inside",
        xAxisIndex:[0,1], //同时控制二个Axis
        start:0,
        end:100
    }]
};
myChart.setOption(option);

function init(company, dayNum) {    //多少天
    let xhr = new XMLHttpRequest();
    xhr.open('get','data/'+company+'.json',true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
            if ((xhr.status >= 200&&xhr.status<=300)||xhr.status==304){
                let data = JSON.parse(xhr.responseText);
                //todo 处理一下数据单个公司的
                if (dayNum == data.length){clearInterval(autoUpdate)}   //当没有新数据，停止更新
                let resultData = splitData(data, dayNum);

                myChart.setOption({
                    title:{text:"Company "+resultData.name},
                    xAxis:[{data:resultData.Date,},{data:resultData.Date,gridIndex:1}],
                    series:[{
                        name:'日K',
                        data:resultData.value,
                    },{
                        name:"MA5",
                        data:calculateMA(5,resultData),
                    },{
                        name:"MA10",
                        data:calculateMA(10,resultData),
                    },{
                        name:"MA20",
                        data:calculateMA(20,resultData),
                    },{
                        name:"MA30",
                        data:calculateMA(30,resultData),
                    },{
                        name:'volume',
                        data:resultData.volume,
                        xAxisIndex:1,
                        yAxisIndex:1,
                    }]
                });
            }
        }
    };
}
let day = 30;   //显示30天
init("A", day);
let autoUpdate = setInterval(function () {
    day++;
    init('A', day);
},200);

function splitData(data, dayNum) {
    let Date = [],      //时间
        value = [],     //价格
        volume = [],    //成交量
        pattern = /(^\d{4})(\d{2})/,
        name = null,
        tempDate = null;
    name = data[0].Ticker;
    for(let i=0;i<data.length;i++){
        if (i==dayNum){break};   //超过天数break
        tempDate = data[i].Date.toString().replace(pattern, '$1-$2-');

        Date.push(tempDate);
        value.push([ data[i].Open, data[i].Close, data[i].Low, data[i].High]);
        volume.push(data[i].Volume);
    }
    return {
        Date:Date,
        value:value,
        volume:volume,
        name:name
    }
}

function calculateMA(dayCount, data) {
    let result = [];
    for(let i=0,len=data.value.length;i<len;i++){
        if (i<dayCount){
            result.push("-");
            continue;
        }
        let sum =0;
        for (let j=0;j<dayCount;j++){
            sum += data.value[i-j][1];
        }
        result.push(+(sum/dayCount).toFixed(3));
    }
    return result;
}
