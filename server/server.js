const mysql = require('mysql2');
const connection = mysql.createConnection({
    user: 'root',
    password: 'mysecret-pw',
    database: 'ynov_ci',
    port: '3305'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

connection.query('SELECT * from utilisateur', function (error, results, fields) {
    if (error) throw error;
    console.log("NB users: ", results.length);
});

connection.end();
