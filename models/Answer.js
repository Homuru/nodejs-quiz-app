const db = require('../config/database');

class Answer {
    getbyID(id) {
        getbyID(id) {
            return knex('answers').where('id', id);
        }
    }
};

module.exports = Answer;