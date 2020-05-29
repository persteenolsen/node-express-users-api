

class UserGetService {
          
    
   async doGetAllPersons( con ) {
      
        let usersfound = [];
      
        await new Promise((resolve, reject) => {
             
        con.query("SELECT * FROM node_crud_users_jwt ORDER BY id DESC", function (err, result, fields) {
        if ( err ) 
             reject( true );
        else {
           
              if( result.length > 0 ){
                  console.log( 'Users found in Promise!' );
                  usersfound  = result;
                  resolve( true );
                  }
             else {
                  console.log( 'No Users found in Promise!' );
                  resolve( false );
               }
             }
          });
        });
         
        console.log( 'Users found in Service: ' + usersfound  );
        
        // Returning the User implicit wrapped in a Promise Object
        return usersfound;

   }


     
  async doGetPerson( con, id ) {
           
        let theresult = [];

        await new Promise((resolve, reject) => {
       
        con.query("SELECT * FROM node_crud_users_jwt WHERE Id=" + id, function (err, result, fields) {
         if( err )
             reject( true );
         else {
            
             if( result.length === 1 ){
                 console.log( '1 User Found in Service widt ID: ' + id );
                 theresult = JSON.stringify( result ); 
                 theresult = theresult.substring(1,( theresult.length-1) );
                 resolve( true );
                 }
            else {
                 console.log( 'No User found in Service !' );
                 resolve( false );
              }
            }
         });
   
       });
           
       // The Users is returned implicit wrapped in a Promise Object
       return theresult;
      
      }

}

module.exports = UserGetService;