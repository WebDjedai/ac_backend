const pool = require('./lib/postgres_db')

async function getData() {
	let data
	data = await pool.query('SELECT * FROM ac_products').then(i => i.rows)
	
	console.log(data)
}

console.log(getData())