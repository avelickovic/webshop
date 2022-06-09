import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import {Typography,Grid,Card,CardContent,CardMedia} from '@mui/material';
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



export default function home() {
	return (

		<Box mt={9} mb={5}>
		<Grid container
		justifyContent="center"
		alignItems="center"> 
		<Typography variant="h2">
		Dobrodošli u Megatron
		</Typography>
		</Grid>
		<Box mt={9} mb={5}>
		<Grid container
		justifyContent="center"
		alignItems="center">
		<Card sx={{ maxWidth: 2000 }}>
		<CardMedia
		component="img"
		height="230"
		image="/pictures/home4.png"
		/>
		</Card>
		</Grid>
		</Box>
		</Box>
	);}



