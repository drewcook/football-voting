import {
	Box,
	CircularProgress,
	Divider,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

const VotesTable = props => {
	const { loading, error, results } = props

	return (
		<Box mt={5}>
			<Divider />
			<Box mt={5} />
			<Typography variant="h4" color="default">
				Voting Results
			</Typography>
			<Box mb={3} />
			<TableContainer component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Voter IP Address</TableCell>
							<TableCell align="right">Team Name</TableCell>
							<TableCell align="right">Submitted On</TableCell>
						</TableRow>
					</TableHead>
					{loading ? (
						<TableBody>
							<TableRow>
								<TableCell colSpan="3">
									<Box py={3} display="flex" alignItems="center" justifyContent="center">
										<CircularProgress color="primary" size={30} />
									</Box>
								</TableCell>
							</TableRow>
						</TableBody>
					) : (
						<TableBody>
							{error ? (
								<TableRow>
									<TableCell colSpan={3}>
										<Box display="flex" alignItems="center" justifyContent="center">
											<Typography variant="overline" color="error">
												{error}
											</Typography>
										</Box>
									</TableCell>
								</TableRow>
							) : results.length === 0 ? (
								<TableRow>
									<TableCell colSpan={3}>
										<Box display="flex" alignItems="center" justifyContent="center">
											<Typography variant="overline" color="info">
												There are currently no votes. Be the first to cast one!
											</Typography>
										</Box>
									</TableCell>
								</TableRow>
							) : (
								results.map(row => (
									<TableRow
										key={row._id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{row.voter_ip}
										</TableCell>
										<TableCell align="right">{row.team_name}</TableCell>
										<TableCell align="right">
											{format(new Date(row.created_at), 'MM/dd/yyyy @ hh:mm aaa')}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					)}
				</Table>
			</TableContainer>
		</Box>
	)
}

VotesTable.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.string,
	results: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			voter_ip: PropTypes.string.isRequired,
			team_name: PropTypes.string.isRequired,
			created_at: PropTypes.string.isRequired,
		}),
	),
}

VotesTable.defaultProps = {
	error: undefined,
	results: [],
}

export default VotesTable
