/**
 * Created by Mengman on 2017/2/25.
 */
var myChart = echarts.init(document.getElementById("main"));

var option = {
    title:{
        text:'2000-2016中国GDP总量及增速'
    },
    tooltip:{trigger:'axis'},
    legend:{
        data:['GDP总量[十亿]','GDP增速']
    },
    toolbox:{
        feature:{
            dataView:{show:true},       //右上角的个小功能
            saveAsImage:{show:true}
        }
    },
    xAxis:[
        {
        type:'category',
        data:['2000','2001','2002','2003','2004','2005','2006',
            '2007','2008','2009','2010','2011','2012','2013','2014',
            '2015','2016']
    }
    ],
    yAxis:[
        {
            type:'value',
            name:'GDP总量',          //左边y轴的标识
            min:0,                  //y轴起点
            max:80000,              //y轴最大范围
            interval:10000,         //间隔
            axisLabel:{             //单位
                formatter:'{value} 十亿'
            }
        },
        {
            type:'value',
            name:'增速',
            min:0,
            max:16,
            interval:2,
            axisLabel:{
                formatter:'{value} %'
            }
        }
    ],
    series:[{
        name:'GDP总量[十亿]',
        type:'bar',
        data:['9977.63','11027.04','12100.20','13656.46','16071.44','18589.58',
            '21765.66','26801.94','31675.17','34562.92','40890.30','48412.35',
            '53412.30','58801.88','63646.27','67670.8','74412.7']
    },
            {
         name:'GDP增速',
         type:'line',
         yAxisIndex:1,          //对应右边的y轴
         data:['8.4','8.3','9.1','10.0','10.1','11.3','12.7','14.2','9.6','9.2',
             '10.6','9.5','7.7','7.7','7.3','6.9','6.7']
    }]
};

myChart.setOption(option);