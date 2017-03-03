/**
 * Created by Mengman on 2017/3/2.
 */
var myChart = echarts.init(document.getElementById("main"));
var source = {
    text:'Sources:World Bank; Census Bureau;EIU',  //下方的资料出处
    textStyle:{
        fontSize:18,
        color:'rgb(90,93,97)',
        fontWeight:"normal",
    },
    bottom:20,
    left:50
};

var option = {
    title:[{
        text:"What's my credit score?",        //主标题
        textStyle:{
            fontWeight:"bold",
            fontSize:24,
        },
        subtext:"Puerto Rico, %decrease on a tear earlier",     //副标题
        subtextStyle:{
            fontSize:22,
            color:'rgb(65,67,69)'
        },
        top:40,     //标题位置
        left:50
    },
        source
    ],
    grid:{
        top:180,    //图表位置
        left:50,
        bottom:90
    },
    backgroundColor:"rgb(214,227,235)",
    legend:{
        data:['Population',"GDP"],
        top:130,
        left:50
    },
    xAxis:{
        axisLine:{
            onZero:false    //不对0
        },
        axisTick:{
            inside:true,    //x轴标记向上
            alignWithLabel:true,    //标记对应文本中间
            length:9        //轴标拉长
        },
        axisLabel:{
            textStyle:{
                fontSize:20 //x轴文字大小
            }
        },
        data:['2006','07','08','09','10','11','12','13','14','15'],
        type:"category",
    },
    yAxis:{
        position:"right",
        type:"value",
        inverse:true,   //反向
        axisLine:{
            show:false          //不显示
        },
        splitLine:{
            lineStyle:{     //横向分隔线颜色
                color:['rgb(240,80,76)','rgb(255,255,255)','rgb(255,255,255)','rgb(255,255,255)','transparent'],
                width:3
            }
        },
        axisLabel:{
            textStyle:{
                fontSize:20     //y轴数字大小
            }
        },
        max:4,
        min:0,
        axisTick:{
            show:false
        }
    },
    series:[
        {
            name:'Population',
            type:'bar',
            data:[0.3,0.4,0.4,0.35,0.32,1.1,1.2,1.1,1.5,1.7],
            barGap:'0',     //bar间隔
            barWidth:16     //bar宽度
    },
        {
            name:'GDP',
            type:'bar',
            data:[0.8,3.3,1.8,2.2,2.5,1.9,2.7,0.5,0.9,1.0],
            barWidth:16
        }
    ],
    color:['rgb(51,116,138)','rgb(51,182,227)']
};

myChart.setOption(option);