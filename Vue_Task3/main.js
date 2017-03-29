/**
 * Created by Mengman on 2017/3/29.
 */

function Observer(data, parentAttr) {
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
    let _this = this;
    Object.defineProperty(this.data, key, {
        configurable: true,
        enumerable: true,
        set: function (newVal) {
            console.log(this);
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

            val = newVal;
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
    let attrArray = attr.split('.');
    console.log(attrArray);
    let _this = this;
    console.log(_this);
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

let app = new Observer({
    stu: {
        name: {
            firstName:{
                aaa:1
            },
            lastName: 'Ge'
        },
        age: 24
    },
    a: {
        b: 3
    }
}, null);

app.$watch('stu.name.firstName', function () {
    console.log('我知道你改变了！');
});
