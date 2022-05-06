
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink}  from 'react-router-dom';
import Grid from '@mui/material/Grid';
import './pages/Onama.css';
import Typography from '@mui/material/Typography';
import './pages/Onama.css';
import Link from '@mui/material/Link';

function Copyright(props) {
	  return (
		      <Typography variant="body2" color="text.secondary" align="center" {...props}>
		        {'Copyright  '}
		        <Link component={RouterLink} to="/home" color="inherit" >
		          Megatron 
		        </Link>{' '}
		        {new Date().getFullYear()}
		        {'.'}
		      </Typography>
		    );
}

const theme=createTheme({                                                                                                                                                                                                                            palette: {                                                                                                                                                                                                                                                  type: 'light',                                                                                                                                                                                                                                  primary: {                                                                                                                                                                                                                                                    main: '#54dcd8',                                                                                                                                                                                                                              },                                                                                                                                                                                                                                  secondary: {                                                                                                                                                                                                                                                  main: '#f50057',                                                                                                                                                                                                                              },                                                                                                                                                                                                                                },                                                                                                                                                                                                                            })

const Footer = () => {

	return (
<ThemeProvider theme={theme}>
    <div>
	<Box pt={3}>
		          <AppBar position = "static">
		                <Toolbar class='center'>
				<Grid container class='center'>
				<Typography component="h1" variant="h6" align="center">
		                      Megatron
			        </Typography>	
				<Copyright  />
				</Grid>
		         	</Toolbar>
		          </AppBar>
      </Box>
  </div>
</ThemeProvider>
	)}
export default Footer

