import { AppBar, Container, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/system'
import VotesContainer from './components/VotesContainer'

const theme = createTheme({
	palette: {
		primary: {
			main: '#7C1415',
		},
		secondary: {
			main: '#FFC20F',
		},
		info: {
			main: '#693213',
		},
	},
})

const App = () => {
	const centerStyles = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	}

	const appBarStyles = {
		...centerStyles,
		padding: '20px 10px',
	}

	const contentStyles = {
		textAlign: 'center',
	}

	const footerStyles = {
		display: 'block',
		margin: '40px 0 10px',
	}

	const linkStyles = {
		textDecoration: 'none',
		color: '#333',
	}

	return (
		<ThemeProvider theme={theme}>
			<AppBar position="sticky" color="primary" sx={appBarStyles}>
				<Typography variant="h5" as="h1" color="secondary">
					Washington Football Is Life. Period.
				</Typography>
			</AppBar>
			<Container maxWidth="md" sx={contentStyles}>
				<Box mt={6}>
					<Typography variant="h2" color="initial" gutterBottom>
						Your Voice Matters!
					</Typography>
					<Typography variant="subtitle1" color="initial" gutterBottom>
						As you may have heard, there have been numerous instances of the white man becoming more
						policitally correct to cover up for their initial wrongdoings and crimes of humanity
						throughout American history. Many of these events revolve around all things American,
						sports entertainment. Now is your chance to influence these wrongdoers.
					</Typography>
					<Typography variant="subtitle1" color="info" sx={{ fontWeight: 'bold' }}>
						Vote on what you'd like to see the Washington Football Team, formerly the Washington
						Redskins, be named for the inforseeable future. Your voice matters on this hot topic of
						debate.
					</Typography>
				</Box>
				<VotesContainer />
				<Typography variant="body2" sx={footerStyles}>
					<small>
						&copy; 2021{' '}
						<a href="https://drewcook.dev" style={linkStyles}>
							DCDev
						</a>
					</small>
				</Typography>
			</Container>
		</ThemeProvider>
	)
}

export default App
