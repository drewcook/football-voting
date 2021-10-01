const { Vote, validate: validateVote } = require('../models/Vote')
const _ = require('lodash')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const votes = await Vote.find().sort({ created_at: 'desc' })
		res.status(200).send(votes)
	} catch (ex) {
		res.status(500).send(ex.errors)
	}
})

router.post('/', async (req, res) => {
	// Prevent same IP from submitting more than once
	// let vote = await Vote.findOne({ voter_ip: req.ip })
	// if (vote) return res.status(400).send('Voter has already voted.')

	try {
		const payload = {
			voter_ip: req.ip,
			team_name: req.body.teamName,
			created_at: new Date(),
		}
		// validate
		const results = validateVote(payload)
		if (results.error) res.status(400).send(results.error.details)

		// create new record and save
		vote = new Vote(payload)
		await vote.save()
		res.status(200).send(_.pick(vote, ['_id', 'voter_ip', 'team_name', 'created_at']))
	} catch (ex) {
		res.status(500).send(ex.errors)
	}
})

module.exports = router
