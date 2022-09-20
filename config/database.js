const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'photoapp',
    password: 'kharshini2001',
    database: 'photosharingappdb',
    debug: false,
});

const promisePool = pool.promise();

module.exports = promisePool;