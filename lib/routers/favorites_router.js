const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('./../postgres_db')

router.post('/', async (req, res) => {
	const decodeToken = await jwt.verify(req.body.token, 'secret');
	const perPage = parseInt(req.query.page);
	const initPage = perPage - 1;
	const countArticles = 2;

	await pool.query(`SELECT * FROM ac_products
		JOIN ac_favorites
		ON ac_products.id = ac_favorites.product_id
		WHERE ac_favorites.user_id = $1
		LIMIT $2 OFFSET $3`, [decodeToken.id, countArticles, initPage * countArticles], (error, results) => {
			if(error) {
				return res.status(500).json({
					message: 'Ошибка!'
				})
			}

			for(item of results.rows) {
				item.image = 'http://10.0.2.2:3000' + item.image
			}

			return res.status(200).json(results.rows)
		})
});

module.exports = router;