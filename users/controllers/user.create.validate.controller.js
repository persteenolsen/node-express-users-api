const express = require('express');
const router = express.Router();

const UserCreateValidateService = require('../services/user.create.validate.service');
const DatabaseConfig = require('../../db/database.config');

const UserValidate = require('./user.validate');

module.exports = router;


router.post('/', function (req, res, next) {
  
    const v = new UserValidate();
    const inputdatavalid = v.validateInputDataCreateRegister(req.body.firstName, req.body.lastName, req.body.email, req.body.password );

    if ( inputdatavalid == true ){
            
         const dbconfig = new DatabaseConfig();
         const connectionString = dbconfig.getDBConnectionPool();
         var s = new UserCreateValidateService();
        
          // Consuming Promises: First a function to check if the email is already used by another User
          let promisevalidate = s.ValidateMailCreateUser( connectionString, req.body.email );
          promisevalidate.then(( isemailfree ) => {
                          
             // Chaining Promises: If the email is free try to create the User and if the User 
             // was created return true to the next THEN
             if( isemailfree ){
                  console.log("The User email is free - inside the Controller first THEN: " + isemailfree );
                  usercreated = s.doCreateUser( connectionString, req.body.email, req.body.password, req.body.title, req.body.firstName, req.body.lastName, req.body.role );
                  return usercreated;
                  }
              else {
                   console.log("The User email is NOT free - inside the Controller first THEN: " + isemailfree );
                   res.status(400).send( { message: 'The User was not created because the Email is already in use !'} );
                  }     
                                
             }).then(( usercreated ) => {
                 
                 // Note: Here verification email could be send because of the fact that the email was not
                 // used by another User and the User was created successfully !
                 // For now a 200 status code is send back to the client CLIENT :-) 
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
