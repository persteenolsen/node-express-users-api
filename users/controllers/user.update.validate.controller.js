const express = require('express');
const router = express.Router();

const UserUpdateValidateService = require('../services/user.update.validate.service');
const DatabaseConfig = require('../../db/database.config');

const UserValidate = require('../model/user.validate');

module.exports = router;
 

router.put('/:id', function (req, res, next) {
   
  // An instante of the User Model with form input validation
  const v = new UserValidate( req.body.title, req.body.firstName, req.body.lastName, req.body.email, req.body.password );
  const inputdatavalid = v.validateInputDataUpdate();
  
  // Only if all input user data are valid update the User
  if ( inputdatavalid === true ){
          
       const dbconfig = new DatabaseConfig();
       const connectionString = dbconfig.getDBConnectionPool();
       var s = new UserUpdateValidateService();

        // Consuming Promises: First a function to check if the email is already used by another User
        let promisevalidate = s.ValidateMailEditUser( connectionString, req.params.id, req.body.email );
        promisevalidate.then(( isemailfree ) => {
                         
        // Chaining Promises: If the email is free try to update the User and if the User 
        // was updated return true to the next THEN
        if( isemailfree ){
              console.log("The User email is free - inside the Controller first THEN: " + isemailfree );
              userupdated = s.doEditUser( connectionString, req.params.id, req.body.email, req.body.password, req.body.title, req.body.firstName, req.body.lastName, req.body.role );
              return userupdated;
              }
         else {
               console.log("The User email is NOT free - inside the Controller first THEN: " + isemailfree );
               res.status(400).send( { message: 'The User was not updated because the Email is already in use !'} );
               }     
                               
            }).then(( userupdated ) => {
                
               // Note: Here verification email could be send because of the fact that the email was not
               // used by another User and the User was updated successfully !
               // For now a 200 status code is send back to the client CLIENT :-) 
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

