const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const sql= require('mssql');

const mssqlConfig= require('./config/database-mssql');

// Connect To Database
mongoose.connect(config.database);

var conn= new sql.Connection(mssqlConfig);
var req= new sql.Request(conn);

conn.connect(function(err){
	if(err){
		console.log(err);
		return
	}
	req.query("select * From Users", function(err, recordSet){
		if(err){
			console.log("error");
		}else{
			console.log(recordSet);
		}
		conn.close();
	});
});
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
//app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

//Pasport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});