const Joi = require('joi')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const validate = require('../middleware/validate')

const validateAuth = request => {
	const schema = Joi.object({
		email: Joi.string().required().min(5).max(255).email(),
		password: Joi.string().required().min(5).max(255),
	})

	return schema.validate(request)
}

router.post('/', validate(validateAuth), async (req, res) => {
	// Use bcrypt to check if password matches
	const validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword) return res.status(400).send('Invalid email or password')

	// Genereate the JWT and store user's ID and return it to client
	const token = user.generateAuthToken()
	res.send(token)
})

module.exports = router
