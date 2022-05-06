
const express=require('express');
const port=43101;
const app=express();
const bodyParser=require('body-parser');
const mariadb = require('mariadb/callback');
var alert=require('alert');

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

function auth(user)
{
	return "==xf256mamatikurvax5";
}

app.get('/kupci',(req,prikaz)=>
	{
		dbc.query('SELECT * from kupci',(err,rows)=>
			{
				prikaz.send(rows);
				console.log("rows: "+err);
				console.log(rows);

			}
		);
	}

);


app.get('/kupovina',(req,prikaz)=>
	{
		dbc.query('SELECT * from kupovina',(err,rows)=>
			{
				prikaz.send(rows);
				console.log("rows: "+err);
				console.log(rows);

			}
		);
	}
);

app.post("/kupovina/order", bodyParser.json(), (req, res) =>
{
	var data = req.body;

	dbc.query("select max(id) as maxid from kupovina", (err, rows) =>
	{
		var newid = rows[0].maxid + 1;
		var gendate = new Date();

		dbc.query("insert into kupovina values(?, ?, ?, ?, ?)", [newid, gendate, "bubreg", data.uid, data.product], (err, rows) =>
		{
			if(err)
			{
				console.log(err);
				res.send(JSON.stringify({"success": false, "error": err}));
			}
			else
			{
				res.send(JSON.stringify({"success": true}));
			}
		});
	});
});

app.get('/proizvodi',(req,prikaz)=>
	{
		dbc.query('SELECT * from proizvodi',(err,rows)=>
			{
				prikaz.send(rows);
				console.log("rows: "+err);
				console.log(rows);

			}
		);
	}
);

app.post('/kupci/insert',bodyParser.json(),(req,prikaz)=>
	{
		console.log('kurcina');	
		console.log(req);
		console.log('kurcina');
		console.log(req.body.email);
		var email = req.body.email;
		var password=req.body.password;
		var firstname=req.body.firstname;
		var lastname=req.body.lastname;
		var address=req.body.address;
		var phonenumber=req.body.phonenumber;
		var id;
		dbc.query("select max(id) as id1 from kupci",(req,rows)=>{

			id=rows[0].id1;



			var newid = rows[0].id1 + 1;
			dbc.query('insert into kupci values(?,?,?,?,?,?,?)',[newid,password,firstname,lastname,phonenumber,email,address],(err,rows)=>{


				console.log(err);

			});
		});
	}
);



app.post('/kupci/login',bodyParser.json(),(req,res)=>
{
	var email = req.body.email;
	var password = req.body.password;

	if(!email)
		res.send(JSON.stringify({"success": false, "reason": "Invalid email."}));
	else
	{
		dbc.query('select * from kupci where mail=?', [email],(err,rows)=>
		{
			console.log(rows);

			if(rows.length != 1)
				res.send(JSON.stringify({"success": false, "reason": "Invalid email."}));
			else
			{
				console.log(password + " == " + rows.sifra);

				if(password && password == rows[0].sifra)
					res.send(JSON.stringify({"success": true, "token": auth(email)})); 
				else
					res.send(JSON.stringify({"success": false, "reason": "Wrong password."}));
			}
		});
	}
});














app.listen(port,() => console.log('listen on port'+port));
