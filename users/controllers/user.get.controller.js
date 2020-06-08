const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../../db/database.config');
const UserGetService = require('../services/user.get.service');


// routes
router.get('/', getAll);
module.exports = router;


 
 function getAll(req, res, next) {
      
    const dbconfig = new DatabaseConfig();
    const connectionString = dbconfig.getDBConnectionPool();
    var s = new UserGetService();

    const users = s.doGetAllPersons( connectionString );
    console.log("Users Object wrapped in a Promise Get Service at the Controller! " + users );

    users.then(( usersfound ) => {
             
        if( usersfound != "[]" ){
            console.log("Yes, Users found in Controller: " );
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end( usersfound );
            }
        else {
             console.log("Ups, No Users found in Controller! " );
             res.status(400).send( { message: 'Error Getting Users!'} ); 
            }

     }).catch( error => {
            console.log( "SQL error from Promise displayed in catch - Controller: " + error );
            res.status(400).send( { message: 'No Users were found due to an SQL error inside Service !'} );
     });
 
}
 

 router.get('/:id', function (req, res, next) {
   
    const dbconfig = new DatabaseConfig();
    const connectionString = dbconfig.getDBConnectionPool();
    var s = new UserGetService();
    
    const user = s.doGetPerson( connectionString, req.params.id );
    console.log("User Object wrapped in a Promise Get Service at the Controller! " + user );

    user.then(( usersfound ) => {
        
        if( usersfound != "[]" ){
            console.log("Yes, 1 User found in Controller: " );
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end( usersfound );
            }
        else {
             console.log("Ups, No User found in Controller! " );
             res.status(400).send( { message: 'Error Getting the User!'} ); 
            }

        }).catch( error => {
            console.log( "SQL error from Promise displayed in catch - Controller: " + error );
            res.status(400).send( { message: 'The User was not found due to an SQL error inside Service !'} );
       });
         
});

