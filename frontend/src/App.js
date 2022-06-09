import React, {useState} from 'react';

import { BrowserRouter, Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import UserAccount from "./components/UserAccount";
import Home from "./pages/Home";
import Kupovina from "./pages/Kupovina";
import Onama from "./pages/Onama";
import Kontakt from "./pages/Kontakt";
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

export default function App() {

	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("error");
	const [user, setUser] = useState("null");

	const handleAlertClose = (event, reason) =>
	{
		if(reason == "clickaway")
			return;

		setAlertOpen(false);
	}

	let stateProps =
	{
		p_user: user,
		loggedIn: () =>
		{
			if(user == "null")
				return false;

			return true;
		},
		SetUser: (new_user) =>
		{
			setUser(new_user);
		},
		SetAlert: (message, severity) =>
		{
			setAlertMessage(message);
			setAlertSeverity(severity);
			setAlertOpen(true);
		}
	}

	return (
		<BrowserRouter>
		<ThemeProvider theme={theme}>
		<Box sx={{ mb: 12 }}>
		<AppBar>
			<Toolbar>
				<Card sx={{ maxWidth: 150 }}>
					<CardMedia component="img" height="75" image="/pictures/logo1.jpg"/>
				</Card>
				<Button sx={{ml: "10px", mr: "10px"}}  variant="contained" component={RouterLink} to="/">Home</Button>
				<Button sx={{mr: "10px"}} variant="contained" component={RouterLink} to="/kupovina">Kupovina</Button>
				<Button sx={{mr: "10px"}} variant="contained" component={RouterLink} to="/kontakt">Kontakt</Button>
				<Box sx={{ flexGrow: 1 }} />
				<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
					<UserAccount stateProps={stateProps}/>
				</Box>
			</Toolbar>
		</AppBar>
		</Box>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/kupovina" element={<Kupovina stateProps={stateProps}/>}/>
			<Route path="/onama" element={<Onama/>}/>
			<Route path="/kontakt" element={<Kontakt/>}/>
		</Routes>

		<AppBar position="static">
			<Toolbar class="center">
				<Grid container class="center">
					<Typography component="h1" variant="h6" align="center">
						Megatron
					</Typography>
					<Typography variant="body2" color="text.secondary" align="center">
					{'Copyright '} 
					<Link component={RouterLink} to="/" color="inherit">
					Megatron
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}	
					</Typography>
				</Grid>
			</Toolbar>
		</AppBar>
		<Stack spacing={2} sx={{width: '100%'}}>
		<Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
		<Alert onClose={handleAlertClose} severity={alertSeverity} sx={{width: "100%"}}>
		{alertMessage}
		</Alert>
		</Snackbar>
		</Stack>
		</ThemeProvider>
		</BrowserRouter>
	);


};





