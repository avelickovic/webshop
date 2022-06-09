const express=require('express');
const port=43101;
const app=express();
const bodyParser=require('body-parser');
const mariadb = require('mariadb/callback');

const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

var options = 
{
	key: fs.readFileSync('ssl/key.pem'),
	cert: fs.readFileSync('ssl/cert.pem'),
};

const dbc = mariadb.createConnection(
	{
		host: 'localhost', 
		user:'nodeuser', 
		password: 'bugarskegume',
		database:'prodavnica',
		port: '/var/run/mysqld/mysqld.sock'
	});
dbc.connect(err => {
	if(err) return console.log("failed to connect: " + err);                                                                                                                                                                                                console.log("mariadb connect"); 
}); 

var auth_sessions = {};

function authenticate(uid, role)
{
	var token = crypto.randomBytes(64).toString('hex');

	console.log("auth: authed user " + uid + " role: " + role);
	auth_sessions[token] = {"uid": uid, "role": role};

	return token;
}

function verify_user(req, res)
{
	var cookies = req.headers.cookie.split("=");

	if(cookies[1])
	{
		return auth_sessions[cookies[1]];
	}

	res.send(JSON.stringify({"error": "not authenticated"}));
	return false;
}

app.get('/kupci',(req,prikaz)=>
	{
		dbc.query('SELECT * from kupci',(err,rows)=>
			{
				prikaz.send(rows);

			}
		);
	}

);


app.get('/kupovina',(req,prikaz)=>
	{
		dbc.query('SELECT * from kupovina',(err,rows)=>
			{
				prikaz.send(rows);

			}
		);
	}
);

app.post("/kupovina/order", bodyParser.json(), (req, res) =>
{
	var data = req.body;
	var userdata = verify_user(req, res);

	if(!userdata)
		return;
	
	dbc.query("select kupac from korisnici where id=?", [userdata.uid], (err, rows) =>
	{
		if(!rows[0]["kupac"] || rows[0]["kupac"] == null)
			return res.send(JSON.stringify({"error": "Order failed: no customer data!"}));

		var customerid = rows[0]["kupac"];
		
		dbc.query("select max(id) as maxid from kupovina", (err, rows) =>
		{
			var newid = rows[0].maxid + 1;
			var gendate = new Date();

			dbc.query("insert into kupovina values(?, ?, ?, ?)", [newid, gendate, customerid, data.product], (err, rows) =>
			{
				if(err)
					return res.send(JSON.stringify({"error": "SQL error: " + err.text}));
				res.send(JSON.stringify({"success": true}));
			});
		});
	});

});

app.get('/proizvodi',(req,prikaz)=>
{
	dbc.query('select * from proizvodi', (err, rows) =>
	{
		prikaz.send(rows);
	});
});

app.post('/korisnici/register', bodyParser.json(), (req, res) =>
{
	let request = req.body;

	dbc.query("select id from korisnici where mail=?", [request.mail], (req, rows) =>
	{
		if(rows.length > 0)
			return res.send(JSON.stringify({"error": "user already exists"}));

		dbc.query("select max(id) as maxid from korisnici", (err, query_res) =>
		{
			var newid = query_res[0]["maxid"] + 1;

			var salt = crypto.randomBytes(16).toString("hex");
			var hashed_pwd = crypto.pbkdf2Sync(request.password, salt, 1000, 64, "sha512").toString("hex");

			dbc.query("insert into korisnici values(?, ?, ?, ?, ?, ?)", [newid, request.mail, hashed_pwd, salt, "user", null], (err, result) =>
			{
				if(err)
					return res.send(JSON.stringify({"error": 'SQL error: ' + err.text}));
			
				if(request.ime && request.prezime && request.adresa && request.broj_telefona)
				{
					dbc.query("select max(id) as maxid from kupci", (err, max_res) =>
					{
						var customerid = max_res[0]["maxid"] + 1;
						dbc.query("insert into kupci values(?, ?, ?, ?, ?)", [customerid, request.ime, request.prezime, request.broj_telefona, request.adresa], (err, rows) =>
						{
							if(err)
								return res.send(JSON.stringify({"error": "SQL error: " + err.text}));

							dbc.query("update korisnici set kupac=? where id=?", [customerid, newid], (err, rows) =>
							{
								if(err)
									return res.send(JSON.stringify({"error": "SQL error: " + err.text}));

								res.send(JSON.stringify({"status": true}));
							});
						});
					});
				}
				else
					res.send(JSON.stringify({"status": true}));
			});
		});
	});
});

app.post('/korisnici/login', bodyParser.json(), (req, res) =>
{
	let request = req.body;

	if(!request.mail)
		return res.send(JSON.stringify({"error": "invalid user"}));

	if(!request.password)
		return res.send(JSON.stringify({"error": "invalid password"}));

	dbc.query("select * from korisnici where mail=?", [request.mail], (err, rows) =>
	{
		if(rows.length != 1)
		{
			res.send(JSON.stringify({"error": "invalid user"}));
		}
		else
		{
			var salt = rows[0]["crypto_salt"];
			var hashed_pwd = crypto.pbkdf2Sync(request.password, salt, 1000, 64, "sha512").toString("hex");

			if(hashed_pwd == rows[0]["password"])
			{
				res.cookie("auth_token", authenticate(rows[0].id, rows[0].role), {httpOnly: true, secure: true});
				res.send(JSON.stringify({"user": request.mail, "role": rows[0].role}));
			}
			else
				res.send(JSON.stringify({"error": "invalid password"}));
		}

	});
});

https.createServer(options, app).listen(port, () => console.log("listening on port " + port));

