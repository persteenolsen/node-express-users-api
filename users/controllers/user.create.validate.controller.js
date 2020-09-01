const express = require('express');
const router = express.Router();

const UserCreateValidateService = require('../services/user.create.validate.service');
const DatabaseConfig = require('../../db/database.config');

const UserValidate = require('../model/user.validate');
 
module.exports = router;


router.post('/', function (req, res, next) {
              
    // An instanse of the User Model are created and function call to make form input validation
    const uv = new UserValidate( req.body.email, req.body.password, req.body.title, req.body.firstName, req.body.lastName, req.body.role );
        
    const emailvalid = uv.isEmailValid(min=8, max=25);
    const passwordvalid = uv.isPasswordValidCreateRegister(min=6, max=15);
    const titlevalid = uv.isTitleValid(min=2, max=4);
    const firstnamevalid = uv.isFirstNameValid(min=2, max=15);
    const lastnamevalid = uv.isLastNameValid(min=2, max=15);
    const rolevalid = uv.isRoleValid(min=4, max=5);

    const inputdatavalid = uv.isInputDataValid();

    console.log("Controller - All input data are valid: " + inputdatavalid );

    if ( inputdatavalid === true ){
            
         const dbconfig = new DatabaseConfig();
         const connectionString = dbconfig.getDBConnectionPool();
         var s = new UserCreateValidateService();
        
          // Consuming Promises: First a function to check if the email is already used by another User
          let promisevalidate = s.ValidateMailCreateUser( connectionString, uv.email );
          promisevalidate.then(( isemailfree ) => {
                          
              // Chaining Promises: If the email is free try to create the User and if the User 
              // was created return true to the next THEN
              if( isemailfree ){
                   console.log("The User email is free - inside the Controller first THEN: " + isemailfree );
                                    
                   // Note: The User properties are stored in the uv object representing the User Model
                   // A different way is used in user.register.validate.controller.js !
                   usercreated = s.doCreateUser( connectionString, uv );
                   return usercreated;
                  }
              else {
                   console.log("The User email is NOT free - inside the Controller first THEN: " + isemailfree );
                   res.status(400).send( { message: 'The User was not created because the Email is already in use !'} );
                  }     
                                
             }).then(( usercreated ) => {
                                 
                 // If true the User was created successfully and a 200 status code is send back to the CLIENT :-) 
                 if(  usercreated  ){ 
                      console.log("The User was created - inside the Controller second THEN: " +  usercreated  );
                      res.status(200).send( { message: 'The User was created successfully !' } );  
                     }
                 else 
                      console.log("The User was not created - inside the Controller second THEN: " +  usercreated );
                   
              }).catch( error => {
                    console.log( "SQL error from Promise displayed in catch - Controller: " + error );
                    res.status(400).send( { message: 'The User was not created due to an SQL error inside Service !'} );
             });
       
         }
    else {
          console.log("The User was not created because of wrong input values !");
          res.status(400).send( { message: 'The User was not created because of wrong input values !' } );
         } 

}); 
