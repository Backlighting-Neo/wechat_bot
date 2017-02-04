const fs = require('fs');
// const mysql = require('mysql');

// const connection = mysql.createConnection({
// 	host: '106.186.30.104',
// 	port: 12845,
// 	user: 'root',
// 	password: 'tangzongchao',
// 	database: 'wechat_bot',
// 	charset: 'utf8mb4'
// })

const router = {
	tjyy8: require('./src/tjyy8'),
};

// connection.connect(err=>{
// 	if(err) console.log(err);
// });

var type = 5;
router.tjyy8.getList(type)
.then(res=>{
	return Promise.all(res.map(performace=>{
		return router.tjyy8.getDetail(performace.id)
		.then(res=>({
			performance_id: performace.id,
			performance_type: type,
			performance_name: performace.name,
			performance_price: performace.money,
			performance_time: performace.time,
			performance_detail: res
		}))
	}))
})
.then(res=>{
	console.log(res.length);
	var sql = res.map(performace=>{
		return `Insert Into \`tjyy8_performance\`
		(\`${Object.keys(performace).join('`,`')}\`)
		Values (${Object.keys(performace).map(key=>'\''+(performace[key].replace?performace[key].replace(/\'/g, '\\\'')+'\'':performace[key])).join(',')});`
	}).join('\n');
	
	fs.writeFileSync(`./sql.txt`, sql, 'utf-8');

	// connection.query(sql, (error, results, fields)=>{
	// 	console.log(error);
	// 	console.log(results);
	// });
})