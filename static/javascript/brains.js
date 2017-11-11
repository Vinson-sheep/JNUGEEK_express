// 当文档被加载完成，就会立即执行匿名函数的内容
$(function(){
    // 检验是否是直接进入页面
    // 如果是，则直接跳转道gender
    checkPath();
    // 初始化模态框
    // 显示分数
    modelInit();
    // 初始化single-option的input和label
    radioInit();
    // 初始化indefinite-section的input和label
    checkboxInit();
    // 初始化排序题目1
    sortingInit1();
    // 初始化排序题目2
    sortingInit2();
    // 初始化next按钮
    // 当点击按钮时，会切换表单内容
    toNext();
    // 初始化submit-btn
    submitBtn();
});

// 右上时间的倒数，默认15分钟
// 采用这种形式是将api暴露出来
// 方便清理间隙
var counting = timeCount();

// 重定向函数
// 如果页面没有通过gender和wechat页面就直接进入
// 那么页面会重新定向到gender
function checkPath() {
    if (!$.cookie("gender") || !$.cookie("wechat")) {
        location.href = "/singleday/brains/gender";
    }
}

// 初始化模态框
// 这个模态框是负责显示分数的
function modelInit() {
    $("#grade-show").dialog({
        autoOpen: false,
        resizable: false,
        maxWidth: 400,
        modal: true,
        buttons: [
            {
                text: "截图了",
                click: function() {
                    $(this).dialog("close");
                }
            }
        ],
        close: function() {
            location.href = "/singleday/rule"
        }
    });
}


// single-option
// 这个函数会抓取name/value等信息
// 赋予label和input属性的值
// 同时会更新label的for属性和input的id属性
// 使其一一对应
function radioInit() {
    var labels = $(".single-option label");
    var inputs = $(".single-option input[type=radio]");
    for (var i=0;i<labels.length;i++) {
        labels[i].setAttribute("for", "radio" + (i+9));
        inputs[i].id = "radio" + (i+9);
        var name = $(inputs[i]).parent().parent().parent().children()[0].innerText.split(". ")[1];
        var value = $(inputs[i]).prev().text();
        inputs[i].name = name;
        inputs[i].value = value;
    }
}

// indefinite-section
// 这个函数跟radioInit类似
// 这个函数会抓取label和input的属性值
// 不同的是input[type=radio]变成了type=checkbox
function checkboxInit() {
    var labels = $(".indefinite-section label");
    var inputs = $(".indefinite-section input[type=checkbox]");
    for (var i=0;i<labels.length;i++) {
        labels[i].setAttribute("for", "check" + i);
        inputs[i].id = "check" + i;
        var name = $(inputs[i]).parent().parent().parent().children()[0].innerText.split(". ")[1];
        var value = $(inputs[i]).prev().text();
        inputs[i].name = name;
        inputs[i].value = value;
    }
}

// 初始化排序题目1
function sortingInit1() {
    $("#sorting-1 ul").sortable();
}

// 初始化排序题目2
function sortingInit2() {
    $("#sorting-2 ul:nth-of-type(2)").sortable();
}

// toNext()能够切换题目内容
// 当form-next中的button被点击
// 将会隐藏当前的题目内容
// 并显示下一个div的题目内容
function toNext() {
    // 获取btns
    var btns = $(".form-next button");
    var nextBtn = $(btns[0]);
    var subBtn = $(btns[1]);
    // 定义一个变量用于定位
    var index = 0;
    var questionList = $(".question-box");
    // 定义一个信息对象
    var questionMes = [
        {
            type: "判断题（共8分，每题2分）",
            num: "共4题"
        },
        {
            type: "单项选择题（共45分，每题3分）",
            num: "共15题"
        },
        {
            type: "不定项选择题（20分，每题5分）",
            num: "共4题"
        },
        {
            type: "排序题（15+12分）",
            num: "共2题"
        }
    ];
    // 获取form-header
    var spans = $(".form-header span");
    var typeSpan = $(spans[0]);
    var numSpan = $(spans[1]);

    // 先初始化一次form-header
    typeSpan.text(questionMes[0].type);
    numSpan.text(questionMes[0].num);

    // btn的click事件
    nextBtn.click(function(){
        // 替换问题内容
        index++;
        questionList.hide();
        $(questionList[index]).show();
        // 替换form-header
        typeSpan.text(questionMes[index].type);
        numSpan.text(questionMes[index].num);
        // 为了更好的交互
        // 设置scrolltop=0
        document.body.scrollTop = 0;
        // 判断是否已经切换到最后一个内容
        // 如果判断index+1==questionList.length
        // 则显示subBtn，隐藏nextBtn
        if (index+1 == questionList.length) {
            $(this).hide();
            subBtn.show();
        }
    });
}

