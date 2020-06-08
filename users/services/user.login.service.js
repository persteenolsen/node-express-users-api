
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")


class UserLoginService {
  
 // Note: A User in the format the the React client need !
 // const users = [{ id: 1, email: 'persteen@test.dk', passwordhash: 'mypass123', title: 'Mr', role: 'Admin', firstName: 'Per Steen', lastName: 'Olsen' }];

 // Note: Removing the async / await keywords will still allow the authenticated User to Login
 // but not everything perform in the optimal sequence !
 // Using the the async / await keywords is strongly recomended !!!!
 async authenticate( con, email, password ) {

   let userWithJwt = [];
      
   let userloginpromise = await new Promise(( resolve, reject ) => {
          
        console.log( 'Process 2 - Ready to perform the SQL inside the Promise - Service !' );
                       
        con.query("SELECT id, title, firstName, lastName, role, email, passwordhash, isVerified FROM node_crud_users_jwt where email LIKE '" + email + "' AND isVerified LIKE 'true'" , function (err, result, fields) {
        if ( err ) 
             reject( true );
        else {
                   
              if( result.length === 1 ){

                  if( bcrypt.compareSync( password, result[0].passwordhash) ){
                                               
                        console.log( "Process 2 - A User found with Email: " + email + " - Service !"  );
                                                   
                        var userstring = JSON.stringify( result );
                        userstring = userstring.substring(1,(userstring.length-1));
                             
                        var user = JSON.parse( userstring );
                                       
                        const token = jwt.sign({ sub: user.id }, config.secret );
                        const { passwordhash, ...userWithoutPassword } = user;
                               
                        let jwttoken = [];
                        jwttoken.token = token;
                          
                        userWithJwt = { ...userWithoutPassword, ...jwttoken };
                    
                        // The Promise is resolved with the value of a stringified object containing the User
                        // with properties and the JWT Token
                        resolve( JSON.stringify( userWithJwt ) );
                       }
                   else {
                         console.log('Process 2 - Users Password does not match - Service !');
                        
                         // The Promise is resolved with the value of a stringified object containing 
                         // an empty User and the value []
                         resolve( JSON.stringify( userWithJwt ) );
                        }
                 }
            else {
                  console.log( 'Process 2 - Users Email does not match or isVerified is false - Service !' );
                                             
                 // The Promise is resolved with the value of a stringified object containing 
                  // an empty User and the value []
                  resolve( JSON.stringify( userWithJwt ) );
                }
         }
      });
          
    });

     console.log( "Process 2 - Leaving Login outside the Promise - Service !" );
              
     // The User found is returned with properties as a stringified object wrapped in a promise.
     // If no User was found an empty stringyfied object is returned to the Controller
     // with the value [] used for validation
      return userloginpromise;
    }   

}

module.exports = UserLoginService;