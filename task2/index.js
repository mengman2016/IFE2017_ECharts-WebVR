/**
 * Created by Mengman on 2017/2/26.
 */

function addEvent(ele, type, handle){
    if (ele.addEventListener){
        ele.addEventListener(type, handle, false);
    }else if (ele.attachEvent){
        ele.attachEvent("on"+type, handle);
    }else {
        ele['on'+type] = handle;
    }
}

var body = document.getElementsByTagName("body")[0];
var menu = document.getElementsByClassName("menu")[0];
addEvent(body, "contextmenu", function (event) {    //右键事件
    menu.style.display = "none";
    var target = event.target||event.srcElement;
    if (target.tagName.toLowerCase() == "div"){
        event.preventDefault();                     //阻止默认菜单出现
        var windowHeight =window.innerHeight;
        var windowWidth = window.innerWidth;
        showMenu(event,windowHeight,windowWidth);
    }
});

addEvent(body, "click", function (event) {      //左键事件
    var target = event.target||event.srcElement;
    if (target.tagName.toLowerCase() == "span"){    //点击菜单弹出对话框
        alert(target.innerHTML);
    }
    menu.style.display = "none";                    //点击其他地方菜单消失
});

/**
 * 展示菜单
 * */
function showMenu(event,windowHeight,windowWidth){
    var mousepositionX = event.clientX,
        mousePositionY = event.clientY;
    menu.style.display = "inline";              //显示菜单
    if (windowWidth-mousepositionX <= 200&&mousepositionX > 200){     //右边空间不够左边够的时候
        if(windowHeight - mousePositionY >60){           //下方有足够空间
            menu.style.top = event.pageY+"px";           //使用pageY防止页面滚动时出现问题
            menu.style.left = event.pageX-200+"px";
            return;
        }
        if (mousePositionY > 60){                       //下方空间不够，但上方空间够
            menu.style.top = event.pageY-60+"px";
            menu.style.left = event.pageX-200+"px";
            return;
        }
    }
    if (windowWidth - mousepositionX > 200&&windowHeight- mousePositionY <= 60){  //左边空间够但下方空间不够
        menu.style.top = event.pageY-60+"px";
        menu.style.left = event.pageX+"px";
        return;
    }
    menu.style.top = event.pageY+"px";                  //其他情况，统一放在右下角
    menu.style.left = event.pageX+"px";
    return true;
}