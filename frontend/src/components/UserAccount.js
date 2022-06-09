import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

export default function UserAccount({stateProps})
{
	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);

	const [loginOpen, setLoginOpen] = useState(false);
	var logindata = {};
	const [registerOpen, setRegisterOpen] = useState(false);
	var registerdata = {};

	const [mailError, setMailError] = useState("format nije ispravan");
	const [pwdError, setPwdError] = useState("polje ne sme biti prazno");
	const [imeError, setImeError] = useState("polje ne sme biti prazno");
	const [prezimeError, setPrezimeError] = useState("polje ne sme biti prazno");
	const [brtelError, setBrtelError] = useState("polje ne sme biti prazno");
	const [adresaError, setAdresaError] = useState("polje ne sme biti prazno");

	const handleMenuOpen = (event) =>
	{
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () =>
	{
		setAnchorEl(null);
	}

	const handleLoginOpen = () =>
	{
		handleMenuClose();
		setLoginOpen(true);
	}

	const handleLoginClose = () =>
	{
		setLoginOpen(false);
	}

	const handleRegisterOpen = () =>
	{
		handleMenuClose();
		setRegisterOpen(true);
	}

	const handleRegisterClose = () =>
	{
		setRegisterOpen(false);
	}

	const handleLoginChange = (event) =>
	{
		logindata[event.target.name] = event.target.value.trim();
	}
	
	const handleRegisterChange = (event) =>
	{
		console.log(event);
		registerdata[event.target.name] = event.target.value.trim();
		console.log(registerdata);
	}

	const handleLogin = () =>
	{
		let options =
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(logindata)
		}

		fetch("/korisnici/login", options).then(response => response.json()).then(data =>
		{
			if(data.error)
				stateProps.SetAlert(data.error, "error");
			else
			{
				stateProps.SetAlert("login successful", "success");
				stateProps.SetUser(data.user);
			}
			handleLoginClose();
		});
	}

	const handleRegister = () =>
	{
		console.log(registerdata);
		let options =
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(registerdata)
		}

		fetch("/korisnici/register", options).then(response => response.json()).then(data =>
		{
			if(data.error)
				stateProps.SetAlert(data.error, "error");
			else
				stateProps.SetAlert("uspesno ste se registrovali", "success");

			handleRegisterClose();
		});
	}

	const handleLogOut = () =>
	{
		stateProps.SetUser("null");
		handleMenuClose();
	}

	return (
		<React.Fragment>
		<Box>
		{
			stateProps.loggedIn() &&
			stateProps.p_user || "Not logged in"
		}
		<IconButton
			size="large"
			edge="end"
			onClick={handleMenuOpen}
			color="inherit"
		>
			<AccountCircle/>
		</IconButton>
		<Menu
			anchorEl = {anchorEl}
		 	anchorOrigin = {
			{
				vertical: 'top',
				horizontal: 'right',
			}}
			id="user-menu"
			keepMounted
			transformOrigin = {
			{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
		{
			!stateProps.loggedIn() &&
			<div>
				<MenuItem onClick={handleLoginOpen}>Log In</MenuItem> 
				<MenuItem onClick={handleRegisterOpen}>Register</MenuItem>
			</div>
		}
		{
			stateProps.loggedIn() &&
			<MenuItem onClick={handleLogOut}>Log Out</MenuItem>
		}
		</Menu>
		</Box>
		<Dialog open={loginOpen} onClose={handleLoginClose}>
			<DialogTitle>Log In</DialogTitle>
			<DialogContent>
				<TextField autoFocus fullWidth margin="dense" name="mail" label="Mail" type="string" onChange={handleLoginChange}/>
				<TextField fullWidth margin="dense" name="password" label="Password" type="password" onChange={handleLoginChange}/>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleLogin}>
				Login
				</Button>
			</DialogActions>
		</Dialog>
		<Dialog open={registerOpen} onClose={handleRegisterClose}>
			<DialogTitle>Register</DialogTitle>
			<DialogContent>
				<TextField autoFocus fullWidth margin="dense" name="mail" label="Mail" type="string" error={mailError.length === 0 ? false : true} helperText={mailError} 
				onChange = {(event) =>
				{
					const validEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

					if(validEmail.test(event.target.value))
						setMailError("");
					else
						setMailError("format nije ispravan");

					console.log(event);
					handleRegisterChange(event);
				}}/>
				<TextField fullWidth margin="dense" name="password" label="Password" type="password" error={pwdError.length === 0 ? false : true} helperText={pwdError}
				onChange = {(event) =>
				{
					if(event.target.value.length > 0)
						setPwdError("");
					else
						setPwdError("polje ne sme biti prazno");

					console.log(event);
					handleRegisterChange(event);
				}}/>
				<TextField fullWidth margin="dense" name="ime" label="Ime" type="string" error={imeError.length === 0 ? false : true} helperText={imeError}
				onChange = {(event) =>
				{
					if(event.target.value.length > 0)
						setImeError("");
					else
						setImeError("polje ne sme biti prazno");

					console.log(event);
					handleRegisterChange(event);
				}}/>
				<TextField fullWidth margin="dense" name="prezime" label="Prezime" type="string" error={prezimeError.length === 0 ? false : true} helperText={prezimeError} 
				onChange={(event) =>
				{
					if(event.target.value.length > 0)
						setPrezimeError("");
					else
						setPrezimeError("polje ne sme biti prazno");
				
					console.log(event);
					handleRegisterChange(event);
				}}/>
				<TextField fullWidth margin="dense" name="broj_telefona" label="Broj telefona" error={brtelError.length === 0 ? false : true} helperText={brtelError} 
				onChange={(event) =>
				{
					if(event.target.value.length > 0)
						setBrtelError("");
					else
						setBrtelError("polje ne sme biti prazno");
					
					console.log(event);
					handleRegisterChange(event);
				}}/>
				<TextField fullWidth margin="dense" name="adresa" label="Adresa" error={adresaError.length === 0 ? false : true} helperText={adresaError} 
				onChange={(event) =>
				{
					if(event.target.value.length > 0)
						setAdresaError("");
					else
						setAdresaError("polje ne sme biti prazno");

					console.log(event);
					handleRegisterChange(event);
				}}/>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleRegister}>
				Register
				</Button>
			</DialogActions>
		</Dialog>
		</React.Fragment>
	);
}
