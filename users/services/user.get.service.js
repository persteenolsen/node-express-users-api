

class UserGetService {
          
    
 async doGetAllPersons( con ) {
      
    let usergetallpromise = await new Promise((resolve, reject) => {
        
        let usersfound = [];

        con.query("SELECT * FROM node_crud_users_jwt ORDER BY id DESC", function (err, result, fields) {
        if ( err ) 
             reject( true );
        else {
           
              if( result.length > 0 ){
                   console.log( 'Users found in Promise!' );
                   usersfound  = result;
                   
                   // The Promise is resolved with the value of a stringified object containing the Users
                   resolve( JSON.stringify( usersfound ));
                   }
              else {
                   console.log( 'No Users found in Promise!' );
                  
                   // The Promise is resolved with the value of a stringified object containing 
                   // an empty User array with the value []
                   resolve( JSON.stringify( usersfound ));
                 }
             }
          });
        });
         
        console.log( 'Leaving Get All - Service: ' );
        
        // The Users found is returned with properties as a stringified object wrapped in a promise.
        // If no User was found an empty stringyfied object is returned to the Controller
        // with the value [] used for validation
        return usergetallpromise;

   }


     
  async doGetPerson( con, id ) {
         
     let usergetpromise = await new Promise(( resolve, reject ) => {
        
        let theresult = [];
       
        con.query("SELECT * FROM node_crud_users_jwt WHERE Id=" + id, function (err, result, fields) {
         if( err )
             reject( true );
         else {
            
             if( result.length === 1 ){
                  console.log( '1 User Found in Service widt ID: ' + id );
                  theresult = JSON.stringify( result ); 
                  theresult = theresult.substring(1,( theresult.length-1) );
                 
                  // The Promise is resolved with the value of a stringified object containing the User
                  resolve( theresult );
                 }
            else {
                 console.log( 'No User found in Service !' );
                 
                 // The Promise is resolved with the value of a allready stringified object containing 
                 // an empty User array with the value []
                 resolve( theresult );
              }
            }
         });
   
       });
           
      // The User found is returned with properties as a stringified object wrapped in a promise.
      // If no User was found an empty stringyfied object is returned to the Controller
      // with the value [] used for validation
      return usergetpromise;
      
      }

}

module.exports = UserGetService;