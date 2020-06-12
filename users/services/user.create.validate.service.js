const bcrypt = require("bcryptjs")


class UserCreateValidateService {
    
   // Note: In this Service class just examples of using the keywords async / await even though it does 
   // not have any impact of the result. However, the sequence of the execution is a bit different 
   // and could be used if the return value would be done by the function and not by 
   // resolve / reject the promise !!  
   async ValidateMailCreateUser( con, email ){
       
     let isemailfreepromise = await new Promise(( resolve, reject ) => {
                 
           con.query("SELECT email FROM node_crud_users_jwt WHERE email LIKE '" +  email + "'", function (err, result, fields) {
           if ( err ) 
                reject( true );
           else{
               
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
       
     console.log( "Leaving Validate Create - Outside the Promise in Service !" );
     return isemailfreepromise;
      
   }
  
       
   // Note: The User properties are stored inside the User object representing the User Model
   // In user.register.validate.service.js all user properties are parsed as arguments as another way !   
   async doCreateUser( con, user ) {
             
      let promiseusercreated = await new Promise(( resolve, reject ) => {
  
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync( user.password, salt );
          var datecreated = "";
          datecreated = new Date().toISOString();
        
          var sqlString = "";
          sqlString += "INSERT INTO node_crud_users_jwt ";
          sqlString += " (email, title, firstName, lastName, role, passwordhash, ";
          sqlString += " isVerified, dateCreated, acceptterms ";
          sqlString += " ) values( ";
        
          sqlString += "'" + user.email + "','" + user.title + "";
          sqlString += "', '" + user.firstname + "', '" + user.lastname + "";
          
          sqlString += "', '" + user.role + "";
        
          sqlString += "', '" + hash + "";
          sqlString += "', 'true', '" + datecreated + "', 'true'";
    
          con.query(sqlString + " )", function (err, result, fields) {
          if ( err )
               reject( true );
           else {
         
                 if( result.affectedRows === 1 ){
                     console.log( result.affectedRows + " User Created - inside the Promise in Service !");
                     resolve( true );
                     }
                 else {
                      console.log( "User NOT Created - inside the Promise in Service !" );
                      resolve( false );
                      }
                }
            });
  
      });
        
      console.log( "Leaving Create - Outside the Promise in Service !" );
      return promiseusercreated;
                    
    }   
   

  
}

module.exports = UserCreateValidateService;