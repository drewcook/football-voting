import axios from 'axios'
import { useEffect, useState } from 'react'
import VotesTable from './VotesTable'
import VotingForm from './VotingForm'

const VotesContainer = () => {
	// Form
	const [teamName, setTeamName] = useState('')
	const [formLoading, setFormLoading] = useState(false)
	const [formErrors, setFormErrors] = useState(null)
	const [successMsg, setSuccessMsg] = useState(null)
	// Results
	const [resultsLoading, setResultsLoading] = useState(true)
	const [resultsError, setResultsError] = useState(null)
	const [results, setResults] = useState(null)

	useEffect(() => {
		fetchResults()
	}, [])

	const fetchResults = () => {
		// Fetch results, create loading UX
		setTimeout(() => {
			axios
				.get(`${process.env.REACT_APP_API_BASE_URL}/votes`)
				.then(res => setResults(res.data))
				.catch(() => setResultsError('An error occurred retrieving the voting results'))
				.finally(() => setResultsLoading(false))
		}, 1000)
	}

	const handleSubmit = e => {
		e.preventDefault()
		setSuccessMsg(null)
		setFormLoading(true)
		// Create some kind of loading experience
		setTimeout(() => {
			axios
				.post(`${process.env.REACT_APP_API_BASE_URL}/votes`, { teamName })
				.then(res => {
					setSuccessMsg("Success! You've casted your vote!")
					setTeamName('')
					// Add to top of results state
					setResults([res.data, ...results])
				})
				.catch(err => {
					const errors = err.response?.data
					if (errors) {
						if (typeof errors === 'string') setFormErrors([errors])
						if (typeof errors === 'object') setFormErrors(Object.values(errors).map(e => e.message))
					} else {
						setFormErrors(['An error occurred'])
					}
				})
				.finally(() => setFormLoading(false))
		}, 1000)
	}

	const handleChange = e => {
		if (formErrors) setFormErrors(null)
		setTeamName(e.target.value)
	}

	return (
		<>
			<VotingForm
				onChange={handleChange}
				onSubmit={handleSubmit}
				teamName={teamName}
				loading={formLoading}
				errors={formErrors}
				successMsg={successMsg}
			/>
			<VotesTable loading={resultsLoading} error={resultsError} results={results} />
		</>
	)
}

export default VotesContainer
