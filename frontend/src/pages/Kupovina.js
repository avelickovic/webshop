
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, iink as RouterLink } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import {Grid ,Card,CardContent,CardMedia,Typography} from '@mui/material';
import "./Kupovina.css";
import {seState, useEffect,useState} from 'react';
const theme=createTheme({
	Card: {
		fontSize: '100px',
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
export default function Kupovina(){
	const [data,setData]=useState([]);

	useEffect(()=>
	{
		fetch('/proizvodi').then(response => response.json()).then((data) => 
		{
			console.log(data);
			setData(data);
		});
	}, []);

	const handleBuy = (id) =>
	{
		let buyOrder =
		{
			"product": id,
			"uid": 1
		};

		let options =
		{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(buyOrder)
		};

		fetch("/kupovina/order", options).then(response => response.json()).then(data =>
		{
			console.log(data);
			if(data.success)
			{
				console.log("-- products");
			}
			else
			{
				console.log(data.error);
			}
		});
	}

	const cards = data.map((data,id) =>
	{
		const imgpath = "/pictures/proizvodi/" + data.id + ".jpg";

		return 	<Grid item xs ={3} key={id}>
				<Card>
					<CardMedia component="img" height = "194" image={imgpath}/>
					<CardContent>
						<Typography variant="h6">{data.naziv}</Typography>
						<Typography>{data.kategorija}</Typography>
						<Grid container>
							<Grid item xs={2}>{data.cena}din</Grid>
							<Grid item xs={8}>
							</Grid>
							<Grid item xs={2}>
								<Button product={id} variant="contained" onClick={() => handleBuy(id)} >Kupi</Button>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
	});

	return (

		<ThemeProvider theme={theme}>
		<Header />

		<Box sx={{ width: "90%", mt: "25px", mb: "25px" }} m="auto">
		<Grid container spacing={4} justifyContent="center">
		{cards}
		</Grid>
		</Box>
		<Footer />

		</ThemeProvider>

	);}
