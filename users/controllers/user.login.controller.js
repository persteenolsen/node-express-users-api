const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../../db/database.config');
const UserLoginService = require('../services/user.login.service');

module.exports = router;


//------------------------------USER LOGIN ---------------------------------------------
router.post('/authenticate', function (req, res, next) {

    console.log( " 1 - Controller - Starting the authentication of the User !" );
    
    const dbconfig = new DatabaseConfig();
    const connectionString = dbconfig.getDBConnectionPool();

    var s = new UserLoginService();
    
    const password = req.body.password;
    const email = req.body.email;
    
    console.log( " 2 - Controller - Going to call async function doing SQL !" );

    const user = s.authenticate( connectionString, email, password );

    console.log( " 7 - Controller - Before then and catch methods !" );
   
    // If a User is found the Promise will resolve with the value of the User and be returned
    // in a stringyfied object wrapped in a Promise.
    // If no User is found the Promise will resolve with the value of [] representing an empty User
    // Note: These consuming instance mothods then / catch of the Promise are not entered / executed
    // until the Promise will be resolved / rejected and no need for using the the async / await keywords 
    user.then(( userlogin ) => {

        console.log( " 8 - Controller - Inside the method before if/else ! " );
             
         if( userlogin  != "[]" ){
            console.log( " 9.a - Controller - Yes, a User is ready for login !" );
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end( userlogin );
            }
        else {
             console.log( " 9.b - Controller - Ups, No User is ready for login !" );
             res.status(400).send( { message: 'Try to enter your Email and Password again ! If you just registred do verify you Email or try Forgot Password !'} ); 
            }

     }).catch( error => {
             console.log( " 9.c - Controller - SQL error from Promise displayed in catch: " + error );
             res.status(400).send( { message: 'The User was not logged in due to an SQL error inside Service !'} );
     });
   
     console.log( " 10 - Controller - Leaving the authentication of the User !" );

 }); 