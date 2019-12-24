const express = require('express')

var cookieParser = require('cookie-parser');
const models = require("./models/index")
//models.User


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


app.get('/create', async (req, res) => {
	let {name} = req.query
	let user = await models.User.create({name})

	res.json({
		message: '创建成功',
		user
	})
})
app.get('/getlist', async (req, res) => {
	let list = await models.User.findAll()
	res.json({
		message: '查询成功',
		list
	})
})
app.get('/gedetail/:id', async (req, res) => {
	let {id} = req.params
	let list = await models.User.findOne({
		where: {
			id
		}
	})
	res.json({
		message: '查询成功',
		list
	})
})


//应用路由
app.use('/member', membeRouter)
app.use('/sku', skuRouter)
app.get('/middle', function (req, res, next) {
	const {age} = req.query
	console.log(age);
	console.log(req.cookies); // 解析过的object的形式--{ k1: 'v1', k2: 'v2' }。引入了cookie-parser方可使用
	console.log(req.headers.cookie);// string的形式--k1=v1; k2=v2。express原生可以用

	res.cookie('age', age)
	// next()
	res.send('cookie example');

})
app.all('/*', (req, res) => {
	res.json({
		message: 'Api Not found,please check again!',
	})
})

//端口监听
app.listen(3000, () => {
	console.log('3000 端口启动成功！');
})


