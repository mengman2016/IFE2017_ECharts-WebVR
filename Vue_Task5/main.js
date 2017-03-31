/**
 * Created by Mengman on 2017/3/30.
 */

function Observer(data,parentAttr) {
    this.data = data;
    this.parentAttr = parentAttr;
    this.childObserver = [];
    this.eventList = new Event();
    this.init(data);
}

Observer.prototype.init = function (obj) {
    let val;
    let _this = this;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];

            if (typeof val === 'object') {
                _this.childObserver.push(new Observer(val, _this));
            }
            this.listen(key, val);
        }
    }
};

Observer.prototype.listen = function (key, val) {
    let _this = this;               //第一次初始化时，是不执行set，这时候传进来的this值是observer
    Object.defineProperty(this.data, key, { //利用这次的this将_this设置成observer类型的值
        configurable: true,                 //_this值是多少不重要，只需要这个类型,后面每次使
        enumerable: true,                   //用它会把它先转换成对应app的那个observer
        set: function (newVal) {            //当正式设置值的时候，只执行set里面的内容
                                            // 这是this值是obj,遍历observer所有的节点，找到对应的
            if (typeof this === 'object'){  //observer，执行它对应的eventList里面的方法
                val = newVal;
                while(_this.parentAttr){
                    _this = _this.parentAttr;   //使_this等于app
                }
                let observerList = [];
                list(_this, observerList);
                console.log(observerList);
                let target_obj = this;
                for (let i=0;i<observerList.length;i++){
                    if (observerList[i].data == target_obj){
                        _this = observerList[i];
                        break;
                    }
                }
            }
            _this.eventList.emit(key);
            let tempKey = key;
            while (_this.parentAttr) {

                _this = _this.parentAttr;
                for (let item in _this.data) {
                    if (_this.data[item].hasOwnProperty(tempKey)) {
                        _this.eventList.emit(item);
                        tempKey = item;
                        break;
                    }
                }
            }
            if (typeof newVal === 'object') {
                new Observer(newVal);
            }
        },
        get: function () {
            return val;
        }
    })
};

Observer.prototype.$watch = function (attr, handle) {
    let attrArray = attr.split('.');    //当attr为xxx.xxx格式时，处理一下格式
    let _this = this;
    for (let i = 0; i < attrArray.length - 1; i++) {
        for (let j=0; j<_this.childObserver.length;j++){
            if (_this.childObserver[j].data == _this.data[attrArray[i]]){
                _this = _this.childObserver[j];
                break;
            }
        }
    }
    _this.eventList.on(attrArray[attrArray.length - 1], handle);
};

function Event() {
    this.events = {};
}

Event.prototype.on = function (attr, handle) {
    if (this.events[attr]) {
        this.events[attr].push(handle);
    } else {
        this.events[attr] = [handle];
    }
};

Event.prototype.emit = function (attr) {
    if (this.events[attr]) {
        this.events[attr].forEach((handle) => {
            handle();
        })
    }
};

function Vue(obj) {
    let _this = this;
    let el = document.getElementById(obj.el.slice(1));  //拿到el元素
    let baseHtml = el.innerHTML;
    let observer = new Observer(obj.data, null);
    let watchAttr = _this.updateDom(obj, baseHtml);    //需要被监听的属性,以{{xxx}}形式存在
    watchAttr.forEach((item)=>{
         observer.$watch(item.slice(2, item.length-2), function () {
             _this.updateDom(obj, baseHtml);
         });
    });
    return observer.data;
}

Vue.prototype.updateDom = function (obj, baseHtml) {
    let html = baseHtml;                                //获取el的html内容
    let pattern = /\{\{[^{}]+\}\}(?!\})/g;              //匹配html的{{}}
    let result;
    let matches = [];                                   //存放{{xxx}}中的字符串xxx，如果字符串有.，将它拆开以数组形式存放
    let divTarget = [];                                 //存放匹配到的{{xxx}}字符串
    while((result = pattern.exec(html)) != null){
        divTarget.push(result[0]);
        result = result[0].slice(2, result[0].length-2);
        result = result.split('.');
        matches.push(result);
    }
    //得到{{xxx}}内容
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
        objAttr.push(data); //得到html页面{{xxx}}引用的对应的obj的值
    }

    for (let i=0; i<matches.length; i++){
        html = html.replace(divTarget[i], objAttr[i]);
    }
    //替换html内容

    document.getElementById(obj.el.slice(1)).innerHTML = html;
    return divTarget;
};

function list(observer, arr) {   //遍历所有的observer，将他们放入一个数组中
    arr.push(observer);
    if (observer.childObserver){
        for (let i =0;i<observer.childObserver.length;i++){
            list(observer.childObserver[i], arr);
        }
    }
}

let app = new Vue({
    el: '#app',
    data: {
        user: {
            name: 'Mengman',
            age: 25
        }
    }
});
