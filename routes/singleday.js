var express = require("express");
var router = express.Router();
var path = require("path");
var url = require("url");
var mysql = require("mysql");

router.get("/survey", function(req, res, next){
    res.sendFile(path.join(__dirname, "../templates", "singleday", "singleDay.html"));
});

router.get("/rule", function(req, res, next){
    res.sendFile(path.join(__dirname, "../templates", "singleday", "rule.html"));
});

router.get("/brains/gender", function(req, res, next){
    res.sendFile(path.join(__dirname, "../templates", "singleday", "gender.html"));
});

router.get("/brains/wechat", function(req, res, next){
    res.sendFile(path.join(__dirname, "../templates", "singleday", "wechat.html"));
});

router.get("/brains/female", function(req, res, next){
    res.sendFile(path.join(__dirname, "../templates", "singleday", "female.html"));
});

router.get("/brains/male", function(req, res, next){
    res.sendFile(path.join(__dirname, "../templates", "singleday", "male.html"));
});


// 用于进行微信id的验证
// 如果数据库中含有这个wechat
// 则api返回true，反之，返回false
router.get("/wechatCheck/api", function(req, res, next){
    var args = url.parse(req.url, true).query;
    var wechat = args.wechat;
    // 打开数据库
    // 如果搜索不到wechat，则返回true
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'abc123',
        database: 'jnugeek'
    });

    connection.connect();

    var addSql = "select* from singleday_brains where wechat = ?";
    var addSqlParams = [wechat];

    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log(err.message);
            res.send("error");
        } else if (!result[0]) {
            res.send("true");
        } else {
            res.send("false");
        }

    });
});

// 数据提交函数
// 这个函数获取来自页面的json数据
// 转换为一般对象后跟后台静态对象比较
// 根据算法算出一个数值，也就是分数
// 再反馈给前段
// router.post("/datapost/female/api", function (req, res, next) {
//     res.send("11");
// });
router.post("/datapost/female/api", function (req, res, next) {
    var data = req.body;
    // 开始计算分数
    var grade = 0;
    // true-or-false
    // 判断题，一题2分
    for (var key in data["true-or-false"]) {
        if (female["true-or-false"][key] == data["true-or-false"][key]) {
            grade = grade + 2;
        }
    }
    console.log(grade);
    // single-option
    // 单选题，一题三分
    for (var key in data["single-option"]) {
        if (female["single-option"][key] == data["single-option"][key]) {
            grade = grade + 3;
        }
    }
    console.log(grade);
    // indefinite-section
    // 不定项选择题，一题5分
    // 只有全对才给分
    // 这里采用比较简单的方法, 将数组折合成字符串进行比较
    for (var key in data["indefinite-section"]) {
        if (female["indefinite-section"][key].join("") === data["indefinite-section"][key].join("")) {
            grade = grade + 5;
        }
    }
    console.log(grade);
    // sorting-problem
    // 排序题
    // 第一题15分，第二题12分
    // 由于答案是有顺序的，如果对应则有3分
    for (var key in data["sorting-problem"]) {
        // 遍历data.sorting-problem.title的每个元素
        for (var i=0;i<data["sorting-problem"][key].length;i++) {
            // 如果相同的index对应的字符串相同，则有三分
            if (data["sorting-problem"][key][i] == female["sorting-problem"][key][i]) {
                grade = grade + 3;
            }
        }
    }
    console.log(grade);
    // 从data获取wechat
    var wechat = data['wechat'];
    // 写入数据库
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'abc123',
        database: 'jnugeek'
    });
    connection.connect();

    var modSql = 'insert into singleday_brains (wechat, gender, time ,grade) values (?, ?, now(), ?)';
    var modSqlParams = [wechat, 'female', grade];

    connection.query(modSql,modSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        // 返回成绩
        console.log(grade.toString());
        res.send(grade.toString());
    });
});

