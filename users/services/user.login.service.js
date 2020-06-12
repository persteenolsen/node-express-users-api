
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")


class UserLoginService {
  
 // Note: A User in the format the the React client need !
 // const users = [{ id: 1, email: 'persteen@test.dk', passwordhash: 'mypass123', title: 'Mr', role: 'Admin', firstName: 'Per Steen', lastName: 'Olsen' }];

 // Note: In this example the async / await keywords are removed and the authenticated User 
 // are able to to Login as the instance methods then/catch of the Promise are not entered until
 // the Promise will be resolved / reject = When the SQL is successful done or an error happened !
  authenticate( con, email, password ) {

  console.log( " 3 - Service - Inside the async functiom before Promise !" );

   let userloginpromise = new Promise(( resolve, reject ) => {
       
       let userWithJwt = []; 

        console.log( " 4 - Service - Ready to perform the SQL inside the Promise !" );
                       
        con.query("SELECT id, title, firstName, lastName, role, email, passwordhash, isVerified FROM node_crud_users_jwt where email LIKE '" + email + "' AND isVerified LIKE 'true'" , function (err, result, fields) {
        if ( err ) 
             reject( true );
        else {
                   
              if( result.length === 1 ){

                  if( bcrypt.compareSync( password, result[0].passwordhash) ){
                                               
                        console.log( " 5.a - Service - A User found with Email: " + email + " !"  );
                                                   
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
                         console.log( " 5.b - Service - Users Password does not match  !");
                        
                         // The Promise is resolved with the value of a stringified object containing 
                         // an empty User and the value []
                         resolve( JSON.stringify( userWithJwt ) );
                        }
                 }
            else {
                  console.log( " 5.c - Service - Users Email does not match or isVerified is false !" );
                                             
                  // The Promise is resolved with the value of a stringified object containing 
                  // an empty User and the value []
                  resolve( JSON.stringify( userWithJwt ) );
                }
         }
      });
          
    });

     console.log( " 6 - Service - Leaving Login outside the Promise !" );
              
     // The User found is returned with properties as a stringified object wrapped in a promise.
     // If no User was found an empty stringyfied object is returned to the Controller
     // with the value [] used for validation
      return userloginpromise;
    }   

}

module.exports = UserLoginService;