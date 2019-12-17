const express = require('express')
const database = require('./mysql/database')//链接数据库


//创建实例
const app = express()

const membeRouter = require('./router/member.touter')
const skuRouter = require('./router/sku.router')


//中间件
function middle_ware(req, res, next) {
    let {age} = req.query;
    if (age < 20) {
    	res.json({
			code:200,
			info:"您年龄太小"
		})

    } else {
        next()
    }
}

app.all('*', middle_ware)


app.use('/member', membeRouter)
app.use('/sku', skuRouter)
//get请求
app.get('/names/:age', (req, res) => {
    let {age} = req.params;
    console.log(req.params);

})
//post请求
app.get('/name', (req, res) => {
    let {age} = req.params;
    database('select * from login', [], (err, data) => {
        if (err) {
            res.json({
                code: 101,
                info: '获取失败',
                data: err
            })
        }
        if (data) {
            res.json({
                code: 200,
                info: '获取成功',
                data: data
            })
        }
    })

})


//端口监听
app.listen(3000, () => {
    console.log('3000 端口启动成功了!！');
})