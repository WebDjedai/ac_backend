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
                item.image = 'http://176.57.208.41:3000' + item.image
            }

            res.status(200).json(results.rows)
        });
})

router.post('/:id', async (req, res) => {
    let decodeToken = await jwt.verify(req.body.token, 'secret');

    let comment = await pool.query(`SELECT * FROM ac_comments
            WHERE ac_comments.user_id = $1
            AND ac_comments.product_id = $2`, [decodeToken.id, req.body.productId]).then(i => i.rows[0]);

    let data = await pool.query(`SELECT ac_products.id, ac_products.image, ac_products.title, ac_products.description, ac_products.price, ac_products.barcode, ac_products.discount_procent, ac_categories.title AS category
        FROM ac_products
        JOIN ac_categories
        ON ac_products.category_id = ac_categories.id
        WHERE ac_products.id = $1`, [req.params.id]).then(i => i.rows[0]);

    data.image = 'http://176.57.208.41:3000' + data.image;

    return res.status(200).json({
        ...data,
        comment: comment,
    })
})

module.exports = router