const express = require('express');
const router = express.Router();

const UserValidateResetPasswordService = require('../services/user.resetpassword.service');
const DatabaseConfig = require('../../db/database.config');

const UserValidate = require('../model/user.validate');

module.exports = router;
 

router.post('/reset-password', function (req, res, next) {
       
       // An instanse of the User Model are created and function call to make form input validation
    const uv = new UserValidate( "", req.body.password, "", "", "", "" );
        
    const passwordvalid = uv.isPasswordValidCreateRegister(min=6, max=15);
    
    // Note: To make sure that the user only can enter valid password format !!
    // Passwordl dont allowing whitespaces and with limited lengt preventing
    // long input and scripts-tags and sql-injection. The following wont be allowed:
    // 1) DROP TABLE; 
    // 2) OR 10=10
    // 3) <script>alert('Hello');</script>
    if( passwordvalid ){

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

        }
        // Sending messages to the User if the format are not valid
        else
            res.status(400).send( { message: 'Password has invalid format !'} ); 
      
    
}) 

