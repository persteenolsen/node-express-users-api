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
  
    
   // Note: The User properties are stored inside the User object representing the User Model
   // The id of the User are stored outside the Model
   // In user.register.validate.service.js all user properties are parsed as arguments as another way !
   async doEditUser( con, id, user ) {
       
      // Just for showing / testing the properties of the User
      /*console.log("User Email: " + user.email ); 
      console.log("User Password: " + user.password ); 
      console.log("User Role: " + user.role ); 
      console.log("User Title: " + user.title ); 
      console.log("User Firstname: " + user.firstname ); 
      console.log("User Lastname: " + user.lastname ); */

      let promiseuserupdated = await new Promise(( resolve, reject ) => {

        var sqlStringPassword = "";
        if( user.password != "" ){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync( user.password, salt);

            sqlStringPassword  += ", passwordhash='" + hash + "'";
            console.log("Password Hash: " + hash ); 
          }
         else
             console.log("Password is Empty!" ); 
       
            var sqlString = "";
            sqlString += "UPDATE node_crud_users_jwt SET ";
            sqlString += "email='" + user.email + "', title='" + user.title + "";
            sqlString += "', firstName='" + user.firstname + "', lastName='" + user.lastname + "";
        
            if( (! user.role ) || user.role == '' || user.role === 'undefined' )
               sqlString += "', role='User'"; 
            else
               sqlString += "', role='" + user.role + "'";      

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