const bcrypt = require("bcryptjs")

class UserValidateResetPasswordService {

  
  ValidateResetPasswordUser( con, resetToken ){
     
     
     let validateresetpasswordpromise = new Promise( ( resolve, reject ) => {
             
        con.query( "SELECT resetToken FROM node_crud_users_jwt WHERE resetToken LIKE '" +  resetToken + "'", function (err, result, fields) {
        if ( err ) 
             reject( true );
        else {
              
              if( result.length === 1 ){
                
                  console.log( 'The ValidateReset Password does match - inside the Promise in Service !' );
                  resolve( true );
                  }
              else {
                  console.log( 'The Validate Reset Password  does NOT match - inside the Promise in Service !' );
                  resolve( false );
                 }
             }
          });
    
        });
         
        console.log( "Leaving Validate Reset Password - Outside the Promise in Service !"  );
        return validateresetpasswordpromise;
     
     } 
  

   // Perform the functionality for Update the selected person
   doResetPasswordUser( con, resetToken, password ) {
           
    let resetpasswordpromise = new Promise(( resolve, reject ) => {

        var sqlStringPassword = "";
        if( password != "" ){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync( password, salt);

            sqlStringPassword  += ", passwordhash='" + hash + "'";
            console.log("Password Hash: " + hash ); 
          }
         else
             console.log("Password is Empty!" ); 

       var sqlString = "";
       sqlString += "UPDATE node_crud_users_jwt SET ";

       sqlString += "resetToken=''";
       sqlString += ", isVerified='true'";
       sqlString += sqlStringPassword;

       sqlString += " WHERE resetToken LIKE '" + resetToken + "'";
         
       con.query( sqlString, function (err, results, fields) {
           
       if( err ) 
           reject( true );
        else {
                 
             if( results.affectedRows === 1 ){
                 console.log( results.affectedRows + " Password Reset - inside the Promise in Service !");
                 resolve( true );
                 }
              else {
                    console.log( "Password NOT Reset - inside the Promise in Service !" );
                    resolve( false );
                  }
               }
            });

         });
        
      console.log( "Leaving Reset Password - Outside the Promise in Service !" );
      return resetpasswordpromise;
                   
   }



    
}

module.exports = UserValidateResetPasswordService;