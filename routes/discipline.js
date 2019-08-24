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
    let result = await find('discipline', {
        username
    });
    res.send(result);
});


module.exports = router;