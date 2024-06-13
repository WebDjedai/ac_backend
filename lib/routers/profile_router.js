const router = require('express').Router();
const pool = require('./../postgres_db');
const jwt = require('jsonwebtoken');
const uploadAvatar = require('./../multer_upload_avatar');

router.post('/', async (req, res) => {
	try {
		decodeToken = await jwt.verify(req.body.token, 'secret');

		await pool.query(`SELECT * FROM ac_users WHERE email = $1`, [decodeToken.email], (error, results) => {
			if(error) {
				throw error
			}

			if(!results.rows) {
				return res.status(404).json({
					message: "Профиля не существует",
					success: false,
				})
			}

			results.rows[0].image = 'http://10.0.2.2:3000' + results.rows[0].image;

			return res.status(200).json({
				...results.rows[0],
				success: true,
			})
		})
	} catch (e) {
		return res.status(500).json({
			message: 'Невозможно получить данные. Повторите попытку'
		})
	}
})

router.post('/upload-img', uploadAvatar.single('avatar'), (req, res) => {
	const { filename, path, size, originalName } = req.file;

	return res.status(200).json({
		...req.file
	})
})

module.exports = router