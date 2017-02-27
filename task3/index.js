/**
 * Created by Mengman on 2017/2/26.
 */
var phonePattern = /^(13\d|15\d|188|189)\d{8}$/;        //13，15开头或者188,189开头,总共11位
var wordPattern = /(?:^|\s)(\w+(?:-\w+)*)\s+\1(?=\s|$)/;
//开头或以空格开头 字母中间可以有- 但不能以-开头或结尾
var btn1 = document.getElementsByTagName("button")[0];
var btn2 = document.getElementsByTagName("button")[1];
var span = document.querySelectorAll("span");
var input = document.querySelectorAll("input");

btn1.onclick = function () {
      var value = input[0].value.trim();
      if (phonePattern.test(value)){
        span[0].innerHTML = "号码验证通过!";
        span[0].style.color = "green";
      }else {
          span[0].innerHTML = "号码格式不对！";
          span[0].style.color = "red";
      }
};

btn2.onclick = function () {
    var value = input[1].value.trim();
    if (wordPattern.test(value)){
        span[1].innerHTML = "true";
        span[1].style.color = "green";
    }else {
        span[1].innerHTML = "false";
        span[1].style.color = "red";
    }
}
