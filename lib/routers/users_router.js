const router = require('express').Router()
const db = require('./../data.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/:id', (req, res) => {
	const id = req.params.id

	let user = db.users.filter(item => {
		if (item.id == id) {
			return item
		} else {
			return false
		}
	})

	return res.status(200).json(user)
})

router.post('/sign-up', async (req, res) => {
	let user = {
		id: db.users.length + 1,
		imageURL: '',
		name: req.body.name,
		surname: req.body.surname,
		data_birth: '',
		email: req.body.email,
		password: req.body.password,
		is_employee: false,
		is_admin: false,
	}

	db.users.push(user);

	return res.status(200).json({
		message: 'You sing-up in app'
	})
})

router.get('/sign-in', (req, res) => {
	let isVerify = false;

	let user = db.users.filter(item => {
		if (req.body.password == item.password && req.body.email == item.email) {
			isVerify = true
		} else {
			res.status(403).json({
				message: 'You enter invalid data'
			})
		}
	})

	return res.status(200).json({
		is_verify: isVerify
	})
})

router.get('/:id/favorites', (req, res) => {
	let user = db.users.filter(item => {
		if (item.id == req.params.id) {
			return item
		} else {
			return false
		}
	})

	let favorites = db.favorites.filter(item => {
		if (user.id == item.user_id) {
			return item
		} else {
			return false
		}
	})

	let favProducts = db.products.filter(item => {
		for(fav of favorites) {
			if (fav.product_id == item.id) {
				return item
			} else {
				false
			}
		}		
	})

	res.status(200).json(favProducts)
})

module.exports = router