const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const upload = require('./../m_storage')
const pool = require('./../postgres_db')
const nodemailer = require('nodemailer')

const router = require('express').Router()

router.post('/sign-up', async (req, res) => {
	const { surname, name, date_birth, email, password } = req.body

	const is_employee = false
	const is_admin = false

	const duplicateUser = await pool.query(`SELECT * FROM ac_users WHERE email = $1`,
		[email]).then(i => i.rows[0])

	if(duplicateUser) {
		return res.status(403).json({
			message: 'Пользователь с таким Email уже существует'
		})
	}

	var image = '/users-imgs/empty-user.png';

	const jwtToken = await jwt.sign({
		email: email,
		password: password,
	}, 'secret', { expiresIn: '30d' })

	await pool.query(`INSERT INTO ac_users(image, name, surname, date_birth, email, password, is_employee, is_admin)
		VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
		[image, surname, name, date_birth, email, password, is_employee, is_admin],
		(error, results) => {
			if(error) {
				throw error
			}
			
			return res.status(200).json({
				token: jwtToken,
				message: 'Вы успешно зарегестрировались'
			})
		}
		);
})

router.post('/sign-in', (req, res) => {
	const { email, password } = req.body

	if(email != null && password != null && email != undefined && password != undefined) {
		pool.query(`SELECT * FROM ac_users WHERE email = $1`, [email], (error, results) => {
			if(results.rows[0]) {
				if(results.rows[0].password == password) {
					const jwtToken = jwt.sign({
						id: results.rows[0].id,
						email: email,
						password: password,
					}, 'secret', { expiresIn: '30d' })

					return res.status(200).json({
						token: jwtToken,
						success: true,
					})
				} else {
					return res.status(403).json({
						message: 'Неправильно введенный Email или пароль'
					})
				}
			} else {
				return res.status(404).json({
					message: 'Пользователь не найден'
				})
			}
		})
	} else {
		return res.status(404).json({
			message: "Неверно введен Email или пароль"
		})
	}
})

module.exports = router