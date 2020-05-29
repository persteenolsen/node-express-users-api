const express = require('express');
const router = express.Router();

const UserValidateResetPasswordService = require('../services/user.resetpassword.service');
const DatabaseConfig = require('../../db/database.config');


module.exports = router;
 

router.post('/reset-password', function (req, res, next) {
   
       const dbconfig = new DatabaseConfig();
       const connectionString = dbconfig.getDBConnectionPool();
       var s = new UserValidateResetPasswordService();

       console.log("Reset Password Token: " + req.body.token );

        let promisevalidate = s.ValidateResetPasswordUser( connectionString, req.body.token );
        promisevalidate.then(( tokenfound ) => {
         
            if( tokenfound ){
                console.log("The Reset Token does match - inside the Controller first THEN: " + tokenfound );
                userreset = s.doResetPasswordUser( connectionString, req.body.token, req.body.password );
                 
                return userreset;
                }
             else {
                  console.log("The Reset Token does NOT match - inside the Controller first THEN: " + tokenfound );
                  res.status(400).send( { message: 'No Reset Token was found !'} );
               }     
                               
         }).then(( userreset ) => {
                
               if( userreset ){ 
                   console.log("The Password was Reset - inside the Controller second THEN: " + userreset );
                   res.status(200).send( { message: 'The Password was Reset successfully and you are able to login!' } );  
                   }
               else 
                    console.log("The Password was not Reset - inside the Controller second THEN: " + userreset );
          
         }).catch( error => {
            console.log( "SQL error from Promise displayed in catch - Controller: " + error );
            res.status(400).send( { message: 'The Password was not RESET due to an SQL error inside Service !'} );
         });

     
    
}) 

