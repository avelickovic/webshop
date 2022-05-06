
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link as RouterLink}  from 'react-router-dom';
import Grid from '@mui/material/Grid';
import './pages/Onama.css';
import {Card,CardContent,CardMedia,Typography} from '@mui/material';
const theme=createTheme({                                                                                                                                                                                                                            palette: {                                                                                                                                                                                                                                                  type: 'light',                                                                                                                                                                                                                                  primary: {                                                                                                                                                                                                                                                    main: '#54dcd8',                                                                                                                                                                                                                              },                                                                                                                                                                                                                                  secondary: {                                                                                                                                                                                                                                                  main: '#f50057',                                                                                                                                                                                                                              },                                                                                                                                                                                                                                },                                                                                                                                                                                                                            })

const Header = () => {

	return (
<ThemeProvider theme={theme}>
  <div>
 <Grid
  container
  justifyContent="center"
  alignItems="center">
    <Card sx={{ maxWidth: 181 }}>
		          <CardMedia
		          component="img"
		          height="95"
		          
		          image="/pictures/logo1.jpg"
		          /> 
   </Card>
  </Grid>
  </div>
    <div>
	<Box>
		          <AppBar position = "static">
		                <Toolbar>
				<Grid container>
				<Grid className='pad'>
		                <Button variant="contained" component={RouterLink} to="/home">Početna</Button>
		                </Grid>
				<Grid className='pad'>
				<Button variant="contained" component={RouterLink} to="/home/Kupovina">Kupovina</Button>
		                </Grid>
				<Grid className='pad'>
				<Button variant="contained" component={RouterLink} to="/home/Onama">O nama</Button>
		      		</Grid>
				<Grid className='pad'>
				<Button variant="contained" component={RouterLink} to="/home/Kontakt">Kontakt</Button>
				</Grid>
				</Grid>
		         	</Toolbar>
		          </AppBar>
      </Box>
  </div>
</ThemeProvider>
	)}
export default Header