// 数据处理函数
// 原理同上
// 就是评分上有细微改动
router.post("/datapost/male/api", function (req, res, next) {
    var data = req.body;
    // 开始计算分数
    var grade = 0;
    // true-or-false
    // 判断题，一题2分
    for (var key in data["true-or-false"]) {
        if (male["true-or-false"][key] == data["true-or-false"][key]) {
            grade = grade + 2;
        }
    }
    console.log(grade);
    // single-option
    // 单选题，一题三分
    for (var key in data["single-option"]) {
        if (male["single-option"][key] == data["single-option"][key]) {
            grade = grade + 3;
        }
    }
    console.log(grade);
    // indefinite-section
    // 不定项选择题，一题5分
    // 只有全对才给分
    // 这里采用比较简单的方法, 将数组折合成字符串进行比较
    for (var key in data["indefinite-section"]) {
        if (male["indefinite-section"][key].join("") == data["indefinite-section"][key].join("")) {
            grade = grade + 5;
        }
    }
    console.log(grade);
    // sorting-problem
    // 排序题
    // 第一题15分，第二题12分
    // 由于答案是有顺序的，如果对应则有3分
    for (var key in data["sorting-problem"]) {
        // 遍历data.sorting-problem.title的每个元素
        for (var i=0;i<data["sorting-problem"][key].length;i++) {
            // 如果相同的index对应的字符串相同，则有三分
            if (data["sorting-problem"][key][i] == male["sorting-problem"][key][i]) {
                grade = grade + 3;
            }
        }
    }
    console.log(grade);
    // 从data获取wechat
    var wechat = data['wechat'];
    // 写入数据库
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'abc123',
        database: 'jnugeek'
    });
    connection.connect();

    var modSql = 'insert into singleday_brains (wechat, gender, time ,grade) values (?, ?, now(), ?)';
    var modSqlParams = [wechat, 'male', grade];

    connection.query(modSql,modSqlParams,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        // 返回成绩
        res.send(grade.toString());
    });
});

// -------------------------

// 定义两个对象，用来给上面的api计算分数使用
var female = {
    'true-or-false':
        {
            '崩坏3rd是暴雪娱乐公司的游戏作品': 'false',
            '姚明曾被NBA的休斯顿火箭队选中': 'true',
            'C罗是西班牙著名足球运动员': 'false',
            '篮球比赛中，对正在投2分球的人发生犯规，对方投进，应罚球2个': 'false'
        },
    'single-option':
        {
            '图片所示的是什么游戏？': '炉石传说',
            '以下哪把枪是狙击步枪？': '98K',
            '篮球之神是谁？': '乔丹',
            '2017年NBA冠军是哪个队？': '勇士队',
            '2016年NBA总决赛中FMVP是？': '勒布朗·詹姆斯',
            '在都为正品的情况下，以下哪双鞋的价格最高？': 'D',
            '你的男朋友想玩一款游戏，但电脑提示“缺少d3dx9_43.dll”，这时应该安装': 'DirectX',
            '著名的nba2k游戏系列中nba2k9总共出现了几名中国球员？': '3名',
            '下列属于米哈游公司的游戏作品是？': 'A',
            '自行车型号specialized tarmac SL6价格是多少？': '80000',
            '现在什么电脑配件涨得最厉害？': '内存',
            '电影《魔兽》在中国的上映时间？': '2016年6月',
            '选出下列图片中的内马尔': 'A',
            '男朋友重要还是口红重要？': '男朋友/因为男朋友可以买口红',
            '如果你跟你的男朋友一起吃饭，快要吃完了，男生没有想要买单的迹象，这时你应该？': '询问对方要不要买单，看对方反应'
        },
    'indefinite-section':
        {
            '下面哪些是电竞队伍？': [ 'SKT', 'EDG', 'RNG' ],
            '下列属于暴雪娱乐公司的作品是？': [ '魔兽争霸', '炉石传说', '星际争霸', '守望先锋' ],
            '在篮球比赛中，下列情况需要罚球的是？': [ '对正在做投篮动作的人员发生犯规（对方未投进）', '阻碍持球人员进行的非法身体接触' ],
            '魔兽争霸中有哪四大种族？': [ '人族', '暗夜精灵', '兽族', '不死亡灵' ]
        },
    'sorting-problem':
        {
            '请依次选出2011、2013、2014、2015、2016年NBA总冠军': [ '达拉斯小牛队', '迈阿密热火队', '圣安东尼奥马刺队', '金州勇士队', '克里夫兰骑士队' ],
            '从价格、等级考虑，将下列对等的口红和鞋子左右配对': [ 'CL', '名创优品', '卡姿兰', 'Tom Ford' ]
        }
};

