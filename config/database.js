const knex = require('knex')({
    client: 'mysql2',
    version: '5.7',
    connection: {
        host: "125.212.227.42",
        user: "root",
        password: "toor",
        port: "3336",
        database: "myTest"
    }
});

module.exports = knex;