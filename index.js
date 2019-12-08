var koa = require('koa');
var app = new koa();

var express = require('express');
var app = express();
var parser = require('body-parser')

const path = require('path');
app.use(parser.json());
app.use(express.static('HTML'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/HTML/home.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/HTML/contact.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/HTML/meettheteam.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/HTML/products.html'));
});

app.post('/handlecontact', function(req, res){
    res.status = 201;
    res.send({message: "Riot Has Recieved Your Ticket"});
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Server running on http://localhost:3000')
});

