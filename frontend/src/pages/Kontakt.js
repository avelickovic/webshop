import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, iink as RouterLink } from 'react-router-dom';
import Header from '../Header';
import './Onama.css';
import Footer from '../Footer';
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
		    <Header />

		     <h1 className='center'>Konakt</h1>
		      <div className='marg'>
		      <p>Adresa: Kardjordjeva 40 19300 Negotin
		      </p>
		      <p>
		      Broj telefona: 019543022
		      </p>
		      <p>
		      Mobilni telefon:0628267710
		      </p>
		      <p>
		      Email:nesto@gmail.com
		      </p>
		      <p>
		      PIB:102441233	
		      </p>
		      </div>
		     <Footer />
		  </ThemeProvider>
	  );};
