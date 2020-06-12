const bcrypt = require("bcryptjs")

class UserValidateResetTokenService {

  
  ValidateResetTokenUser( con, resetToken ){
     
     let validateresetokenpromise = new Promise((resolve, reject) => {
             
        con.query( "SELECT resetToken FROM node_crud_users_jwt WHERE resetToken LIKE '" +  resetToken + "'", function (err, result, fields) {
        if ( err ) 
             reject( true );
        else {
              
              if( result.length === 1 ){
                  console.log( 'The Validate ResetToken  does match - inside the Promise in Service !' );
                  resolve( true );
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