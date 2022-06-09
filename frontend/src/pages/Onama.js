
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Button from '@mui/material/Button';
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



export default function Onama() {
  return (
 <ThemeProvider theme={theme}>

   <h1 className='center'>O nama</h1>
    <div className='marg'>
    <p>Naša firma relativno nova na tržištu i bavimo se prodajom na malo i veliko raznih proizvoda različite namene.
    </p>
    <p>	  
    Trudimo se da našim kupcima olakšamo kupovinu najviše moguće, za naše kupce biramo najkvlaitetnije proizvode po najnižim cenama.  
    </p>
    </div>
</ThemeProvider>
);};
