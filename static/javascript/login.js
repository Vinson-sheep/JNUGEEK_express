/**
 * Created by yys-tt on 2017/9/1.
 */
$(document).ready(function(){
    //remove按钮事件
    remove_alert();
    //登录事件
    login();
});

//remove按钮事件
function remove_alert() {
    $("span.remove").click(function(){
        $("#alert").hide();
    })
}

//模态框通用函数
function alert_something(title,str) {
    if (typeof str == typeof "a") {
        $("#alert .message").text(str);
        $("#alert .title").text(title);
        $("#alert").show();
    }
}

//登录事件
function login() {
    $("#container input[type='submit']").click(function(e){
        // 取消默认行为
        e.preventDefault();
        // 禁用按钮
        $(this).attr("disabled",true);
        //获取数据
        var username = $("#container input[name='username']").val().trim().replace(/["'“”]/g,"");
        var password = $("#container input[name='password']").val().trim().replace(/["'“”]/g,"");
        // 表单验证
        if (!username || !password) {
            alert_something("输入错误","username和password不能为空");
            $(this).attr("disabled",false);
            return;
        }
        //数据整理
        var data = "username=" + username + "&password=" + password;
        var url = "/logincheck/api";
        console.log(data);
        // ajax模拟
        // 新建xhr对象
        var xhr = new XMLHttpRequest();
        // xhr操作
        xhr.open("post", url, false); //同步提交为false，异步可以用true
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//需要修改header
        xhr.send(data);//传输数据
        // 检验提交情况
        if ((xhr.status >= 200 && xhr.status <300) || xhr.status == 304) {
            if (xhr.responseText && xhr.responseText == "true") {
                // 提交成功
                $.cookie('username',username,{path: '/'});
                $.cookie('password',password,{path: '/'});
                $.cookie('login_status',"on",{path: '/'});
                // 页面跳转
                window.location.href = "/data_show";
            } else if (xhr.responseText && xhr.responseText == "false"){
                // 提交失败，但是有返回
                alert_something("登录失败","用户名或密码不正确");
                $("#container input[type='submit']").attr("disabled",false);
                return;
            } else {
                // 提交失败，可能有返回，但是非true和false
                alert_something("出错了","来自服务器的嘲讽");
                $("#container input[type='submit']").attr("disabled",false);
                return;
            }
        } else {
            // 提交失败
            // 直接是赤字，大多是网络错误
            alert_something("登录失败","请检查你的网络。");
            $("#container input[type='submit']").attr("disabled",false);
            return;
        }

    })
}