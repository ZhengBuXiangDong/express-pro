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
// 注册和登录
// router.post('/login', async (req, res, next) => {
//     // 获取参数
//     var {
//         username,
//         password,
//         tokenCode,
//     } = req.body;
//     // 有token，不是第一次登录
//     if (tokenCode) {
//         const obj = decodeToken(tokenCode);
//         if (obj) {
//             res.json({
//                 meg: '登录成功',
//                 status: 1,
//                 username: obj.payload.data.username
//             })
//         } else {
//             res.json({
//                 meg: '登录失败',
//                 status: 0
//             })
//         }
//     } else {
//         // 第一次登录
//         // 先查看数据库里有没有用户
//         let result1 = await find('students', {
//             name: username,
//         });
//         if (result1.length == 0 && username && password) {
//             // 没有，创建用户
//             let insertResult = await insert('students', [{
//                 name: username,
//                 password: password
//             }]);

//             let {
//                 insertedCount
//             } = insertResult;

//             if (insertedCount == 0) {
//                 res.send({
//                     meg: '登录失败',
//                     status: 0
//                 });
//             }
//         }
//         // 创建好了或者用户名存在
//         let result = await find('students', {
//             name: username,
//             password: password
//         });
//         // console.log(result.length);
//         if (result.length !== 0) {
//             // 数据库验证成功，产生token
//             const token = createToken({
//                 username
//             }, 300);
//             res.json({
//                 meg: '登录成功',
//                 username,
//                 token,
//                 status: 1
//             });
//         } else {
//             res.send({
//                 meg: '登录失败',
//                 status: 0
//             });
//         }
//     }

//     // let result = await find();
// });

// 登录
router.post('/login', async (req, res, next) => {
    // 获取参数
    var {
        username,
        password,
        tokenCode
    } = req.body;
    // 有token，不是第一次登录
    if (tokenCode) {
        const obj = decodeToken(tokenCode);
        if (obj) {
            res.json({
                meg: '登录成功',
                status: 1,
                username: obj.payload.data.username
            })
        } else {
            res.json({
                meg: '登录失败',
                status: 0
            })
        }
    } else {
        //没有token，是第一次登录
        //查询数据库
        let results = await find('students', {
            name: username,
            password: password
        });
        //用户名密码验证成功
        if (results.length !== 0) {
            // 数据库验证成功，产生token
            const token = createToken({
                username
            }, 300);
            res.json({
                meg: '登录成功',
                username,
                token,
                status: 1
            });
        } else {
            res.send({
                meg: '登录失败',
                status: 0
            });
        }
    }



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

//检查用户名
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