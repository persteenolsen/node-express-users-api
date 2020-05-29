const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../../db/database.config');
const UserDeleteService = require('../services/user.delete.service');

module.exports = router;


router.delete('/:id', function (req, res, next) {
      
    const dbconfig = new DatabaseConfig();
    const connectionString = dbconfig.getDBConnectionPool();
    var s = new UserDeleteService();
    
    
    const user = s.doDeleteUser( connectionString, req.params.id );
    console.log("User Object wrapped in a Promise Delete Service at the Controller! " + user );
    
    user.then(( userdeleted ) => {
             
        if( userdeleted ){
            console.log("Yes, 1 User deleted in Controller: " + userdeleted );
            res.status(200).send( { message: 'The User was deleted successfully !' } ); 
            }
        else {
             console.log("Ups, No User deleted in Controller! " + userdeleted );
             res.status(400).send( { message: 'The User was not deleted !'} ); 
            }

        }).catch( error => {
            console.log( "SQL error from Promise displayed in catch - Controller: " + error );
            res.status(400).send( { message: 'The User was not deleted due to an SQL error inside Service !'} );
       });

  
});

