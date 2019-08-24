var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// 引入自定义mongodb模块
const {
    find,
    insert
} = require('../libs/db');

// 引入token
const {
    createToken,
    decodeToken,
    checkToken
} = require('../libs/token');

router.use(bodyParser.urlencoded({
    extended: false
}));
let isok = false;
// 登录
router.post('/login', async (req, res, next) => {
    // 获取参数
    var {
        username,
        password,
        tokenCode,
    } = req.body;
    // 有token，不是第一次登录
    if (tokenCode) {
        const obj = decodeToken(tokenCode);
        if (obj) {
            res.json({
                meg: '登录成功',
                data: obj.payload.data
            })
        } else {
            res.json({
                meg: '登录失败'
            })
        }
    } else {
        // 第一次登录
        let result = await find('students', {
            name: username,
            password: password
        });
        // console.log(result.length);
        if (result.length !== 0) {
            // 数据库验证成功，产生token
            const token = createToken({
                username
            }, 300);
            res.json({
                meg: '登录成功',
                username,
                token
            });
        } else {
            res.send({
                meg: '登录失败'
            });
        }
    }

    // let result = await find();
});

// 注册
router.post('/register', async (req, res, next) => {
    // 获取参数
    var {
        username,
        password
    } = req.body;
    let result1 = await find('students', {
        name: username
    });
    // console.log(result1.length);
    if (result1.length === 0) {
        let results = await insert('students', [{
            name: username,
            password: password
        }]);
        // console.log(result);
        let {
            insertedCount
        } = results;
        if (insertedCount != 0) {
            res.send('yes');
        } else {
            res.send('no');
        }
    } else {
        res.send('no');
    }


});

router.get('/checkName', async (req, res, next) => {
    // 获取参数
    let name = req.url.split('=')[1];
    let result = await find('students', {
        name: name
    });

    if (result.length !== 0) {
        res.send('no');
    } else {
        res.send('yes');
    }
});

module.exports = router;