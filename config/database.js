const knex = require('knex')({
    client: 'mysql2',
    version: '5.7',
    connection: {
        host: "localhost",
        user: "root",
        password: "zeroaxlx",
        database: "myTest"
    }
});

module.exports = knex;