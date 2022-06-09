import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, iink as RouterLink } from 'react-router-dom';
import './Onama.css';
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



export default function Kontakt() {
	  return (
		   <ThemeProvider theme={theme}>
	      	      <Typography component="h1" variant="h4" align="center">
			Kontakt
		      </Typography>
		      <div className='marg'>
		      <p>Adresa:
		      </p>
		      <p>
		  	 Kardjordjeva 40 19300 Negotin
		      </p>
		      <p>
		      Broj telefona:
		      </p>
		      <p>
		      019543022
		      </p>
		      <p>
		      Mobilni telefon:
		      </p>
		      <p>
		      0628267710
		      </p>
		      <p>
		      Email:
		      </p>
		      <p>
		      megatron@gmail.com
		      </p>
		      <p>
		      PIB:
		      </p>
		      <p>
		      102441233	
		      </p>
		      </div>
		  </ThemeProvider>
	  );};
