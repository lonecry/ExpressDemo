const mysql = require('mysql');

const client = (sql, arg, callback) => {
	//1.创建连接
	let config = mysql.createConnection({
		host        : 'bdm30037555.my3w.com',
		user        : 'bdm30037555',
		password    : '!swsun107wen2008',
		database    : 'bdm30037555_db',
		insecureAuth: true,     //加入此项可解决此错误！！！
		port        : '3306'     //端口号
	})
	//2.开始连接
	config.connect()
	//3.对数据库进行增删查改
	config.query(sql, arg, (err, data) => {
		callback && callback(err, data)
	})
	//4.关闭数据库
	config.end()
}

module.exports = client;