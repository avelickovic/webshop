import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Button from '@mui/material/Button';
import {Grid ,Card,CardContent,CardMedia,Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import Slider from '@mui/material/Slider';

export default function Kupovina({stateProps})
{
	const [data,setData] = useState([]);

	useEffect(() =>
	{
		fetch('/proizvodi').then(response => response.json()).then((data) => 
		{
			setData(data);
		});
	}, []);

	const handleBuy = (id) =>
	{
		let buyOrder =
		{
			"product": id+1,
			"uid": 1
		};

		let options =
		{
			method: "POST",
			credentials: "include",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(buyOrder)
		};

		if(!stateProps.loggedIn())
		{
			stateProps.SetAlert("Niste ulogovani!", "warning");
			return;
		}

		fetch("/kupovina/order", options).then(response => response.json()).then(data =>
		{
			
			console.log(data);
			if(data.error)
			{
				stateProps.SetAlert(data.error, "error");
			}
			else
			{
				stateProps.SetAlert("Uspesna kupovina!", "success");
			}
		});
	}

	const filterobj =() =>
	{
	return	<Grid>
			<Card>
			<CardContent>
			<Typography variant="h6">Cena</Typography>
			<Slider
			getAriaLabel={() => 'Minimum distance'}
			value={7}
			valueLabelDisplay="auto"
			disableSwap
			/>
			</CardContent>
			</Card>
			</Grid>

	}
	const cards = data.map((data,id) =>
		{
			const imgpath = "/pictures/proizvodi/" + data.id + ".jpg";

			return 	<Grid item xs ={3} key={id}>
				<Card>
				<CardMedia component="img" height = "400" image={imgpath}/>
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

		<Box sx={{ width: "90%", mt: "25px", mb: "25px" }} m="auto">
		<Grid container spacing={4} justifyContent="center">
		{cards}
		</Grid>
		</Box>

	);}
