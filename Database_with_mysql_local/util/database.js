const mysql = require('mysql2')
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'completeNode',
    password:'giit12345'
});


module.exports= pool.promise();
