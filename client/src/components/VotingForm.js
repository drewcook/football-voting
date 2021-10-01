import { Button, CircularProgress, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import PropTypes from 'prop-types'

const VotingForm = props => {
	const { onSubmit, onChange, teamName, loading, errors, successMsg } = props

	const successMsgStyles = {
		color: '#66bb6a',
		fontWeight: 700,
	}

	return (
		<Box mt={5}>
			<Paper elevation={2}>
				<Box p={4}>
					<Typography variant="h5" color="initial">
						What would you like to see the football team currently located in the US capitol city of
						Washington D.C. be named for the inforseeable future?
					</Typography>
					<Box mb={2} />
					<Typography variant="overline" color="initial">
						You will not be judged (unlikely)
					</Typography>
					<Box mb={4} />
					<form onSubmit={onSubmit}>
						<TextField
							id="filled-basic"
							label="Team Name"
							placeholder="Red-Bloods, Insurrectionists, Whiteys, etc."
							variant="filled"
							color="info"
							onChange={onChange}
							value={teamName}
							disabled={loading}
							fullWidth
						/>
						<Box mb={3} />
						<Button
							variant="contained"
							color={loading ? 'secondary' : 'primary'}
							fullWidth
							type="submit"
							size="large"
							disabled={teamName === '' || loading}
						>
							{loading ? (
								<CircularProgress color="info" size={32} />
							) : (
								<Typography variant="h6" color={teamName === '' ? 'default' : 'secondary'}>
									Vote!
								</Typography>
							)}
						</Button>
						{errors &&
							errors.map(error => (
								<Box mt={2} key={error}>
									<Typography variant="body2" color="error">
										{error}
									</Typography>
								</Box>
							))}
						{successMsg && (
							<>
								<Box mt={2} />
								<Typography variant="overline" sx={successMsgStyles}>
									{successMsg}
								</Typography>
							</>
						)}
					</form>
				</Box>
			</Paper>
		</Box>
	)
}

VotingForm.propTypes = {
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	teamName: PropTypes.string,
	loading: PropTypes.bool.isRequired,
	errors: PropTypes.oneOf([PropTypes.string, PropTypes.shape({})]),
	successMsg: PropTypes.string,
}

VotingForm.defaultProps = {
	teamName: '',
	errors: undefined,
	successMsg: undefined,
}

export default VotingForm
