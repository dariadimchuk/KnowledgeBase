const mysql = require('mysql2');

// connect to a database peoplebook running on your localmachine
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'KnowledgeBase',
    password: 'Password123',
    port: 3306
});

module.exports = pool.promise();