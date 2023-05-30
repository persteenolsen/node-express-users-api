require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

// Note: The port 8080 is also working on Azure with HTTPS enabled on Azure
var http = require('http');
var port = process.env.PORT || 443;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// Just a test for /test granted in jwt.js !
app.get('/test', function (req, res) {
    res.send('Hello World - 30-05-2023!');
   // console.log('Test');
 })

 
// api routes
app.use('/users', require('./users/controllers/user.login.controller'));
app.use('/users', require('./users/controllers/user.register.validate.controller'));

app.use('/users', require('./users/controllers/user.get.controller'));
app.use('/users', require('./users/controllers/user.delete.controller'));
app.use('/users', require('./users/controllers/user.create.validate.controller'));
app.use('/users', require('./users/controllers/user.update.validate.controller'));

app.use('/users', require('./users/controllers/user.verifyemail.controller'));

app.use('/users', require('./users/controllers/user.forgotpassword.controller'));
app.use('/users', require('./users/controllers/user.resettoken.controller'));
app.use('/users', require('./users/controllers/user.resetpassword.controller'));
 
 

// global error handler
app.use(errorHandler);


app.listen(port, function(){
	console.log('Server running at port 443')
})
