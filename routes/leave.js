var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');
// 引入自定义mongodb模块
const {
    find,
    insert
} = require('../libs/db');

/* GET users question. */
router.get('/', async(req, res, next)=>{
    // 接收用户名
    let{username}=req.query;
    //查询
    let result = await find('leave', {
        username
    });
    res.send(result);
});

/* insert users question. */
router.post('/insert', async (req, res, next) => {
    // 获取参数
    var {
        con,
        username,
        leaveTime,
        timer,
    } = req.body;
    
    let results = await insert('leave', [{
        con,
        username,
        leaveTime,
        timer,
        headmaster:'待审批',
        lecturer:'待审批',
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