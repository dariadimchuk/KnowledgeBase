const mysql = require('mysql2');

// connect to a remotemysql
const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'yvLOX5tWdS',
    database: 'yvLOX5tWdS',
    password: 'PN3d3OVB8U',
});

module.exports = pool.promise();