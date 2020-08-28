const bcrypt = require("bcryptjs")

class UserValidateResetTokenService {

  
  ValidateResetTokenUser( con, resetToken ){
     
     let validateresetokenpromise = new Promise((resolve, reject) => {
             
        con.query( "SELECT resetToken, resetTokenExpiry FROM node_crud_users_jwt WHERE resetToken LIKE '" +  resetToken + "'", function (err, result, fields) {
        if ( err ) 
             reject( true );
        else {
              
              if( result.length === 1 ){
                 
                  // 28-08-2020 - Functionality about the need to reset password within a given time like 24 hours !
                  var timenow = new Date().toISOString();
                  console.log('Now: ' + timenow);
                  console.log('ResetTokenExpiry: ' + result[0].resetTokenExpiry);
                
                  var d1 = new Date(timenow); 
                  var d2 = new Date(result[0].resetTokenExpiry); 
                  
                  // Get the time difference
                  var timediff = d1 - d2;
                  console.log('Time difference in milliseconds: ' + timediff);
                  
                  // Hours before the resetToken will expire from the using theForgot Password
                  var hours_to_reset_before_expiry = 24;
                 
                  // Check if the resetToken expired - for example 1 hour 
                  if( timediff < 60 * 60 * 1000 * hours_to_reset_before_expiry ) {
                       console.log('You still have time to reset your password !');
                       resolve( true );
                     }
                  else {
                        console.log('Your resetToken Expired - you need to use forgot password again !');
                        resolve( false );
                       }
                  
                  }
              else {
                  console.log( 'The Validate ResetToken  does NOT match - inside the Promise in Service !' );
                  resolve( false );
                 }
             }
          });
    
        });
         
        console.log( "Leaving Validate ResetToken - Outside the Promise in Service !" );
        return validateresetokenpromise;
     
     } 
  
    
}

module.exports = UserValidateResetTokenService;