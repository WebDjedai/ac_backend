const router = require('express').Router()
const pool = require('./../postgres_db')

router.get('/', async (req, res) => {
    pool.query(`SELECT * FROM ac_categories
    	ORDER BY id`, [], (error, results) => {
        if (error) {
            throw error
        }

        for(item of results.rows) {
        	item.image = 'http://10.0.2.2:3000' + item.image
        }

        res.status(200).json(results.rows)
    });
})

router.get('/:id/', async (req, res) => {
    const perPage = parseInt(req.query.page);
    const initPage = perPage - 1;
    const countArticles = 2;

    pool.query(`SELECT ac_products.id, ac_products.image, ac_products.title, ac_products.description, ac_products.price, ac_products.barcode, ac_products.discount_procent, ac_categories.title AS category
    	FROM ac_products
    	JOIN ac_categories
    	ON ac_products.category_id = ac_categories.id
    	WHERE ac_products.category_id = $3
    	LIMIT $1 OFFSET $2`, [countArticles, initPage * countArticles, req.params.id], (error, results) => {
        if (error) {
            throw error
        }

        for(item of results.rows) {
        	item.image = 'http://10.0.2.2:3000' + item.image
        }

        res.status(200).json(results.rows)
    });
});

module.exports = router