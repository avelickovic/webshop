
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, iink as RouterLink } from 'react-router-dom';
import login_register from  './pages/login_register.js';
import home from "./pages/home.js";
import register from "./pages/register";
import Kupovina from './pages/Kupovina';
import Onama from './pages/Onama';
import Kontakt from './pages/Kontakt';

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

	return (
      		
	<BrowserRouter>


		<Routes>
		<Route path="/" element={login_register()}/>
		<Route path="/home" element={home()}/>
		<Route path="/register" element={register()}/>
		<Route path="/home/Kupovina" element={Kupovina()}/>
		<Route path="/home/Onama" element={Onama()}/>
		<Route path="/home/Kontakt" element={Kontakt()}/>
		</Routes>


	</BrowserRouter>
	);
		

};



		

