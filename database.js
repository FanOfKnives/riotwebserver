'use strict'
//import mysql driver
const mysql = require('mysql');

//export a function to open a connection to the database, we will need
//to always open a connection before we do any database operation or execute any query
//this function recieve the database access information and a callback function
//eventually the callback function will either be called with errors if any happened or
//be called and the connection object is passed to it with null for error 
const connect = function(conData, callback){
	
	let conn = mysql.createConnection({
		  host: conData.host,
		  user: conData.user, 
		  password: conData.password, 
          database: conData.database,
          port: conData.port
		});
    
    conn.connect(function(err) {
		if (err) callback(err);
		callback(null, conn);
	});
};

exports.connect = connect;

//export a function to create database tables
//this function suppose to create all our tables for us, we will need to call it only one time
//that is when we are setting up our final system, also note that this function should only be accessed 
//by the administrator of the website, so it is very credential, currently we do not have
//any protection over it
exports.createTables = function (conData, callback){
	
	let con = mysql.createConnection({
		  multipleStatements:true,
		  host: conData.host,
		  user: conData.user, 
		  password: conData.password, 
		  database: conData.database
		});
		
	let sql = "CREATE TABLE Contacts (id INT NOT NULL AUTO_INCREMENT, forename VARCHAR(32), surname VARCHAR(32), email VARCHAR(32), subject VARCHAR(2048), message TEXT, dateRecieved DATETIME, PRIMARY KEY (id));";

	sql += "CREATE TABLE USERS (username VARCHAR(16) NOT NULL, password VARCHAR(16) NOT NULL, PRIMARY KEY (username)); "
	con.query(sql, function (err, result) {
		//console.log("finish query:" + result);
		callback(err, result);
	});
	
};

exports.addContact = function (conData, newContact, callback){
    //connect to database
    //insert the new contact
	connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}	
		
		//perform the query
		conn.query('INSERT INTO Contacts SET ?', newContact, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
}

exports.login = function (connData, loginData, callback){

	connect (connData, function (err, conn){

		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}
		
		//perform the query
		conn.query('SELECT * FROM Users WHERE username = \'' + loginData.username + '\' AND password = \'' + loginData.password + '\'' , function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	})

}