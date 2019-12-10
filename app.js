const express = require('express')

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
        name: "孙文",
        age
    })
})
//post请求
app.post('/name', (req, res) => {
    let {age} = req.params;
    res.json({
        methods: 'post',
        name: "孙文"
    })
})


//端口监听
app.listen(3000, () => {
    console.log('3000 端口启动成功了!！');
})