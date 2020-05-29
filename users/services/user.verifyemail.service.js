const bcrypt = require("bcryptjs")

class UserVerifyEmailService {

  
  async ValidateVerifyEMailUser( con, verificationToken ){
     
     let verificationtokenpromise = await new Promise((resolve, reject) => {
             
        con.query( "SELECT verificationToken FROM node_crud_users_jwt WHERE verificationToken LIKE '" +  verificationToken + "'", function (err, result, fields) {
        if ( err ) 
             reject( true );
        else {
              
              if( result.length === 1 ){
                  console.log( 'The VerifyEmail Token does match - inside the Promise in Service !' );
                  resolve( true );
                  }
              else {
                  console.log( 'The VerifyEmail Token does NOT match - inside the Promise in Service !' );
                  resolve( false );
                 }
             }
          });
    
        });
         
        console.log( "Leaving VerifyEmail - Outside the Promise in Service !" );
        return verificationtokenpromise;
     
     } 
  
    
   // Perform the functionality for Update the selected person
  async doVerifyUser( con, verificationToken ) {
           
     let userverifiedpromise = await new Promise(( resolve, reject ) => {

        var sqlString = "";
        sqlString += "UPDATE node_crud_users_jwt SET ";
        sqlString += "isVerified='true'";
        sqlString += " WHERE verificationToken LIKE '" + verificationToken + "'";
          
        con.query(sqlString, function (err, results, fields) {
            
        if( err ) 
            reject( true );
         else {
                  
              if( results.affectedRows === 1 ){
                  console.log( results.affectedRows + " User Verified - inside the Promise in Service !");
                  resolve( true );
                  }
               else {
                     console.log( "User NOT Verified - inside the Promise in Service !" );
                     resolve( false );
                   }
                }
             });

          });
         
       console.log( "Leaving Verify User - Outside the Promise in Service !" );
       return userverifiedpromise;
                    
    }
 
 
}

module.exports = UserVerifyEmailService;