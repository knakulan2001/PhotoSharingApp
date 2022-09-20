const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "photoapp",
    password: "kharshini2001",
    database: "photosharingappdb",
    connectionLimit: 50,
    debug: false,
});

const promisePool = pool.promise();
module.exports = promisePool;