// 作用同上
var male = {
    'true-or-false':
        {
            '女朋友和他人起了冲突，向你寻求安慰，这时你要和她讲道理，毕竟除了你没人愿意给她讲这些社会上的大道理。': 'false',
            '在你看球赛直播时，女朋友在一旁说：“一天就知道看篮球，吵死了，就不能不看吗？”这时你应该明白自己吵到她了，自觉戴上耳机不打扰她。': 'false',
            '你和女朋友一起相约出去玩，她迟到了半个小时，你说没事，多玩了半个小时手机而已。': 'true',
            '女朋友向你抱怨有一道题很难不会做，你帮她看了一下发现你也不会做，你直接上网找了一段答案发给了她。': 'false'
        },
    'single-option':
        {
            '以下哪张图为一般鼻影的正确区域？': 'A',
            '哪个牌子口红的正红色最出名？': 'dior999',
            '以下哪个品牌不生产口红？': '艾格',
            'bobbi brown是卖什么的？': '化妆品',
            '什么是姨妈色？': '韩剧中口红的颜色',
            '什么是斩男色？': '男生喜欢的颜色',
            '你和女朋友一起逛街，一个美女从你们身旁走过。你女朋友问你:“那个女孩长得好好看！”，你应该怎么接话？': '什么女孩？我没看到',
            '什么是咬唇妆？': 'C',
            '女生说的以下哪句话是真的？': '“我这个月没钱了”',
            '以下哪句话中的“讨厌”不是女生真的讨厌？': '讨厌，干嘛突然给我买包，是不是做了什么亏心事？',
            '不小心弄断了女朋友的口红，你该怎么办？': '立马转账，让她再去多买几支',
            '你们的恋爱纪念日到了，你却忘了给她买礼物，她说“没事，我不在意这些的”，你应该怎么办？': '急忙回答“那怎么行啊？你不知道要什么，那我帮你清空购物车吧！”',
            '女朋友对你说“我发现自己最近胖了”，你应该怎么回答她？': '你哪里胖了，你一点儿都不胖啊',
            '女朋友向你吐槽一个女生，你应该怎么做？': '带她去买东西、吃东西，消消气',
            '你和女朋友一起逛街，路过冰淇淋柜，她的脚步放慢了，看得出来她很想吃，但你想到她最近在减肥，这时你应该怎么办？': '马上买给她，说“吃吧，小馋猫”',
            '你随手点赞了一个女生的票圈，你女朋友此时的内心活动是？': '他干嘛突然点赞？他是不是看上了那女的？她是不是嫌弃我了？是不是想跟我分手？',
            '女朋友生病了，你应该对她说什么？': '你在哪儿，我带你去看医生',
            '以下哪种口红的质地最干? ': '哑光'
        },
    'indefinite-section':
        {
            '下面哪些话是万万不能当着女生面说的？': [ '你要这么想，我也没办法了', '好，我错了行不行', '有必要吗' ],
            '女朋友问你“你妈和我同时掉进水里，你先救谁？”，你应该怎么回答？': [ '当然是救你啦，我妈会游泳', '我也跳进水里陪你们好不好' ],
            '女生说什么话时表明她真的生气了？': [ '我一点儿都不生气', '嗯，你说什么都对', '呵呵，没事儿', '我才不会生气' ],
            '两位女生在下面哪些情况下说明关系真的很好：': [ '一起相约上厕所' ]
        },
    'sorting-problem':
        {
            '请给左侧名字匹配右侧眉形：': [ 'C', 'B', 'A', 'E', 'F', 'D' ]
        }
};

module.exports = router;