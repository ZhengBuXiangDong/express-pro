添加数据
url：http://localhost:3000/cart/insert?username=max&goodId=02
请求方式：get
参数：{ 
username：‘字符串’，
goodId：‘01’（字符串），
shopname,
imgurl,
price,
title
}

增加或删除
url：http://localhost:3000/cart/inc
请求方式：get
参数：{ 
username：‘字符串’，
goodId：‘01’（字符串），
option：inc(加）/dec（减）
}

返回数据：meg


//删除一条记录
url：http://localhost:3000/cart/del
请求方式：get
参数：{ 
username：‘字符串’，
goodId：‘01’（字符串）
}
返回数据：meg


//手动输入数量
url：http://localhost:3000/cart/input
请求方式：get
参数：{ 
username：‘字符串’，
goodId：‘01’（字符串），
goodNum：‘2’（数字int）
}
返回数据：meg



//查询购物车表
url：http://localhost:3000/cart
请求方式：get
参数{
username：‘字符串’
}
返回数据：查询结果集（一个json字符串）




