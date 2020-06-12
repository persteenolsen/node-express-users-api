

const bcrypt = require("bcryptjs")


class UserRegisterService {
     
    
    ValidateMailRegisterUser( con, email ){
                              
        let isemailfreepromise = new Promise(( resolve, reject ) => {
                  
            con.query("SELECT email FROM node_crud_users_jwt WHERE email LIKE '" + email + "'", function (err, result, fields) {
            if ( err ) 
                 reject( true );
            else {
                
                if( result.length === 0 ){
                    console.log( 'The User Email is free - inside the Promise in Service !' );
                    resolve( true );
                    }
                else {
                     console.log( 'The User Email is NOT free - inside Promise in Service !' );
                     resolve( false );
                   }
               }
             });
         
        });
        
       console.log( "Leaving Validate Register - Outside the Promise in Service !" );
       return isemailfreepromise;
       
    }
           
        
     // Note: The properties from the User Model parsed one by one from the controller as arguments 
     // A different way is used in user.create.validate.service.js and user.update.validate.service.js !   
     doRegisterUser( con, verificationToken, email, password, title, firstname, lastname, role ) {
                     
        let promiseuserregistered = new Promise(( resolve, reject ) => {
   
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync( password, salt );
            var datecreated = "";
            datecreated = new Date().toISOString();
         
            var sqlString = "";
            sqlString += "INSERT INTO node_crud_users_jwt ";
            sqlString += " (email, title, firstName, lastName, role, passwordhash, ";
            sqlString += " isVerified, dateCreated, verificationToken, acceptterms ";
            sqlString += " ) values( ";
         
            sqlString += "'" + email + "','" + title + "";
            sqlString += "', '" + firstname + "', '" + lastname + "";
            sqlString += "', '" + role + "";
         
            sqlString += "', '" + hash + "";
            sqlString += "', 'false', '" + datecreated + "', '" + verificationToken + "', 'true'";
     
            con.query(sqlString + " )", function (err, result, fields) {
            if ( err ) 
                reject( true );
            else {
          
                  if( result.affectedRows === 1 ){
                          console.log( result.affectedRows + " User registered - inside the Promise in Service !");
                          resolve( true );
                          }
                    else {
                          console.log( "User NOT registered - inside the Promise in Service !" );
                          resolve( false );
                         }
                    }
               });
   
           });
         
        console.log( "Leaving Register - Outside the Promise in Service !" );
        return promiseuserregistered;
                    
     }   


}
  module.exports = UserRegisterService;