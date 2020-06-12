

class UserDeleteService {
      
// Note: Just an example of using the keywords async / await but here it does not have any impact of
// the result. However, the sequence of the execution is a bit different and could be used if there is
// the function would return a value and not the promise !
 async doDeleteUser( con, id ) {
     
      let userdeletedpromise = await new Promise((resolve, reject) => {
     
          con.query("DELETE FROM node_crud_users_jwt WHERE Id=" + id, function (err, result, fields) {
          if ( err ) 
                reject( true );
          else {
          
                 if( result.affectedRows === 1 ){
                     console.log( result.affectedRows + " User deleted in Service !");
                     resolve( true );
                     }
                 else {
                      console.log( "User not deleted in Service !" );
                      resolve( false );
                    }
                }
            });
 
          });
      
       // Returning the resolved promise true / false according to row affected which means if the User
       // was deleted or not
       return userdeletedpromise;

    }


}

module.exports = UserDeleteService;