var express = require('express');
const config = require('./database');
const routes = require('./routes');

const mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// app.use(express.static(__dirname + '/'));
    
//connection to database
mongoose.connect(config.db, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
console.log('connected to database:' + config.db);
});

mongoose.connection.on('error', (err) => {
console.log('Database error:' + err);
});

// Connect all our routes to our application
app.use('/', routes);

  

// Turn on that server!
app.listen(8081, () => {
console.log('App listening on port 8081');
});