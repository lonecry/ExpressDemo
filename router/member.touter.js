const express = require('express')
const router = express.Router()

const database = require('../mysql/database')//链接数据库

router.get('/list', (req, res) => {
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


module.exports = router