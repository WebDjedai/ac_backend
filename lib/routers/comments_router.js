const router = require('express').Router();
const pool = require('./../postgres_db');
const jwt = require('jsonwebtoken');

router.get('/:id/', async (req, res) => {
	const perPage = parseInt(req.query.page);
    const initPage = perPage - 1;
    const countArticles = 15;

	pool.query(`SELECT ac_comments.product_id, ac_users.image, ac_users.name, ac_users.surname, ac_comments.rate, ac_comments.body, ac_comments.date
		FROM ac_comments
		JOIN ac_users
		ON ac_users.id = ac_comments.user_id
		WHERE ac_comments.product_id = $1
		LIMIT $2 OFFSET $3`, [req.params.id, countArticles, initPage * countArticles], (error, results) => {
		if(error) {
			throw error
			return res.status(500).json({
				message: 'Проблема в работе сервера'
			})
		}

		return res.status(200).json(results.rows)
	})
})

router.post('/', (req, res) => {
    const decodeToken = jwt.verify(req.body.token, 'secret');
    const {productId, rate, body, date} = req.body

    pool.query(`INSERT INTO ac_comments (user_id, product_id, rate, body, date)
        VALUES ($1, $2, $3, $4, $5)`, [decodeToken.id, productId, rate, body, date], (error, results) => {
        if(error) {
            throw error
        }

        return res.status(200).json({
            message: 'Комментарий создан'
        })
    });
})

module.exports = router