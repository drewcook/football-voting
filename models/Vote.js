const Joi = require('joi')
const mongoose = require('mongoose')

const validateVote = vote => {
	const schema = Joi.object({
		voter_ip: Joi.string(),
		team_name: Joi.string().required().min(3).max(100),
		created_at: Joi.date(),
	})

	return schema.validate(vote)
}

const voteSchema = new mongoose.Schema({
	vote_id: {
		type: String,
	},
	voter_ip: {
		type: String,
		required: true,
	},
	team_name: {
		type: String,
		required: true,
		trim: true,
		minLength: 3,
		maxLength: 100,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
})

const Vote = mongoose.model('Vote', voteSchema)

module.exports = {
	Vote,
	validate: validateVote,
}