// 提交问卷函数
// 点击“提交答卷”后触发
function submitBtn() {
    var btn = $($(".form-next button")[1]);
    btn.click(getGrade);
}

// getgrade用于提交数据，并显示成绩
// 同时清除间隔
// 提交问卷包括停止计时/获取数据/提交数据/反馈数据
function getGrade() {
    // 首先是停止计时
    clearInterval(counting);
    // 禁用subBtn,更改css和text
    $($(".form-next button")[1]).attr('disabled',"true").text("loading...");
    // 获取数据
    var data = getdata();
    // 提交数据
    // 并且反馈成绩
    data["wechat"] = $.cookie("wechat");
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/singleday/datapost/female/api",
        dataType: "json",
        data: JSON.stringify(data),
        success: function(result) {
            showGrade(result);
            // 立即清除cookie
            $.cookie('gender',null,{expires:-1,path: '/'});
            $.cookie('wechat',null,{expires: -1,path: '/'});
        },
        error: function(message) {
            alert(message);
        }
    });
}


// 反馈得分函数
function showGrade(grade) {
    var dialog = $("#grade-show");
    if ($.cookie("wechat")) {
        // 修改wechat
        dialog.find(".wechat").text($.cookie("wechat"));
        // 修改grade
        dialog.find(".grade-span").text(grade);
        // 显示分数
        dialog.dialog("open");
    } else {
        return;
    }

}

// 倒计时函数
// 这个函数会从15分钟开始记时间
// 同时将剩余时间反馈到div.time-count上
// 一旦time归0，则直接计算分数
// 这里不采取Date对象，而是使用setInterval
function timeCount() {
    var totalSecond = 900;
    // 获取timecount中的span
    var timeSpan = $(".time-count span");
    // 设置间隙
    var counting = setInterval(function(){
        totalSecond--;
        // 更新视图
        timeSpan.text(timeTrans(totalSecond));
        // 如果时间清0，则清除间隔
        // 并且计算结果
        if (totalSecond==0) {
            getGrade();
        }
    },1000);

    return counting;
}
// 这个函数是跟timeCount()配合使用的
// 输入一个整数，将会返回一个mm:ss形式的字符串
function timeTrans(int) {
    var mins = Math.floor(int/60);
    var secs = (int%60).toString();
    if (mins < 10) {
        mins = "0"+ mins;

    }
    if (secs < 10) {
        secs = "0"+ secs;
    }
    return mins+":"+secs;
}

// 这个函数负责将所有的答案收集起来，整理成一个对象
// 由于题目的type有四种类型
// 函数通过不同的方式收集各种题目的数据并整理成json
function getdata() {
    // 定义一个用于返回的对象
    var data = {};
    // true-or-false
    var getData1 = function() {
        data["true-or-false"] = {};
        var radios = $(".true-or-false input[type=radio]");
        // 遍历数组
        for (var i=0;i<radios.length;i++) {
            if ($(radios[i]).prop("checked")) {
                data["true-or-false"][radios[i].name] = radios[i].value;
            }
        }
    };
    getData1();
    // single-option
    var getData2 = function() {
        data["single-option"] = {};
        var radios = $(".single-option input[type=radio]");
        for (var i=0;i<radios.length;i++) {
            if ($(radios[i]).prop("checked")) {
                data["single-option"][radios[i].name] = radios[i].value;
            }
        }
    };
    getData2();
    // indefinite-section
    var getData3 = function() {
        data["indefinite-section"] = {};
        var checkboxs = $(".indefinite-section input[type=checkbox]");
        for (var i=0;i<checkboxs.length;i++) {
            if ($(checkboxs[i]).prop("checked")) {
                // 分两种情况
                // 第一种是没有初始化属性，则赋值为空数组
                if (!data["indefinite-section"][checkboxs[i].name]) {
                    data["indefinite-section"][checkboxs[i].name] = [checkboxs[i].value];
                } else {
                    // 第二种是已经初始化属性，数组内至少有一个元素
                    data["indefinite-section"][checkboxs[i].name].push(checkboxs[i].value);
                }
            }
        } // end for
    };
    getData3();
    // sorting-problem
    var getData4 = function () {
        data["sorting-problem"] = {};
        // female有两道题
        // male有一题，做一个通用的函数
        var sortingUls = $(".sorting-problem .sorting-ul");
        // 遍历
        for (var i=0;i<sortingUls.length;i++) {
            var title = $(sortingUls[i]).parent().find("p.title").text().split(". ")[1];
            var spans = $(sortingUls[i]).find("li>span:nth-of-type(2)");
            data["sorting-problem"][title] = [];
            // 遍历spans
            for (var j=0;j<spans.length;j++) {
                data["sorting-problem"][title].push($(spans[j]).text());
            }
        }
    };
    getData4();

    return data;
}