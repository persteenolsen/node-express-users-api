

const express = require('express');

const UserEmailService = require('../services/user.email.service');

const router = express.Router();
module.exports = router;


// TEST
router.get('/sendemail', function (req, res, next) {
   
  // let origin = req.get( "origin" );
  // console.log("The User request has origin: " + origin );
    
   var s = new UserEmailService();

   const mail = s.SendVerifyEmailRegisterUser( "http://localhost:8080", "verificationToken", "persteen22@gmail.com" );

   console.log("User Object wrapped in a Promise from Send Mail - Controller! " + mail );

   mail.then(( sendemail ) => {
            
       if( sendemail ){
           console.log("Yes, 1 mail sent the Controller! " );
           res.status(200).send( 'The Email was sent ! ' ); 
           }
       else {
            console.log("Ups, No Mail sent at the Controller! " );
            res.status(400).send( { message: 'The mail was not sent !'} ); 
           }

      }).catch( error => {
            console.log( "SQL error from Promise displayed in catch - Controller: " + error );
            res.status(400).send( { message: 'The Email was not sent due to an Mail Error inside Service !'} );
      });

  });

