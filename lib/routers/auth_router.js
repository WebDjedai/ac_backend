const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const upload = require('./../m_storage')
const pool = require('./../postgres_db')
const nodemailer = require('nodemailer')

const router = require('express').Router()

// Utils functions
async function sendVerifyEmailCode(req, res, next) {
	const secretCode = Math.floor(Math.random() * 1000000);

	let transporter = await nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'ld23mint@gmail.com',
			pass: 'spbr kvxd qlbo ekog',
		}
	});

	let mailDetails = {
		from: 'ld23mint@gmail.com',
		to: 'aleksej.merzlyakov.90@mail.ru',
		subject: 'Верификация вашего email адреса в приложении "Алсу"',
		text: `Добрый день! Ваш код для верификации email адреса при регистрации в приложении "Алсу": ${secretCode}`
	};

	await transporter.sendMail(mailDetails, (error, data) => {
		if(error) {
			console.log('Error send email')
		} else {
			console.log('Succsessfull send mail')
		}
	})

	req.locals.secretCode = secretCode;

	next()
}

router.post('/sign-up', async (req, res) => {
	const { surname, name, date_birth, email, password } = req.body

	const is_employee = false
	const is_admin = false

	const duplicateUser = await pool.query(`SELECT * FROM ac_users WHERE email = $1`,
		[email],
		(error, results) => {
			return results.rows
		})

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

router.get('/verify-email', sendVerifyEmailCode, (req, res) => {
	sendVerifyEmailCode()

	return res.status(200).json({
		secretCode: req.locals.secretCode,
		message: 'Проверте ваш почтовый ящик на наличие письма с кодом верификации email адреса'
	})
})

router.post('/verify-email', async (req, res) => {
	const secretCode = req.locals.secretCode

	if(req.body.code == secretCode) {
		return req.status(200).json({
			message: 'Ваш email адрес успешно верифицирован'
		})
	} else {
		return res.status(403).json({
			message: 'Неправильный код! Проверте правильность введенных данных'
		})
	}
})

router.post('/sign-in', (req, res) => {
	const { email, password } = req.body

	pool.query(`SELECT * FROM ac_users WHERE email = $1`, [email], (error, results) => {
		if(results.rows) {
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
})

module.exports = router