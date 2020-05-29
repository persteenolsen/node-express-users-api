
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")


class UserLoginService {
  
 // Note: A User in the format the the React client need !
 // const users = [{ id: 1, email: 'persteen@test.dk', passwordhash: 'mypass123', title: 'Mr', role: 'Admin', firstName: 'Per Steen', lastName: 'Olsen' }];

   
  async authenticate( con, email, password ) {

       let userWithJwt = [];
      
          await new Promise((resolve, reject) => {
              
           con.query("SELECT id, title, firstName, lastName, role, email, passwordhash, isVerified FROM node_crud_users_jwt where email LIKE '" + email + "' AND isVerified LIKE 'true'" , function (err, result, fields) {
           if ( err ) 
                reject( true );
            else {
                   
                 if( result.length === 1 ){

                     if( bcrypt.compareSync( password, result[0].passwordhash) ){
                                               
                          console.log( '1 User found in Service with Email: ' + email  );
                                                   
                           var userstring = JSON.stringify( result );
                           userstring = userstring.substring(1,(userstring.length-1));
                             
                           var user = JSON.parse( userstring );
                                       
                           const token = jwt.sign({ sub: user.id }, config.secret );
                           const { passwordhash, ...userWithoutPassword } = user;
                               
                           let jwttoken = [];
                           jwttoken.token = token;
                          
                            userWithJwt = { ...userWithoutPassword, ...jwttoken };
                            console.log( userWithJwt );
                            resolve( true );  
                             }
                        else {
                                console.log('Users Password does not match in Service !');
                                userWithJwt = null;
                                resolve( false );  
                             }
                         }

                   else {
                         console.log( 'Users Email does not match or isVerified is false in Service !' );
                         userWithJwt = null;
                         resolve( false );
                     }
                   }
                });
          
              });
              
              // The User with JWT token is returned implicit wrapped in a promise 
               return userWithJwt;
        }   

}

module.exports = UserLoginService;