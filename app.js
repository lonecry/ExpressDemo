const express = require('express')
const mysql = require('mysql');

//连接数据库
var connection = mysql.createConnection({
	host        : 'bdm30037555.my3w.com',
	user        : 'bdm30037555',
	password    : '!swsun107wen2008',
	database    : 'bdm30037555_db',
	insecureAuth: true,     //加入此项可解决此错误！！！
	port        : '3306'     //端口号

})

connection.connect(function(err){
	if(err){
		console.log('---:'+err);
		return;
	}
	console.log('连接succeed');
});

/*connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
	if (err) {
		throw err;
	}
	;

	console.log('The solution is:', results[0].id); // 返回第一条记录的solution列的内容 });
})*/

//创建实例
const app = express()

const membeRouter = require('./router/member.touter')
const skuRouter = require('./router/sku.router')

app.use('/member', membeRouter)
app.use('/sku', skuRouter)
//get请求
app.get('/name/:age', (req, res) => {
	let {age} = req.params;
	console.log(req.params);
	res.json({
		methods: 'get',
		name   : "孙文",
		age
	})
})
//post请求
app.post('/name', (req, res) => {
	let {age} = req.params;
	res.json({
		methods: 'post',
		name   : "孙文"
	})
})


//端口监听
app.listen(3000, () => {
	console.log('3000 端口启动成功了!！');
})