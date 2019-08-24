var express = require('express');
var router = express.Router();
// 引入自定义mongodb模块
const {
    find,
    insert,
    removeOne,
    updateOne,
    inc
} = require('../libs/db');

// 查询购物车表
router.get('/', async (req, res, next) => {
    let {
        username
    } = req.query;

    let result = await find('cart', {
        username
    });
    res.send(result);
})


// 添加记录
router.get('/insert', async (req, res, next) => {
    // 获取参数
    var {
        username,
        goodId,
        shopname,
        imgurl,
        price,
        title
    } = req.query;
    // 先查数据库是否已经存在该表项
    let result = await find('cart', {
        username,
        goodId,
    });
    let result1 = {};
    if (result.length == 1) {
        // 如果有就增加数量
        result1 = await inc('cart', {
            username,
            goodId,
        }, {
            goodNum: 1
        });
    } else {
        result1 = await insert('cart', [{
            username,
            goodId,
            goodNum: 1,
            shopname,
            imgurl,
            price,
            title
        }]);
    }
    if (result1.result.n == 1) {
        res.json({
            meg: '添加成功'
        })
    } else {
        res.json({
            meg: '添加失败'
        })
    }
});

// 增加或减少
router.get('/inc', async (req, res, next) => {
    //接收参数
    let {
        username,
        goodId,
        option
    } = req.query;
    let result = {};
    if (option == 'inc') {
        //增加
        result = await inc('cart', {
            username,
            goodId
        }, {
            goodNum: 1
        });
    } else if (option == 'dec') {
        //减少
        result = await inc('cart', {
            username,
            goodId,
        }, {
            goodNum: -1
        });
    }
    if (result.result.n == 1) {
        res.json({
            meg: '操作成功'
        })
    } else {
        res.json({
            meg: '操作失败'
        })
    }
});

// 删除记录
router.get('/del', async (req, res, next) => {
    // 获取参数
    let {
        username,
        goodId
    } = req.query;
    // 删除数据
    let result = await removeOne('cart', {
        username,
        goodId
    });
    if (result.result.n != 0) {
        res.json({
            meg: '删除成功'
        })
    } else {
        res.json({
            meg: '删除失败'
        })
    }
})

// 手动输入数量
router.get('/input', async (req, res, next) => {
    // 获取参数
    let {
        username,
        goodId,
        goodNum
    } = req.query;
    // 改变数量
    let result = await updateOne('cart', {
        username,
        goodId
    }, {
        'goodNum': parseInt(goodNum)
    });

    res.send(result)
    if (result.result.n) {
        res.json({
            meg: '操作成功'
        })
    } else {
        res.json({
            meg: '操作失败'
        })
    }



})



module.exports = router;