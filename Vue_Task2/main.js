function Observer(data) {
    this.data = data;
    this.init(data);
    this.eventList = new Event();
}

Observer.prototype.init = function (obj) {
    let val;
    for (let key in obj){
        if (obj.hasOwnProperty(key)){
            val = obj[key];

            if (typeof val === 'object'){
                new Observer(val);
            }
        }
        this.listen(key, val);
    }
};

Observer.prototype.listen = function (key, val) {
    let _this = this;
    Object.defineProperty(this.data, key, {
        enumerable:true,
        configurable: true,
        set: function (newVal) {
            console.log(`你设置了${key},他的值是${newVal}`);
            _this.eventList.emit(key, val, newVal);
            val = newVal;

            if (typeof newVal === 'object'){
                new Observer(newVal);
            }
        },
        get: function () {
            console.log(`你访问了${key}`);
            return val;
        }
    })
};

Observer.prototype.$watch = function (key, handle) {
    this.eventList.on(key, handle);
};

function Event() {
    this.events = {};
}

Event.prototype.on = function (attr, handle) {
    if (this.events[attr]){
        this.events[attr].push(handle);
        return;
    }
    this.events[attr] = [handle];
};

Event.prototype.emit = function (attr, ...arg) {
    if (this.events[attr]){
        this.events[attr].forEach( (handle)=>{
            handle(...arg);
        })
    }
};

let app = new Observer({
    name: 'Jack',
    age: 22
});

app.$watch('age', function (oldVal, newVal) {
    console.log(`我知道你改变了age的值，原来是${oldVal}现在是${newVal}`);
});

app.data.age = 32;