var express = require('express');
var router = express.Router();
// 引入自定义mongodb模块
const {
  find,
  ObjectId,
  insert,
  removeOne,
  updateOne,
  inc
} = require('../libs/db');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 测试update
router.get('/update', async (req, res, next) => {
  let {
    username,
    goodId
  } = req.query;
  console.log(username, goodId);
  let result1 = await inc('cart', {
    username,
    goodId
  }, {
    goodNum: 1
  });
  res.send(result1.n);
});
module.exports = router;