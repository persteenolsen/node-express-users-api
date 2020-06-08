const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../../db/database.config');
const UserLoginService = require('../services/user.login.service');

module.exports = router;


//------------------------------USER LOGIN ---------------------------------------------
router.post('/authenticate', function (req, res, next) {

    console.log( 'Process 1 - Starting the authentication of the User - Controller !' );
    
    const dbconfig = new DatabaseConfig();
    const connectionString = dbconfig.getDBConnectionPool();

    var s = new UserLoginService();
    
    const password = req.body.password;
    const email = req.body.email;
    
    console.log( 'Process 1 - Calls async function doing SQL starting Process 2 - Controller !' );

    const user = s.authenticate( connectionString, email, password );

    console.log( "Process 1 - Not able to enter then or catch methods - Controller ! " );
   
    // If a User is found the Promise will resolve with the value of the User and be returned
    // in a stringyfied object wrapped in a Promise.
    // If no User is found the Promise will resolve with the value of [] representing an empty User
    user.then(( userlogin ) => {
             
         if( userlogin  != "[]" ){
            console.log("Process 2 - Yes, a User is ready for login - Controller !" );
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end( userlogin );
            }
        else {
             console.log("Process 2 - Ups, No User is ready for login - Controller !" );
             res.status(400).send( { message: 'Try to enter your Email and Password again ! If you just registred do verify you Email or try Forgot Password !'} ); 
            }

     }).catch( error => {
             console.log( "Process 2 - SQL error from Promise displayed in catch - Controller: " + error );
             res.status(400).send( { message: 'The User was not logged in due to an SQL error inside Service !'} );
     });
   
     console.log( 'Process 1 - Leaving the authentication of the User - Controller !' );

 }); 