const express = require('express')
const logError = require('../middleware/logError')
const auth = require('../routes/auth')
const votes = require('../routes/votes')
const path = require('path')

const setupRoutes = app => {
	// Serve up our React client app
	const clientAppRoot = path.join(__dirname, '../client/build')
	app.use(express.static(clientAppRoot))

	// Built-in Express middleware
	// parses req.body
	app.use(express.json())
	// key=value&key=value, parses this and populates req.body in json
	app.use(express.urlencoded({ extended: true }))

	// Setup API routes
	app.use('/api/auth', auth)
	app.use('/api/votes', votes)

	// Default to serving all other requests through our React client app
	app.get('*', (req, res) => {
		res.sendFile(clientAppRoot)
	})

	// Custom middleware functions, called in sequence
	// always define in separate file from index.js
	// Add in error handling middleware LAST after API middleware
	// We will use next(ex) in catch blocks to call this
	app.use(logError)
}

module.exports = setupRoutes
