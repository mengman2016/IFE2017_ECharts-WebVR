/**
 * Created by Mengman on 2017/3/30.
 */

function Vue(obj) {
    let el = document.getElementById(obj.el.slice(1));  //拿到el元素
    let html = el.innerHTML;                            //获取el的html内容
    let pattern = /\{\{[^{}]+\}\}(?!\})/g;              //匹配html的{{}}
    let result;
    let matches = [];                                   //存放{{}}中的字符串，如果字符串有.，将它拆开以数组形式存放
    let divTarget = [];                                 //匹配到的{{xxx}}字符串
    while((result = pattern.exec(html)) != null){
        divTarget.push(result[0]);
        result = result[0].slice(2, result[0].length-2);
        result = result.split('.');
        matches.push(result);
    }
    //得到div中的{{xxx}}内容
    console.log(divTarget);
    let objAttr = [];
    for (let i=0;i<matches.length;i++){
        let data = obj.data;
        for (let j=0;j < matches[i].length;j++){
            if (!data[matches[i][j]]){
                data = null;
                break;
            }
            data = data[matches[i][j]];
        }
        console.log(data);
        objAttr.push(data); //得到html页面{{xxx}}引用的对应的obj的值
    }

    for (let i=0; i<matches.length; i++){
        html = html.replace(divTarget[i], objAttr[i]);
    }
    console.log(html);      //替换html内容

    el.innerHTML = html;
}



let app = new Vue({
    el: '#app',
    data: {
        user: {
            name: 'youngwind',
            age: 25
        }
    }
});