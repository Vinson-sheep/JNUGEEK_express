/**
 * Created by yys-tt on 2017/9/1.
 */
var grade_transform = {
    "大一": 1,
    "大二": 2,
    "大三": 3,
    "大四": 4,
};

$(document).ready(function(){
    //remove按钮事件
    remove_alert();
    //表单验证
    form_check();
    //表单提交事件
    // form_submit();
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

//表单验证
// function form_check() {
//     //获取提交按钮
//     $("#form input,textarea").blur(function(e){
//         //验证非空
//         if (!$(this).val().trim()) {
//             $(this).parent().addClass("has-error").removeClass("has-success");
//             $(this).next().text("选框不能为空");
//         }
//     });
//     $("#form input,textarea").keyup(function(e){
//         //验证非空
//         if (!$(this).val().trim()) {
//             $(this).parent().addClass("has-error");
//             $(this).next().text("选框不能为空");
//             return;
//         }
//         //姓名
//         if ($(this).attr("name") == "name") {
//             if ($(this).val().trim().match(/^[\u4e00-\u9fa5A-Za-z]+$/)){
//                 $(this).parent().addClass("has-success").removeClass("has-error");
//                 $(this).next().text("");
//             } else {
//                 $(this).parent().addClass("has-error").removeClass("has-success");
//                 $(this).next().text("姓名必须为英文和中文字符,且不能有空格");
//             }
//         }
//         //邮箱
//         if ($(this).attr("name") == "email") {
//             if ($(this).val().trim().match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
//                 $(this).parent().addClass("has-success").removeClass("has-error");
//                 $(this).next().text("");
//             } else {
//                 $(this).parent().addClass("has-error").removeClass("has-success");
//                 $(this).next().text("邮箱格式错误");
//             }
//         }
//         //电话
//         if ($(this).attr("name") == "phone") {
//             if ($(this).val().trim().match(/^\d+$/)){
//                 $(this).parent().addClass("has-success").removeClass("has-error");
//                 $(this).next().text("");
//             } else {
//                 $(this).parent().addClass("has-error").removeClass("has-success");
//                 $(this).next().text("电话格式错误");
//             }
//         }
//         //学号
//         if ($(this).attr("name") == "student_id") {
//             if ($(this).val().trim().match(/^\d{10}$/)){
//                 $(this).parent().addClass("has-success").removeClass("has-error");
//                 $(this).next().text("");
//             } else {
//                 $(this).parent().addClass("has-error").removeClass("has-success");
//                 $(this).next().text("学号格式错误");
//             }
//         }
//         if ($(this).attr("name") == "major") {
//             if ($(this).val().trim().match(/^[\u4e00-\u9fa5A-Za-z]+$/)){
//                 $(this).parent().addClass("has-success").removeClass("has-error");
//                 $(this).next().text("");
//             } else {
//                 $(this).parent().addClass("has-error").removeClass("has-success");
//                 $(this).next().text("学院专业格式错误");
//             }
//         }
//         if ($(this).attr("name") == "introduction") {
//             $(this).parent().addClass("has-success").removeClass("has-error");
//             $(this).next().text("");
//         }
//     });
//     //都是一样的，只是换了事件
//     $("#form input,textarea").change(function(e){
//         //姓名
//         if ($(this).attr("name") == "name") {
//             if ($(this).val().trim().match(/^[\u4e00-\u9fa5A-Za-z]+$/)){
//                 $(this).parent().addClass("has-success").removeClass("has-error");
//                 $(this).next().text("");
//             } else {
//                 $(this).parent().addClass("has-error").removeClass("has-success");
//                 $(this).next().text("姓名必须为英文和中文字符,且不能有空格");
//             }
//         }
//         //邮箱
//         if ($(this).attr("name") == "email") {
//             if ($(this).val().trim().match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
//                 $(this).parent().addClass("has-success").removeClass("has-error");
//                 $(this).next().text("");
//             } else {
//                 $(this).parent().addClass("has-error").removeClass("has-success");
//                 $(this).next().text("邮箱格式错误");
//             }
//         }
//         //电话
//         if ($(this).attr("name") == "phone") {
//             if ($(this).val().trim().match(/^\d+$/)){
//                 $(this).parent().addClass("has-success").removeClass("has-error");
//                 $(this).next().text("");
//             } else {
//                 $(this).parent().addClass("has-error").removeClass("has-success");
//                 $(this).next().text("电话格式错误");
//             }
//         }
//         //学号
//         if ($(this).attr("name") == "student_id") {
//             if ($(this).val().trim().match(/^\d{10}$/)){
//                 $(this).parent().addClass("has-success").removeClass("has-error");
//                 $(this).next().text("");
//             } else {
//                 $(this).parent().addClass("has-error").removeClass("has-success");
//                 $(this).next().text("学号格式错误");
//             }
//         }
//         if ($(this).attr("name") == "major") {
//             if ($(this).val().trim().match(/^[\u4e00-\u9fa5A-Za-z]+$/)){
//                 $(this).parent().addClass("has-success").removeClass("has-error");
//                 $(this).next().text("");
//             } else {
//                 $(this).parent().addClass("has-error").removeClass("has-success");
//                 $(this).next().text("学院专业格式错误");
//             }
//         }
//     })
// }
//
// //模拟表单提交事件
// function form_submit() {
//     //获取提交按钮
//     $(".submit-btn").click(function(e) {
//         //阻止默认行为
//         e.preventDefault();
//         //禁用按钮
//         $(this).attr("disabled",true);
//         //再次验证表单，由于JQ的有类似贪婪模式一样的东西，非常麻烦
//         if ($("#form input,textarea").parent().hasClass("has-error") ||
//             !$("#form input[name='name']").val().trim() ||
//             !$("#form input[name='email']").val().trim() ||
//             !$("#form input[name='phone']").val().trim() ||
//             !$("#form input[name='student_id']").val().trim() ||
//             !$("#form input[name='major']").val().trim() ||
//             !$("#form textarea").val().trim()) {
//             alert_something("提交失败","存在未填写或填写错误的选项，请再次确认您的报名表。等你哟~");
//             $(this).attr("disabled",false);
//             return;
//         }
//         //获取数据
//         var name = $("#form input[name='name']").val().trim();
//         var email = $("#form input[name='email']").val().trim();
//         var phone = $("#form input[name='phone']").val().trim();
//         var student_id = parseInt($("#form input[name='student_id']").val().trim());
//         var grade = grade_transform[$("#form select[name='grade']").val().trim()];
//         var department = $("#form select[name='department']").val().trim();
//         var major = $("#form input[name='major']").val().trim();
//         var introduction = $("#form textarea[name='introduction']").val().trim();
//         //整理数据
//         var obj = {
//             name : name,
//             email : email,
//             phone : phone,
//             student_id : student_id,
//             grade : grade,
//             department : department,
//             major : major,
//             introduction : introduction
//         };
//         //ajax提交表单
//         $.ajax({
//             type:"post",
//             url: "https://www.jnugeek.cn/api/preSign",
//             data: obj,
//             dataTpye: "json",
//             success: function() {
//                 alert_something("提交成功","请保持您的手机和邮箱处于使用状态。页面将于3秒后刷新");
//                 //刷新页面
//                 setTimeout(function(){
//                     location.reload();
//                 },3000);
//                 $(this).attr("disabled",false);
//                 return;
//             },
//             error: function(xhr,status,error) {
//                 alert(xhr,status,error);
//                 if (error == "METHOD NOT ALLOWED") {
//                     alert_something("提交失败","你已经报名了。");
//                     $(".submit-btn").attr("disabled",false);
//                     return;
//                 } else {
//                     alert_something("报名失败","请检查你的网络。或者你已经报名了");
//                     $(".submit-btn").attr("disabled",false);
//                     return;
//                 }
//             }
//         });
//     });
// }