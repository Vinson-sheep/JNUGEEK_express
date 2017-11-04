/**
 * Created by yys-tt on 2017/10/22.
 */
window.onload = function() {
    // 定义全局global
    // 方便多个函数引用
    var global = {
      circle : null
    };
    // close-btn
    closeModal();
    // 初始化提交按钮
    initSubmit();
    // 循环检查是否超过了ddl
    // 如果超过了ddl
    // 函数会禁用掉submit按钮
    circleCheck(global);
};

// 模态框close按钮
// 点击按钮能够关闭模态框
function closeModal() {
    var closeBtn = document.getElementsByClassName("close-btn")[0];
    var modal = document.getElementsByClassName("modal")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
}
// 输入参数能够弹出模态框
// 输入的title和message都为string
function openModal(title,message) {
    // 首先验证参数
    if (!title || typeof title !== typeof ("a") ) {
        return;
    }
    if (!message || typeof message !== typeof ("a") ) {
        return;
    }
    var modal = document.getElementsByClassName("modal")[0];
    var titleSpan = modal.getElementsByClassName("modal-title")[0];
    var messagePar = modal.getElementsByTagName("P")[0];
    titleSpan.innerHTML = title;
    messagePar.innerHTML = message;
    modal.style.display = "block";
}


// 提交按钮时间
// AJAX模拟表单提交
// 后台是flask框架
function initSubmit() {
    // 获取提交按钮
    var subBtn = document.getElementById("submit");
    // 初始化点击事件
    subBtn.onclick = function(e) {
        // 消除默认行为
        e.preventDefault();
        // 禁用按钮
        subBtn.disabled = true;
        // 获取表单内容
        var inputs = document.getElementsByTagName("input");
        var gender,question,answer,options,wechat;
        var requireds = [];
        // 遍历inputs
        for (var i=0;i<inputs.length;i++) {
            if (inputs[i].name == "gender" && inputs[i].checked) {
                // gender
                gender = inputs[i].value;
            } else if (inputs[i].name == "question") {
                // question
                question = inputs[i].value.trim();
            } else if (inputs[i].name == "answer") {
                // answer
                answer = inputs[i].value.trim();
            } else if (inputs[i].name == "options") {
                // options
                options = inputs[i].value.trim();
            } else if (inputs[i].name == "wechat"){
                // wechat
                wechat = inputs[i].value.trim();
            }
            // 获取含有require属性的控件
            if (inputs[i].required) {
                requireds.push(inputs[i]);
            }
        } /* end for */
        // 表单验证
        for (var i=0;i<requireds.length;i++) {
            if (!requireds[i].value) {
                // 获取问题内容
                var title = requireds[i].parentNode.firstElementChild.innerText;
                // 弹出模态框
                openModal("提交失败",title+"<br/>为必填");
                // 解锁按钮
                subBtn.disabled = false;
                // 终止事件
                return false;
            }
        }
        // 过滤
        var lists = [question,answer,options,wechat];
        for (var i=0;i<lists.length;i++) {
            lists[i] = lists[i].replace(/[{}【】|(select)]/g,"");
        }
        // 数据处理
        question = encodeURIComponent(question);
        answer = encodeURIComponent(answer);
        options = encodeURIComponent(options);
        wechat = encodeURIComponent(wechat);
        var data = "gender=" + gender + "&" + "question=" + question + "&" + "answer=" + answer + "&" + "options=" + options + "&" + "wechat=" + wechat;
        // AJAX模拟表单提交
        // 获取地址
        var url = document.getElementById("form").action;
        // 新建xhr对象
        var xhr = new XMLHttpRequest();
        // xhr操作
        xhr.open("post", url, false); //同步提交为false，异步可以用true
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//需要修改header
        xhr.send(data);//传输数据
        // 检验提交情况
        if ((xhr.status >= 200 && xhr.status <300) || xhr.status == 304) {
            if (xhr.responseText && xhr.responseText == "successful") {
                // 提交成功
                openModal("提交成功","上天之doge，祝福着你<br/><br/>页面将于三秒后刷新");
                setTimeout(function(){location.reload()},3000);
                return;
            } else if (xhr.responseText && xhr.responseText == "fail"){
                // 提交失败，但是有返回
                openModal("database出错了","请稍后再试");
            } else {
                // 提交失败，可能有返回，但是非successful和fail
                openModal("发生未知错误","请稍后再试");
            }
        } else {
            // 提交失败
            // 直接是赤字，大多是网络错误
            openModal("提交失败","请检查你的网络");
        }
        //  解锁按钮
        subBtn.disabled = false;
    };
}

//
function closeForm() {
    var subBtn = document.getElementById("submit");
    // 禁用按钮
    subBtn.disabled = true;
    // 修改文字
    subBtn.innerText = "截至于2017-10-26 23:59";
    // 修改样式
    subBtn.style.backgroundColor = "grey";
    subBtn.style.color = "white";
}



// 这个函数负责循环
function circleCheck(){
    // 闭包定义一个函数
    // checkTime负责检查时间
    // 如果时间到了周四深夜12点，则不能提交表单
    // 这里的函数会被循环
    var checkTime = function() {
        // 获取当前时间
        var now_time_str = (new Date()).valueOf();
        // 获取提交按钮
        var deadline = (new Date(2017,9,26,23,59,59)).valueOf();
        // 比较
        if (now_time_str >= deadline) {
            closeForm();
            // 关闭循环
            clearInterval(circle);
        }
    };
    // 先执行一次
    checkTime();
    // setInterval是过一段时间才执行第一次
    // 所以需要先执行一次
    var circle = setInterval(checkTime,2000);
}