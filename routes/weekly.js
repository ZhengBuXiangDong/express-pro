var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');
// 引入自定义mongodb模块
const {
    find,
    insert
} = require('../libs/db');

/* GET users weekly */
router.get('/', async(req, res, next)=>{
    // 接收用户名
    let{username}=req.query;
    //查询
    let result = await find('weekly', {
        username
    });
    res.send(result);
});

/* insert users weekly. */
router.post('/insert', async (req, res, next) => {
    // 获取参数
    var {
        username,
        title,
        con,
        timer,
    } = req.body;
    
    let results = await insert('weekly', [{
        username,
        con,
        title,
        timer,
        status:'未读'
    }]);

    let {
        insertedCount
    } = results;
    if (insertedCount != 0) {
        res.send('yes');
    } else {
        res.send('no');
    }

});

module.exports = router;