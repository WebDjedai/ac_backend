const pool = require('./../postgres_db');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    const perPage = parseInt(req.query.page);
    const initPage = perPage - 1;
    const countArticles = 10;

    pool.query(`SELECT ac_products.id, ac_products.image, ac_products.title, ac_products.description, ac_products.price, ac_products.barcode, ac_products.discount_procent, ac_categories.title AS category
        FROM ac_products
        JOIN ac_categories
        ON ac_products.category_id = ac_categories.id
        LIMIT $1 OFFSET $2`, [countArticles, initPage * countArticles], (error, results) => {
            if (error) {
                throw error
            }

            for(item of results.rows) {
                item.image = 'http://10.0.2.2:3000' + item.image
            }

            res.status(200).json(results.rows)
        });
})

router.post('/:id', (req, res) => {
    pool.query(`SELECT ac_products.id, ac_products.image, ac_products.title, ac_products.description, ac_products.price, ac_products.barcode, ac_products.discount_procent, ac_categories.title AS category
        FROM ac_products
        JOIN ac_categories
        ON ac_products.category_id = ac_categories.id
        WHERE ac_products.id = $1`, [req.params.id], (error, results) => {
            if (error) {
                throw error
            }

            results.rows[0].image = 'http://10.0.2.2:3000' + results.rows[0].image

            res.status(200).json({
                ...results.rows[0],
            })
        });
})

module.exports = router