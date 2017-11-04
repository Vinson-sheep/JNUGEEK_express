/**
 * Created by yys-tt on 2017/8/30.
 */

//列表缩放判断
list_open = false;

window.onload = function() {
    //回滚动画
    slideToTop();
    //菜单缩放
    list_toggle();
}

//菜单缩放
function list_toggle() {
    //获取按钮
    $("#list-btn").click(function() {
        if (!list_open) {
            $("#list").animate({
                width: 200 + 20 +"px",
                height: 42*6+20 + "px",
                opacity: "0.8",
            },300);
            $("#list").animate({
                width: 200+"px",
                height: 42*6+ "px",
                opacity: "0.8",
            },100);
            list_open = true;
        } else {
            $("#list").animate({
                width: 200 + 20 +"px",
                height: 42*6+20 + "px",
                opacity: "0.8",
            },100);
            $("#list").animate({
                width: "0px",
                height: "0",
                opacity: "0",
            },300);
            list_open = false;
        }
    })
}

//回滚顶部按钮动画
function slideToTop() {
    //设置隐入隐出动画
    $(window).scroll(function() {
        if ($(window).scrollTop()<100) {
            $(".slideToTop").fadeOut(500);
        } else {
            $(".slideToTop").fadeIn(500);
        }
    });
    //设置回滚动画
    $(".slideToTop").click(function() {
        $("html,body").animate({scrollTop:0},500);
        return false;
    });
}