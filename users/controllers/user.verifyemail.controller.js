const express = require('express');
const router = express.Router();

const UserVerifyEmailService = require('../services/user.verifyemail.service');
const DatabaseConfig = require('../../db/database.config');


module.exports = router;
 

router.post('/verify-email', function (req, res, next) {
   
       const dbconfig = new DatabaseConfig();
       const connectionString = dbconfig.getDBConnectionPool();
       var s = new UserVerifyEmailService();

       console.log("Verify-email: " + req.body.token );

        let promisevalidate = s.ValidateVerifyEMailUser( connectionString, req.body.token );
        promisevalidate.then(( tokenfound ) => {
         
            if( tokenfound ){
                console.log("The VerifyEmail Token does match - inside the Controller first THEN: " + tokenfound );
                userverified = s.doVerifyUser( connectionString, req.body.token );
                 
                return userverified;
                }
             else {
                  console.log("The VerifyEmail Token does NOT match - inside the Controller first THEN: " + tokenfound );
                  res.status(400).send( { message: 'No Verification Token was found !'} );
               }     
                               
         }).then(( userverified ) => {
                
               if( userverified ){ 
                   console.log("The User was verified - inside the Controller second THEN: " + userverified );
                   res.status(200).send( { message: 'The User was verified successfully and you are able to login!' } );  
                   }
               else 
                    console.log("The User was not verified - inside the Controller second THEN: " + userverified );
          
         }).catch( error => {
            console.log( "SQL error from Promise displayed in catch - Controller: " + error );
            res.status(400).send( { message: 'The User was not verified due to an SQL error inside Service !'} );
         });

     
    
}) 

