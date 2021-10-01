const express = require('express')
const logError = require('../middleware/logError')
const users = require('../routes/users')
const auth = require('../routes/auth')
const votes = require('../routes/votes')
const path = require('path')

const setupRoutes = app => {
	// Built-in Express middleware
	// parses req.body
	app.use(express.json())
	// key=value&key=value, parses this and populates req.body in json
	app.use(express.urlencoded({ extended: true }))
	// Serve up our React client app
	app.use(express.static(path.join(__dirname, '../client/build/index.html')))

	// Setup API routes
	app.use('/api/users', users)
	app.use('/api/auth', auth)
	app.use('/api/votes', votes)

	// Default to serving our React client app
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'))
	})

	// Custom middleware functions, called in sequence
	// always define in separate file from index.js
	// Add in error handling middleware LAST after API middleware
	// We will use next(ex) in catch blocks to call this
	app.use(logError)
}

module.exports = setupRoutes
