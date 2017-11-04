var express = require('express');
var router = express.Router();
var path = require('path');

// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../templates', 'home.html'));
});

router.get('/data_show',function(req, res, next){
    res.sendFile(path.join(__dirname, '../templates', 'data_show.html'));
});

router.get('/join_us',function(req, res, next){
    res.sendFile(path.join(__dirname, '../templates', 'join_us.html'));
});

router.get('/login',function(req, res, next){
    res.sendFile(path.join(__dirname, '../templates', 'login.html'));
});

router.get('/mascot',function(req, res, next){
    res.sendFile(path.join(__dirname, '../templates', 'mascot.html'));
});

router.get('/enrol',function(req, res, next){
    res.sendFile(path.join(__dirname, '../templates', 'preSign.html'));
});


router.get('/we_are',function(req, res, next){
    res.sendFile(path.join(__dirname, '../templates', 'we_are.html'));
});

module.exports = router;