/**
 * Created by Mengman on 2017/3/6.
 */

let myChart = echarts.init(document.getElementById("main"));
let xhr = new XMLHttpRequest();
xhr.open('get', 'data/2.gexf', true);
xhr.send(null);
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
        if ((xhr.status >= 200&&xhr.status <=300)||xhr.status == 304){
            let graph = echarts.dataTool.gexf.parse(xhr.responseText);
            let categories = [];
            for (let i = 0; i < 10; i++) {   //根据gephi分类确定i
                categories[i] = {
                    name: '类目' + i
                };
            }
            graph.nodes.forEach(function (node) {
                node.category = node.attributes.modularity_class;//和目录对上号
                node.value = node.symbolSize;
                node.itemStyle = null;  //清除原本的node里面颜色，让echarts分配，以便于和legend颜色对上号
                node.label = {
                    normal: {
                        show: node.symbolSize > 35//大于30的显示标签
                    }
                };
            });
            option = {
                    title:{
                        text:"footBall",
                        bottom:"20px"
                    },
                    tooltip: {},
                    backgroundColor:"rgb(243,243,243)",
                    legend: [{
                        data: categories.map(function (a) {
                            return a.name;
                        }),

                    }],
                    series : [
                        {
                            type: 'graph',
                            data: graph.nodes,
                            links: graph.links,
                            categories: categories,
                            roam: true,
                            label: {
                                normal: {
                                    position: 'right',
                                }
                            },
                            lineStyle: {
                                normal: {
                                    color: 'source',
                                    curveness: 0.3  //曲度
                                }
                            }
                        }
                    ]
                };

            myChart.setOption(option);
        }
    }
};

