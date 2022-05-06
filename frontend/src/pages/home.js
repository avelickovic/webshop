
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
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

<div>
	<Header />
	<Grid container
	  justifyContent="center"
	  alignItems="center"> 
	<Typography variant="h2">
	          Dobrodošli u Megatron
	</Typography>
	</Grid>
	<Grid container
	          justifyContent="center"
	          alignItems="center">
	<Card sx={{ maxWidth: 915 }}>
	                          <CardMedia
	                          component="img"
	                          height="230"
	                          image="/pictures/home.png"
	                          />
	</Card>
	</Grid>
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
	<Footer />
     
</div>
);}



