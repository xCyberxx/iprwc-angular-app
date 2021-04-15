const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    database: 'iprwc',
    user: 'hsleiden',
    password: 'hsleidenpass'
});

db.connect(function (err) {
    if (err) throw err;
});

module.exports = db;
