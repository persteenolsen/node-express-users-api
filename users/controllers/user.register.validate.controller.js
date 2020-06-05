const express = require('express');
const router = express.Router();

const crypto = require("crypto");

const DatabaseConfig = require('../../db/database.config');
const UserRegisterService = require('../services/user.register.validate.service');

const UserEmailService = require('../services/user.email.service');
const UserValidate = require('../model/user.validate');

module.exports = router;

function generateToken() {
     return crypto.randomBytes(40).toString('hex');
 }


//------------------------------USER REGISTER and SEND VERIFY EMAIL-----------------------------------------
router.post('/register', function (req, res, next) {
         
    // An instante of the User Model with form input validation
    const uv = new UserValidate( req.body.email, req.body.password, req.body.title, req.body.firstName, req.body.lastName, req.body.role );
    //const inputdatavalid = uv.validateInputDataUpdate();
     
    const emailvalid = uv.isEmailValid(min=8, max=25);
    const passwordvalid = uv.isPasswordValidCreateRegister(min=6, max=15);
    const titlevalid = uv.isTitleValid(min=2, max=4);
    const firstnamevalid = uv.isFirstNameValid(min=2, max=15);
    const lastnamevalid = uv.isLastNameValid(min=2, max=15);
    const rolevalid = uv.isRoleValid(min=4, max=5);

    const inputdatavalid = uv.isInputDataValid();

    console.log("Controller - All input data are valid: " + inputdatavalid );

   
    // Only if all input user data are valid add the User
    if ( inputdatavalid === true ){

         const dbconfig = new DatabaseConfig();
         const connectionString = dbconfig.getDBConnectionPool();
         var s = new UserRegisterService();
           
         var useremail = new UserEmailService();
         
         let verificationToken = generateToken();
         console.log("Token: " + verificationToken );
         let origin = req.get( "origin" );
         console.log("The User request has origin: " + origin );
        
         // Consuming Promises: First a function to check if the email is already used by another User
         let promisevalidate = s.ValidateMailRegisterUser( connectionString, uv.email );
         promisevalidate.then(( isemailfree ) => {
            
                if( isemailfree ){
                    console.log("The User email is free - Controller first THEN: " + isemailfree );

                    // Note: A different way is used in user.update.validate.controller.js and user.create.validate.controller.js !
                    userregistered = s.doRegisterUser( connectionString, verificationToken, uv.email, uv.password, uv.title, uv.firstname, uv.lastname, uv.role );
                
                    return userregistered;
                    }
                 else {
                      console.log("The User email is NOT free - Controller first THEN: " + isemailfree );
                      res.status(400).send( { message: 'The User was not registered because the Email is already in use. Try use Forgot Password !'} );
                     }     
                               
            }).then(( userregistered ) => {
               
                 if( userregistered ){ 
                     console.log("The User was registered - Controller second THEN: " + userregistered );
                     sendemail = useremail.SendVerifyEmailRegisterUser( origin, verificationToken, uv.email );
                     
                     return sendemail;
                    }
                else 
                     console.log("The User was not registered - Controller second THEN: " + userregistered );
                       
            }).then(( sendemail ) => {
            
                 if( sendemail ){
                     console.log("The User was registered and Verification Email sent - Controller third THEN! " + sendemail );
                     res.status(200).send( { message: 'The User was registered successfully and a verification Email is send !' } );
                   }
                 else 
                     console.log("The User was not registered and no Verification Email sent - Controller third THEN! " + sendemail );
                  
            
            }).catch( error => {

                   console.log( "SQL error from Promise displayed in catch - Controller: " + error );
                   res.status(400).send( { message: 'The User was not registered due to an SQL or SMTP error inside Service !'} );
               
            });
         
         }
    else {
         console.log("The User was not registered because of wrong input values !");
         res.status(400).send( { message: 'The User was not registered because of wrong input values !' } );
        } 

 }); 


