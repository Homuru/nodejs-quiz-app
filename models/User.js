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

    async setPrivilege(userID, testID) {
        try {
            const rows = await knex('accounts_has_tests').where({
                accounts_id: userID,
                tests_id: testID
            });
            console.log(rows);
            if (rows.length) {
                knex('accounts_has_tests').where({
                    accounts_id: userID,
                    tests_id: testID
                }).update({
                    active: 1
                }).then(console.log("Updated status!"));
            } else {
                knex('accounts_has_tests').insert({
                    accounts_id: userID,
                    tests_id: testID,
                    active: 1
                }).then(console.log("Created new record!"));
            }
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = User;