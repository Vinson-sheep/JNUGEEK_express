/**
 * Created by yys-tt on 2017/9/3.
 */

$(document).ready(function(){
    //登录验证
    login_check();
    // 渲染数据
    data_show();
});

//登录验证
function login_check() {
    if ($.cookie('login_status') && $.cookie('login_status') == "on" ) {
        //登录成功
        return;
    } else {
        // 没有登录
        alert("你还没有登录呢，亲");
        window.location.href = "/login";
    }
}

//渲染数据
function data_show() {
    //AJAX
    $.ajax({
        type:"get",
        url: "/singleday/api",
        success: function(result,status,xhr) {
            var data = result;
            if (!data) {
                return;
            }
            data = JSON.parse(data);
            console.log(data);
            // var data = [
            //     {
            //         created_at: "2017-09-01 14:13:43",
            //         major : "cst",
            //         introduction : "略",
            //         grade : "1",
            //         name : "patrick",
            //         phone : "18674020841",
            //         email : "chengtiyanyang@qq.com",
            //         department : "technology",
            //         student : "2015051654"
            //     },
            //     {
            //         created_at: "2017-09-01 14:13:43",
            //         major : "cst",
            //         introduction : "略",
            //         grade : "1",
            //         name : "aada",
            //         phone : "18674020841",
            //         email : "chengtiyanyang@qq.com",
            //         department : "technology",
            //         student : "2015051654"
            //     }
            // ];
            // 遍历数据
            var all_html = "";
            for (var i=0;i<data.length;i++) {
                var html = "";
                html += "<td>" + data[i]["time"] +  "</td>";
                html += "<td>" + data[i]["gender"] +  "</td>";
                html += "<td>" + data[i]["question"] +  "</td>";
                html += "<td>" + data[i]["answer"] +  "</td>";
                html += "<td>" + data[i]["options"] +  "</td>";
                html += "<td>" + data[i]["wechat"] +  "</td>";
                html = "<tr>" + html + "<tr/>";
                all_html += html;
            }
            // 渲染
            $("table tbody").html(all_html);
        }
    });
}