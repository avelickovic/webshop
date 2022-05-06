
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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


const schema = yup.object().shape({
	  firstName: yup.string().required("First Name should be required please"),
	  lastName: yup.string().required(),
	  email: yup.string().email().required(),
	  password: yup.string().min(4).max(15).required(),
	  address:yup.string().required(),
	  phonenumber:yup.string().required().max(10),
});

export default function SignUp() {
   const handleSubmit = (event) => {
   event.preventDefault();
   const data = new FormData(event.currentTarget);
   console.log({
   email: data.get('email'),
   password: data.get('password'),
   firstname:data.get('firstName'),
   lastname:data.get('lastName'),
   phonenumber:data.get('phonenumber'),
   address:data.get('address'),
   });
	
   const jsondata = {
	email: data.get('email'),
	password: data.get('password'),
	firstname: data.get('firstName'),
	lastname: data.get('lastName'),
	phonenumber: data.get('phonenumber'),
	address: data.get('address')
    }

	   fetch('/kupci/insert',
		   {
			   method:"post",
			   headers:{"Content-Type":"application/json"}, 
			   body:JSON.stringify(jsondata)
	
	})
	   .then(function (response) {
		                            console.log(response);
		                          })
	            .catch(function (error) {
		                              console.log(error);
		                             });
   }


   const { register, errors } = useForm({
	       resolver: yupResolver(schema),
	     });


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
	          <Typography component="h1" variant="h5">
	            Sign up
          </Typography>
	          <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
	            <Grid container spacing={2}>
	              <Grid item xs={12} sm={6}>
	                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Ime"
                  autoFocus
                />

	              </Grid>
	              <Grid item xs={12} sm={6}>
	                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Prezime"
                  name="lastName"
                  autoComplete="family-name"
                />
	              </Grid>
	              <Grid item xs={12}>
	                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
	              </Grid>
	              <Grid item xs={12}>
	                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
		</Grid>
	              <Grid item xs={12}>
	                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Adresa"
                  type="address"
                  id="address"
                />
			
		</Grid>
	      <Grid item xs={12}>
	                <TextField
                  required
                  fullWidth
                  name="phonenumber"
                  label="Broj telefona"
                  type="phonenumber"
                  id="phonenumber"
                  autoComplete="new-phone number"
                />
	         </Grid>
		</Grid>
	            <Button
             type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
	
            >
	              Sign Up
            </Button>
	            <Grid container justifyContent="flex-end">
	              <Grid item>
	                <Link href="#" component={RouterLink} to="/" variant="body2">
	                  Already have an account? Sign in
	                </Link>
	              </Grid>
	            </Grid>
	          </Box>
	        </Box>
	      </Container>
	    </ThemeProvider>
);
}
