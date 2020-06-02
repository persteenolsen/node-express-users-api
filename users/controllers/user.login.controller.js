const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../../db/database.config');
const UserLoginService = require('../services/user.login.service');

module.exports = router;


//------------------------------USER LOGIN ---------------------------------------------
router.post('/authenticate', function (req, res, next) {

    console.log('Authentication the User...');
    
    const dbconfig = new DatabaseConfig();
    const connectionString = dbconfig.getDBConnectionPool();

    var s = new UserLoginService();
    
    const password = req.body.password;
    const email = req.body.email;

    const user = s.authenticate( connectionString, email, password );
    console.log("User Object wrapped in a Promise from Login Service - Controller! " + user );

    user.then(( userlogin ) => {
             
        if( userlogin ){
            console.log("Yes, 1 User ready for logging in at the Controller! " );
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end( JSON.stringify( userlogin ));
            }
        else {
             console.log("Ups, No Users ready for login at the Controller! " );
             res.status(400).send( { message: 'Try to enter your Email and Password again ! If you just registred do verify you Email or try Forgot Password !'} ); 
            }

     }).catch( error => {
             console.log( "SQL error from Promise displayed in catch - Controller: " + error );
             res.status(400).send( { message: 'The User was not logged in due to an SQL error inside Service !'} );
     });
 
 }); 