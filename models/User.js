const db = require('../config/database');
const knex = require('../config/database');

class User {

    getAll() {
        return knex.select().table('accounts');
    }

    getbyID(id) {
        return knex('accounts').where('id', id);
    }

    getbyUsername(username) {
        return knex('accounts').where('username', username);
    }

    async isAdmin(id) {
        try {
            const user = await this.getbyID(id);
            return user[0].admin;
        } catch (error) {
            console.log(error);
        }
    }

    countUser() {
        return knex('accounts').count('id as number');
    }
};

module.exports = User;