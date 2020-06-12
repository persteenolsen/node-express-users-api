
const mysql = require('mysql');


class DatabaseConfig {

  
  getDBConnectionPool(){
     const pool = mysql.createPool({
        connectionLimit: 10,
        host: 'mydbhostname',
        user: 'mydbuser',
        password: 'mydbpassword',
        database: 'mydbname'
    });
     return pool;
  }


}

module.exports = DatabaseConfig;