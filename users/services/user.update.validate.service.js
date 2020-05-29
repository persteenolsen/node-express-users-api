const bcrypt = require("bcryptjs")

class UserUpdateValidateService {

  
  async ValidateMailEditUser( con, id, email ){
     
     let isemailfreepromise = await new Promise((resolve, reject) => {
             
        con.query( "SELECT email FROM node_crud_users_jwt WHERE email LIKE '" +  email + "' AND id <> " + id, function (err, result, fields) {
        if ( err ) 
             reject( true );
        else {
              
             // The USER can only be updated with own or new email not used by any other user !!
              if( result.length === 0 ){
                  console.log( 'The User Email is free - inside the Promise in Service !' );
                  resolve( true );
                  }
             else {
                  console.log( 'The User Email is NOT free - inside the Promise in Service !' );
                  resolve( false );
                 }
             }
          });
    
        });
         
        console.log( "Leaving Validate Update - Outside the Promise in Service !" );
        return isemailfreepromise;
     
     } 
  
    
   // Perform the functionality for Update the selected person
  async doEditUser( con, id, email, password, title, firstname, lastname, role ) {
           
     let promiseuserupdated = await new Promise((resolve, reject) => {

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
            sqlString += "email='" + email + "', title='" + title + "";
            sqlString += "', firstName='" + firstname + "', lastName='" + lastname + "";
        
            if( (! role ) || role == '' || role === 'undefined' )
               sqlString += "', role='User'"; 
            else
               sqlString += "', role='" + role + "'";      

             sqlString += sqlStringPassword;
             sqlString += " WHERE Id=" + id;
          
             con.query(sqlString, function (err, results, fields) {
            
             if( err ) 
                 reject( true );
             else {
                  
                  if( results.affectedRows === 1 ){
                      console.log( results.affectedRows + " User updated - inside the Promise in Service !");
                      resolve( true );
                      }
                   else {
                       console.log( "User NOT updated - inside the Promise in Service !" );
                       resolve( false );
                      }
                }
             });

          });
         
       console.log( "Leaving Update - Outside the Promise in Service !" );
       return promiseuserupdated;
                    
    }
 
 
}

module.exports = UserUpdateValidateService;