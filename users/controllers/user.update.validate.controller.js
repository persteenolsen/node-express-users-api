const express = require('express');
const router = express.Router();

const UserUpdateValidateService = require('../services/user.update.validate.service');
const DatabaseConfig = require('../../db/database.config');

const UserValidate = require('../model/user.validate');

module.exports = router;
 

router.put('/:id', function (req, res, next) {
   
  // An instante of the User Model are created and function call to make form input validation
  const uv = new UserValidate( req.body.email, req.body.password, req.body.title, req.body.firstName, req.body.lastName, req.body.role );
    
  const emailvalid = uv.isEmailValid(min=8, max=25);
  const passwordvalid = uv.isPasswordValidUpdate(min=6, max=15);
  const titlevalid = uv.isTitleValid(min=2, max=4);
  const firstnamevalid = uv.isFirstNameValid(min=2, max=15);
  const lastnamevalid = uv.isLastNameValid(min=2, max=15);
  const rolevalid = uv.isRoleValid(min=4, max=5);

  const inputdatavalid = uv.isInputDataValid();

  console.log("Controller - All input data are valid: " + inputdatavalid );

  // Only if all input user data are valid update the User
  if ( inputdatavalid === true ){
          
       const dbconfig = new DatabaseConfig();
       const connectionString = dbconfig.getDBConnectionPool();
       var s = new UserUpdateValidateService();

        // Consuming Promises: First a function to check if the email is already used by another User
        let promisevalidate = s.ValidateMailEditUser( connectionString, req.params.id, uv.email );
        promisevalidate.then(( isemailfree ) => {
                         
              // Chaining Promises: If the email is free try to update the User and if the User 
              // was updated return true to the next THEN
               if( isemailfree ){
                  console.log("The User email is free - inside the Controller first THEN: " + isemailfree );
              
                    // Note: The User properties are stored in the uv object representing the User Model
                    // A different way is used in user.register.validate.controller.js !
                    userupdated = s.doEditUser( connectionString, req.params.id, uv );
                    return userupdated;
                  }
               else {
                     console.log("The User email is NOT free - inside the Controller first THEN: " + isemailfree );
                     res.status(400).send( { message: 'The User was not updated because the Email is already in use !'} );
                     }     
                               
         }).then(( userupdated ) => {
                
               // If true the User was updated successfully and a 200 status code is send back to the CLIENT :-) 
               if( userupdated ){ 
                    console.log("The User was updated - inside the Controller second THEN: " + userupdated );
                    res.status(200).send( { message: 'The User was updated successfully !' } );  
                   }
               else 
                    console.log("The User was not updated - inside the Controller second THEN: " + userupdated );
          
          }).catch( error => {
              console.log( "SQL error from Promise displayed in catch - Controller: " + error );
              res.status(400).send( { message: 'The User was not updated due to an SQL error inside Service !'} );
          });

       }
  else {
       console.log("The User was not updated because of wrong input values !");
       res.status(400).send( { message: 'The User was not updated because of wrong input values!' } );
      } 
    
}) 

