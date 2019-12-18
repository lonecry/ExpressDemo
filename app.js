const express = require('express')
var cookieParser = require('cookie-parser');


//创建实例
const app = express()

const membeRouter = require('./router/member.touter')
const skuRouter = require('./router/sku.router')


//中间件
function middle_ware(req, res, next) {
	let {age} = req.query;
	if (age < 20) {
		res.json({
			code: 200,
			info: "您年龄太小"
		})

	} else {
		next()
	}
}

//app级别中间件
app.all('*', middle_ware)

//第三方中间件
app.use(cookieParser());
app.get('/member/', function (req, res, next) {
	const {age} = req.query
	console.log(req.cookies); // 解析过的object的形式--{ k1: 'v1', k2: 'v2' }。引入了cookie-parser方可使用
	console.log(req.headers.cookie);// string的形式--k1=v1; k2=v2。express原生可以用
	res.cookie( age); // 设置cookie,express原生可以用
	// next()
    res.send('cookie example');

})

//应用路由
app.use('/member', membeRouter)
app.use('/sku', skuRouter)


//端口监听
app.listen(3000, () => {
	console.log('3000 端口启动成功！');
})


