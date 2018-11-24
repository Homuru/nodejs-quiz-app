const db = require('../config/database');
const knex = require('../config/database');

class User {
    
    getAll() {
        return knex.select().table('accounts');
    }

    getbyID(id) {
        return knex('accounts').where('id',id);
    }

    getbyUsername(username) {
        return knex('accounts').where('username',username);
    }

};

module.exports= User;