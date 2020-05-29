const express = require('express');
const router = express.Router();

const UserValidateResetTokenService = require('../services/user.resettoken.service');
const DatabaseConfig = require('../../db/database.config');


module.exports = router;
 

router.post('/validate-reset-token', function (req, res, next) {
   
       const dbconfig = new DatabaseConfig();
       const connectionString = dbconfig.getDBConnectionPool();
       var s = new UserValidateResetTokenService();

       console.log("Validate ResetToken: " + req.body.token );

        let promisevalidate = s.ValidateResetTokenUser( connectionString, req.body.token );
        promisevalidate.then(( tokenfound ) => {
         
            if( tokenfound ){
                console.log("The ResetToken  does match - inside the Controller first THEN: " + tokenfound );
                res.status(200).send( { message: 'The ResetToken was found !'} );
                 
                }
             else {
                  console.log("The ResetToken does NOT match - inside the Controller first THEN: " + tokenfound );
                  res.status(400).send( { message: 'The ResetToken was was not found !'} );
               }     
                               
                  
         }).catch( error => {
            console.log( "SQL error from Promise displayed in catch - Controller: " + error );
            res.status(400).send( { message: 'The ResetToken was not verified due to an SQL error inside Service !'} );
         });

     
    
}) 

