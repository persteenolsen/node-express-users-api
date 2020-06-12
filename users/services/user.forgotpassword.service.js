

const bcrypt = require("bcryptjs")


class UserForgotPasswordService {
     
    
     ValidateMailForgotPasswordUser( con, email ){
                              
        let emailfoundpromise = new Promise(( resolve, reject ) => {
                  
            con.query("SELECT email FROM node_crud_users_jwt WHERE email LIKE '" + email + "'", function (err, result, fields) {
            if ( err ) 
                 reject( true );
            else {
                
                if( result.length === 1 ){
                    console.log( 'The User Email was found - inside the Promise in Service !' );
                    resolve( true );
                    }
                else {
                     console.log( 'The User Email was NOT found - inside Promise in Service !' );
                     resolve( false );
                   }
               }
             });
         
        });
        
       console.log( "Leaving Forgot Password Validate Email - Outside the Promise in Service !" );
       return emailfoundpromise;
       
    }
  


   // Perform the functionality for Update the selected person
  doForgotPasswordEditUser( con, resetToken, email ) {
           
    let usereditedforgotpasswordpromise = new Promise(( resolve, reject ) => {

       var sqlString = "";
       sqlString += "UPDATE node_crud_users_jwt SET ";
       sqlString += "isVerified='false', ";
       sqlString += "resetToken='" + resetToken + "'";
       sqlString += " WHERE email LIKE '" + email + "'";
         
       con.query(sqlString, function (err, results, fields) {
           
       if( err ) 
           reject( true );
        else {
                 
             if( results.affectedRows === 1 ){
                 console.log( results.affectedRows + " User Edited Forgot Password - inside the Promise in Service !");
                 resolve( true );
                 }
              else {
                    console.log( "User NOT Edited Forgot Password - inside the Promise in Service !" );
                    resolve( false );
                  }
               }
            });

         });
        
      console.log( "Leaving Forgot Password - Outside the Promise in Service !" );
      return usereditedforgotpasswordpromise;
                   
   }




}

module.exports = UserForgotPasswordService;       