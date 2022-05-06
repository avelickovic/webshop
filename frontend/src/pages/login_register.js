import {React, useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { BrowserRouter, Routes, Route, Link as RouterLink, Navigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright  '}
		<Link color="inherit" href="https://mui.com/">
		Your Website
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
		</Typography>
	);
}

const theme=createTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#54dcd8',
		},
		secondary: {
			main: '#f50057',
		},
	},
})

export default function SignIn() {

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const jsondata = {
			email: data.get('email'),
			password: data.get('password'),

		}

		fetch('/kupci/login',
		{
			method:"post",
			headers:{"Content-Type":"application/json"}, 
			body:JSON.stringify(jsondata),
		}).then(response => response.json()).then(data =>
		{
			console.log(data);
			if(data.success)
			{
				localStorage.setItem("token", data.token);
				setRedirect(true);
			}
			else
			{
				setErrorState(data.reason);
				setAlertOpen(true);
			}
		});

	}

	const [alertOpen, setAlertOpen] = useState(false);
	const [errorState, setErrorState] = useState("");
	const [redirect, setRedirect] = useState(false);

	const handleAlertClose = (event, reason) =>
	{
		if (reason == "clickaway")
			return;

		setAlertOpen(false);
	};


	return (
		<ThemeProvider theme={theme}>
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<Box
		sx={{
			marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
		}}
		>
		<Typography component="h1" variant="h3">
		Megatron
		</Typography>
		<Typography component="h1" variant="h5">
		Log in
		</Typography>
		<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
		<TextField
		margin="normal"
		required
		fullWidth
		id="email"
		label="Email"
		name="email"
		autoComplete="email"
		autoFocus
		/>
		<TextField
		margin="normal"
		required
		fullWidth
		name="password"
		label="Password"
		type="password"
		id="password"
		autoComplete="current-password"
		/>
		<Button
		type="submit"
		fullWidth
		variant="contained"
		sx={{ mt: 3, mb: 2 }}
		>
		Log in 
		</Button>
		<Button
		type="submit"
		fullWidth 
		variant="contained"
		color="secondary"
		component={RouterLink} to="/register"
		sx={{ mt: 3, mb: 2 }}
		>
		Register
		</Button>
		<Grid container>


		<Button
		type="submit"
		fullWidth
		variant="contained"
		sx={{ mt: 3, mb: 2 }}
		component={RouterLink} to="/home"
		>
		Probai
		</Button>
		</Grid>
		</Box>
		</Box>
		</Container>
		<Stack spacing={2} sx={{width: '100%'}}>
			<Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
				<Alert onClose={handleAlertClose} severity="error" sx={{width: '100%'}}>
				{errorState}
				</Alert>
			</Snackbar>
		</Stack>
		{
			redirect &&
			<Navigate to="/home"/>
		}
		</ThemeProvider>
	);}
