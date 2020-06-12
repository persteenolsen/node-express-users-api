

class UserDeleteService {
      

 doDeleteUser( con, id ) {
     
      let userdeletedpromise = new Promise((resolve, reject) => {
     
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