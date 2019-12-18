const express = require('express')
const router = express.Router()
var cookieParser = require('cookie-parser');
const database = require('../mysql/database')//链接数据库
router.use(cookieParser());
router.get('/list/:name', (req, res) => {
    let {age} = req.query;
    let {name} = req.params;
    console.log(name);

    res.cookie('age', age); // 设置cookie,express原生可以用
    res.cookie('name', name); // 设置cookie,express原生可以用
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


module.exports = router