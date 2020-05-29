const express = require('express');
const router = express.Router();

const crypto = require("crypto");

const DatabaseConfig = require('../../db/database.config');
const UserForgotPasswordService = require('../services/user.forgotpassword.service');

const UserEmailService = require('../services/user.email.service');


module.exports = router;


function generateToken() {
     return crypto.randomBytes(40).toString('hex');
 }

//------------------------------USER FORGET PASSWORD SEND EMAIL FOR RESET PASSWORD-----------------------------------------
router.post('/forgot-password', function (req, res, next) {
    
         const dbconfig = new DatabaseConfig();
         const connectionString = dbconfig.getDBConnectionPool();
         var s = new UserForgotPasswordService();
           
         var useremail = new UserEmailService();
         
         let resetToken = generateToken();
         console.log("Token: " + resetToken );
         let origin = req.get( "origin" );
         console.log("The User request has origin: " + origin );
        
         // Consuming Promises: First a function to check if the email is already used by another User
         let promisevalidate = s.ValidateMailForgotPasswordUser( connectionString, req.body.email );
         promisevalidate.then(( emailfound ) => {
            
            if( emailfound ){
                 console.log("The Forgot Password email was found - Controller first THEN: " + emailfound );
                 usereditedforgotpassword = s.doForgotPasswordEditUser( connectionString, resetToken, req.body.email);
                
                 return usereditedforgotpassword;
                 }
             else {
                  console.log("The Forgot Password Email was not found - Controller first THEN: " + emailfound );
                  res.status(400).send( { message: 'The Forgot Password Email was not found !'} );
                  }     
                               
             }).then(( usereditedforgotpassword ) => {
               
                 if( usereditedforgotpassword ){ 
                     console.log("The User with Forgot Password was Edited - Controller second THEN: " + usereditedforgotpassword );
                     sendemail = useremail.sendPasswordResetEmailUser( origin, resetToken, req.body.email );
                     
                     return sendemail;
                    }
                else 
                     console.log("The User with the Forgot Password Email was not edited - Controller second THEN: " + usereditedforgotpassword );
                       
               }).then(( sendemail ) => {
            
                 if( sendemail ){
                     console.log("The User was edited and a Forgot Password Email sent - Controller third THEN! " + sendemail );
                     res.status(200).send( { message: 'A Forgot Password Email was sent to the User successfully !' } );
                   }
                 else 
                     console.log("The User Forgot Password was not edited and no Email sent - Controller third THEN! " + sendemail );
                  
            
                }).catch( error => {

                   console.log( "SQL error from Promise displayed in catch - Controller: " + error );
                   res.status(400).send( { message: 'The User Forgot Password could not be done due to an SQL or SMTP error inside Service !'} );
               
               });
      
 }); 


