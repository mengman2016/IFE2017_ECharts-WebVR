function Observer(data) {
    this.data = data;
    this.init(data);
}

Observer.prototype.init = function (obj) {
    let val;
    for(let key in obj){
        if (obj.hasOwnProperty(key)){
            val = obj[key];
            if (typeof val === 'object'){
                new Observer(val);
            }
            this.listen(key, val);
        }
    }
};

Observer.prototype.listen = function (key, val) {
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        set: function (newVal) {
            if (typeof newVal === 'object'){
                console.log('你修改了'+key);
                console.log(key+'的值现在是'+val);
                val = newVal;
                new Observer(newVal);
            }
        },
        get: function () {
            console.log('你访问了'+key);
            return val;
        }
    })
};

let data = {
    user:{
        name:"Jack",
        age:"22"
    },
    address:{
        city:"Shanghai"
    }
};

let app = new Observer(data);